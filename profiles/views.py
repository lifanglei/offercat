from django.shortcuts import render

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
from rest_framework.viewsets import ModelViewSet

from .models import Test, Profile
from .serializers import SaveImageSerializer, ProfileSerializer

class ImageSaveView(generics.CreateAPIView):
    queryset = Test.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SaveImageSerializer

class ProfileView(ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        print("{0}".format(self.request.user))
        return super(ProfileView,self).get_queryset()

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def uploader_photo_view(request, id,):
#     try:
#         uploader = Uploader.objects.get(id=id)
#         photo = uploader.photo.read()
#         content_type = uploader.photo.format
#         # print("[DEBUG]{0}".format(content_type))
#         resized_img = photo  # Handle resizing here
#         return HttpResponse(resized_img, content_type=content_type)
#     except:
#         return Response(status=status.HTTP_404_NOT_FOUND)

