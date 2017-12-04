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

from .models import Profile, WorkExperience, EducationalExperience, Skills
from .serializers import (ProfileSerializer,
                          WorkExperienceSerializer,
                          EducationalExperienceSerializer,
                          SkillsSerializer,
                          ProfileOverViewSerializer,)


class ProfileView(ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        print("{0}".format(self.request.user))
        return super(ProfileView,self).get_queryset()

class WorkExperienceView(ModelViewSet):
    queryset = WorkExperience.objects.all()
    permission_classes = [AllowAny]
    serializer_class = WorkExperienceSerializer

class EducationalExoerienceView(ModelViewSet):
    queryset = EducationalExperience.objects.all()
    permission_classes = [AllowAny]
    serializer_class = EducationalExperienceSerializer

class SkillsView(ModelViewSet):
    queryset = Skills.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SkillsSerializer

class ProfileOverViewAPIView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProfileOverViewSerializer
    queryset = Profile.objects.all()
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, context={'request': request})
        return Response(serializer.data)

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


