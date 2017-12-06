# -*- coding: UTF-8 -*-
# Create your views here.
from captcha.helpers import captcha_image_url
from captcha.models import CaptchaStore
from django.http import Http404, HttpResponse
try:
    import json
except ImportError:
    from django.utils import simplejson as json
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
from .serializers import (
    CapthaValueSerializer,
    UserRegisterSerializer,
    UserLoginSerializer)


class UserRegisterAPIView(generics.CreateAPIView):
    """
    API for user register.
    Param:
    Response: Token
    """
    queryset = get_user_model().objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

    def get(self, request):
        key = CaptchaStore.generate_key()

        data = {
            'captcha_key': key,
            'captcha_url': reverse('captcha-image', kwargs={'key': key}, request=request),
            'captcha2x_url': reverse('captcha-image-2x', kwargs={'key': key}, request=request),
            'audio_url': None
        }
        if captcha_settings.CAPTCHA_FLITE_PATH:
            data['audio_url'] = reverse('captcha-audio', kwargs={'key': key})
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=False):
            val = data['captcha_val'].lower()
            hash_key = data['captcha_key']

            if val != CaptchaStore.objects.get(hashkey=hash_key).response:
                key = CaptchaStore.generate_key()
                data = {
                    'captcha_key': key,
                    'captcha_url': reverse('captcha-image', kwargs={'key': key}, request=request),
                    'captcha2x_url': reverse('captcha-image-2x', kwargs={'key': key}, request=request),
                    'audio_url': None,
                    'register_success': False,
                    'error_message': {'captcha_val': [u'验证码不匹配！请重新验证']}
                }
                if captcha_settings.CAPTCHA_FLITE_PATH:
                    data['audio_url'] = reverse('captcha-audio', kwargs={'key': key})
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            response_data_success = serializer.data
            response_data_success['register_success'] = True
            return Response(response_data_success, status=status.HTTP_201_CREATED, headers=headers)
        else:
            errors = serializer.errors
            key = CaptchaStore.generate_key()
            response_data_fail = {
                'username': data.get('username'),
                'captcha_key': key,
                'captcha_url': reverse('captcha-image', kwargs={'key': key}, request=request),
                'captcha2x_url': reverse('captcha-image-2x', kwargs={'key': key}, request=request),
                'audio_url': None,
                'register_success': False,
                'error_message': errors
            }
            return Response(response_data_fail, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    # def get(self, request, ):
    #     key = CaptchaStore.generate_key()
    #
    #     data = {
    #         'captcha_key': key,
    #         'captcha_url': reverse('captcha-image', kwargs={'key': key}, request=request),
    #         'captcha2x_url': reverse('captcha-image-2x', kwargs={'key': key}, request=request),
    #         'audio_url': None
    #     }
    #     if captcha_settings.CAPTCHA_FLITE_PATH:
    #         data['audio_url'] = reverse('captcha-audio', kwargs={'key': key})
    #     return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data  # request.POST
        # val = data['captcha_val'].lower()
        # hash_key = data['captcha_key']
        # if val != CaptchaStore.objects.get(hashkey=hash_key).response:
        #     key = CaptchaStore.generate_key()
        #     data = {
        #         'captcha_key': key,
        #         'captcha_url': reverse('captcha-image', kwargs={'key': key}, request=request),
        #         'captcha2x_url': reverse('captcha-image-2x', kwargs={'key': key}, request=request),
        #         'audio_url': None,
        #         'login_success': False,
        #         'error_message': {'captcha_val': 'Invalidated captcha value!'}
        #     }
        #     if captcha_settings.CAPTCHA_FLITE_PATH:
        #         data['audio_url'] = reverse('captcha-audio', kwargs={'key': key})
        #     return Response(data, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            response_data_success = serializer.object
            print(serializer)
            response_data_success['login_success'] = True
            return Response(response_data_success, status=status.HTTP_200_OK)
        else:
            errors = serializer.errors
            custom_key = api_settings.NON_FIELD_ERRORS_KEY
            if custom_key in errors:
                if errors[custom_key] == [u"该用户不存在！"]:
                    errors['username'] = errors.pop(custom_key)
                elif errors[custom_key] == [u"密码错误！"]:
                    errors['password'] = errors.pop(custom_key)

            response_data_fail = {
                'username': data.get('username'),
                'login_success': False,
                'error_message': errors
            }
            return Response(response_data_fail, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def captcha(request):
    key = CaptchaStore.generate_key()
    data = {
        'captcha_key': key,
        'captcha_url': reverse('captcha-image', kwargs={'key': key}, request=request),
        'captcha2x_url': reverse('captcha-image-2x', kwargs={'key': key}, request=request),
        'audio_url': None
    }
    if captcha_settings.CAPTCHA_FLITE_PATH:
        data['audio_url'] = reverse('captcha-audio', kwargs={'key': key})
    return Response(data, status=status.HTTP_200_OK)


class capthaView(APIView):
    serializer_class = CapthaValueSerializer

    @staticmethod
    def get(request, ):
        key = CaptchaStore.generate_key()

        data = {
            'captcha_key': key,
            'captcha_url': reverse('captcha-image', kwargs={'key': key}, request=request),
            'captcha2x_url': reverse('captcha-image-2x', kwargs={'key': key}, request=request),
            'audio_url': None
        }
        if captcha_settings.CAPTCHA_FLITE_PATH:
            data['audio_url'] = reverse('captcha-audio', kwargs={'key': key})
        return Response(data, status=status.HTTP_200_OK)

    @staticmethod
    def post(request,):
        data = request.data
        val = data['val'].lower()
        hash_key = data['captcha_key']
        if val != CaptchaStore.objects.get(hashkey=hash_key).response:
            key = CaptchaStore.generate_key()
            data = {
                'captcha_key': key,
                'captcha_url': reverse('captcha-image', kwargs={'key': key}, request=request),
                'captcha2x_url': reverse('captcha-image-2x', kwargs={'key': key}, request=request),
                'audio_url': None
            }
            if captcha_settings.CAPTCHA_FLITE_PATH:
                data['audio_url'] = reverse('captcha-audio', kwargs={'key': key})
            return Response(data, status=status.HTTP_205_RESET_CONTENT)

        return Response(data, status=status.HTTP_200_OK)
