#-*- coding: UTF-8 -*-
# Create your views here.
from django.contrib.auth import get_user_model
from captcha.models import CaptchaStore
from captcha.conf import settings as captcha_settings
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.settings import api_settings
from rest_framework_jwt.settings import api_settings as jwt_settings
from accounts.serializers import (
    CapthaValueSerializer,
    UserRegisterSerializer,
    UserLoginSerializer)


class UserRegisterAPIView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

    def post(self,request, format = None):
        data = request.data
        # serializer = UploadImageSerilizer(data=request.data)
        # location = [float(x) for x in request.data.get('location').split(',')]

        serializer = self.get_serializer(data=request.data)
        # serializer.location = location

        if serializer.is_valid(raise_exception=False):
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            errors = serializer.errors
            response_data_fail = {
                'username': data.get('username'),
                'registersuccess': False,
                'errormessage': errors
            }
            return Response(response_data_fail,status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer
    def post(self, request):
        data = request.data #request.POST

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            print(user)
            response_data_success = {
                'id': user.id,
                'username': user.username,
                'loginsuccess': True,
                'token': token,
            }
            return Response(response_data_success,status=status.HTTP_200_OK)
        else:
            errors = serializer.errors
            custom_key = api_settings.NON_FIELD_ERRORS_KEY
            if custom_key in errors:
                if errors[custom_key] == ["This user does not exist"]:
                    errors['username'] = errors.pop('non_field_errors')
                elif errors[custom_key] == ["Incorrect password"]:
                    errors['password'] = errors.pop('non_field_errors')

            response_data_fail = {
                'username': data.get('username'),
                'loginsuccess': False,
                'errormessage': errors
            }
            return Response(response_data_fail, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
@permission_classes([AllowAny])
def captcha(request):
    key = CaptchaStore.generate_key()
    data = {
        'hashkey': key,
        'image_url': reverse('captcha-image', kwargs={'key': key},request= request),
        'image2x_url': reverse('captcha-image-2x', kwargs={'key': key}, request= request),
        'refresh': reverse('captcha-refresh',request= request),
        'audio_url': None
    }
    if captcha_settings.CAPTCHA_FLITE_PATH:
        data['audio_url'] = reverse('captcha-audio', kwargs={'key': key})
    return Response(data,status=status.HTTP_200_OK)

class capthaView(APIView):
    serializer_class = CapthaValueSerializer

    def get(self, request, format=None):
        key = CaptchaStore.generate_key()

        data = {
            'hashkey': key,
            'image_url': reverse('captcha-image', kwargs={'key': key},request= request),
            'image2x_url': reverse('captcha-image-2x', kwargs={'key': key}, request= request),
            'refresh': reverse('captcha-refresh',request= request),
            'audio_url': None
        }
        if captcha_settings.CAPTCHA_FLITE_PATH:
            data['audio_url'] = reverse('captcha-audio', kwargs={'key': key})
        return Response(data,status=status.HTTP_200_OK)

    def post(self,request,format=None):
        data = request.data
        val = data['val'].lower()
        hashKey = data['hashLey']
        if val == CaptchaStore.objects.get(hashkey=hashKey).response:
            #TODO
            pass
        return Response(data, status=status.HTTP_200_OK)