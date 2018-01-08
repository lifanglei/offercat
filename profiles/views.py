from django.contrib.auth.models import AnonymousUser
from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model
from captcha.models import CaptchaStore
from captcha.conf import settings as captcha_settings
from rest_framework import status, generics,exceptions
from rest_framework.parsers import FileUploadParser,MultiPartParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework.settings import api_settings
from django.utils.translation import ugettext_lazy as _
from rest_framework.viewsets import ModelViewSet


from .models import Profile, WorkExperience, EducationalExperience, Skill, Resume
from .serializers import (ProfileSerializer,
                          WorkExperienceSerializer,
                          EducationalExperienceSerializer,
                          SkillSerializer,
                          ProfileOverViewSerializer,
                          ResumeSerializer)

User = get_user_model()

class ProfileView(ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProfileSerializer
    pagination_class = None
    lookup_field = 'uuid'

    def get_queryset(self):
        curr_user = self.request.user
        if isinstance(curr_user, AnonymousUser):
            return super(ProfileView, self).get_queryset()
        elif isinstance(curr_user, get_user_model()):
            return super(ProfileView, self).get_queryset().filter(user = self.request.user)

    def perform_create(self, serializer):
        if isinstance(self.request.user, AnonymousUser):
            raise exceptions.NotAuthenticated(_(u"请先登录！"))
        serializer.save(user = self.request.user)

    def update(self, request, *args, **kwargs):
        super(ProfileView, self).update(request, partial=True)

class WorkExperienceView(ModelViewSet):
    queryset = WorkExperience.objects.all()
    permission_classes = [AllowAny]
    serializer_class = WorkExperienceSerializer
    pagination_class = None
    lookup_field = 'uuid'

    def get_queryset(self):
        curr_user = self.request.user
        if isinstance(curr_user, AnonymousUser):
            if self.request.data.get('user_uuid', None):
                user_uuid = self.request.data.get('user_uuid', None)
                user = User.objects.filter(uuid=user_uuid).first()
                return super(WorkExperienceView, self).get_queryset().filter(user=user)
            return super(WorkExperienceView, self).get_queryset()
        elif isinstance(curr_user, get_user_model()):
            return super(WorkExperienceView, self).get_queryset().filter(user = self.request.user)

    def create(self, request, *args, **kwargs):
        user = None
        if isinstance(self.request.user, AnonymousUser) and self.request.data.get('user_uuid', None) is None:
            raise exceptions.NotAuthenticated(_(u"请先登录！"))
        elif isinstance(self.request.user, AnonymousUser) is not None:
            user = self.request.user
        elif self.request.data.get('user_uuid', None):
            user_uuid = self.request.data.get('user_uuid', None)
            user = User.objects.filter(uuid=user_uuid).first()
        if user:
            serializer = self.get_serializer(data=self.request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)
            headers = self.get_success_headers(serializer.data)
            return self.list(request,*args, **kwargs)
            # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            raise exceptions.NotAuthenticated(_(u"请先登录！"))

    def update(self, request, *args, **kwargs):
        super(WorkExperienceView,self).update(request,partial=True)
        return self.list(request, *args, **kwargs)

class EducationalExoerienceView(ModelViewSet):
    queryset = EducationalExperience.objects.all()
    permission_classes = [AllowAny]
    serializer_class = EducationalExperienceSerializer
    pagination_class = None
    lookup_field = 'uuid'

    def get_queryset(self):
        curr_user = self.request.user
        if isinstance(curr_user, AnonymousUser):
            if self.request.data.get('user_uuid', None):
                user_uuid = self.request.data.get('user_uuid', None)
                user = User.objects.filter(uuid=user_uuid).first()
                return super(EducationalExoerienceView, self).get_queryset().filter(user=user)
            return super(EducationalExoerienceView, self).get_queryset()
        elif isinstance(curr_user, get_user_model()):
            return super(EducationalExoerienceView, self).get_queryset().filter(user = self.request.user)

    def create(self, request, *args, **kwargs):
        user = None
        if isinstance(self.request.user, AnonymousUser) and self.request.data.get('user_uuid', None) is None:
            raise exceptions.NotAuthenticated(_(u"请先登录！"))
        elif isinstance(self.request.user, AnonymousUser) is not None:
            user = self.request.user
        elif self.request.data.get('user_uuid', None):
            user_uuid = self.request.data.get('user_uuid', None)
            user = User.objects.filter(uuid=user_uuid).first()
        if user:
            serializer = self.get_serializer(data=self.request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)
            # headers = self.get_success_headers(serializer.data)
            return self.list(request, *args, **kwargs)
            # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            raise exceptions.NotAuthenticated(_(u"请先登录！"))

    def update(self, request, *args, **kwargs):
        super(EducationalExoerienceView,self).update(request,partial=True)
        return self.list(request, *args, **kwargs)

class SkillView(ModelViewSet):
    queryset = Skill.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SkillSerializer
    pagination_class = None
    lookup_field = 'uuid'

    def get_queryset(self):
        curr_user = self.request.user
        if isinstance(curr_user, AnonymousUser):
            if self.request.data.get('user_uuid', None):
                user_uuid = self.request.data.get('user_uuid', None)
                user = User.objects.filter(uuid=user_uuid).first()
                return super(SkillView, self).get_queryset().filter(user=user)
            return super(SkillView, self).get_queryset()
        elif isinstance(curr_user, get_user_model()):
            return super(SkillView, self).get_queryset().filter(user = self.request.user)

    def create(self, request, *args, **kwargs):
        user = None
        if isinstance(self.request.user, AnonymousUser) and self.request.data.get('user_uuid', None) is None:
            raise exceptions.NotAuthenticated(_(u"请先登录！"))
        elif isinstance(self.request.user, AnonymousUser) is not None:
            user = self.request.user
        elif self.request.data.get('user_uuid', None):
            user_uuid = self.request.data.get('user_uuid', None)
            user = User.objects.filter(uuid=user_uuid).first()
        if user:
            serializer = self.get_serializer(data=self.request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)
            # headers = self.get_success_headers(serializer.data)
            return self.list(request, *args, **kwargs)
            # return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            raise exceptions.NotAuthenticated(_(u"请先登录！"))

    def update(self, request, *args, **kwargs):
        super(SkillView,self).update(request,partial=True)
        return self.list(request, *args, **kwargs)

class ProfileOverViewAPIView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProfileOverViewSerializer
    queryset = Profile.objects.all()
    pagination_class = None
    # lookup_field = 'uuid'

    def get_queryset(self):
        curr_user = self.request.user
        if isinstance(curr_user, AnonymousUser):
            return super(ProfileOverViewAPIView, self).get_queryset()
        elif isinstance(curr_user, get_user_model()):
            # return super(ProfileOverViewAPIView, self).get_queryset().filter(user = self.request.user)
            return Profile.objects.filter(user = self.request.user)

    def list(self, request, *args, **kwargs):
        if isinstance(self.request.user, AnonymousUser):
            raise exceptions.NotAuthenticated(_(u"请先登录！"))
        try:
            obj = Resume.objects.filter(user=self.request.user).first()
            if obj is None:
                rlt = {
                            "user_uuid": self.request.user.uuid,
                            "first_name": None,
                            "last_name": None,
                            "edu_degree": None,
                            "service_years": None,
                            "tel": None,
                            "email": None,
                            "address": None,
                            "description": None,
                            "work_exp": [],
                            "edu_exp": [],
                            "skills": [],
                }
                return Response(rlt)
            else:
                serializer = self.get_serializer(obj, many=False)
                rlt= serializer.data
        except:
            return Response(None)
        return Response(rlt)


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

class ResumeView(ModelViewSet):
    # parser_classes = (MultiPartParser,FileUploadParser,)
    queryset = Resume.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ResumeSerializer
    pagination_class = None
    lookup_field = 'user__uuid'

    def get_queryset(self):
        curr_user = self.request.user
        if isinstance(curr_user, AnonymousUser):
            return super(ResumeView, self).get_queryset()
        elif isinstance(curr_user, get_user_model()):
            return super(ResumeView, self).get_queryset().filter(user= self.request.user)

    def list(self, request, *args, **kwargs):
        if isinstance(self.request.user, AnonymousUser):
            raise exceptions.NotAuthenticated(_(u"请先登录！"))
        try:
            obj = Resume.objects.filter(user=self.request.user).first()
            if obj is None:
                rlt = {
                        "resume_url": None,
                        "user_uuid": self.request.user.uuid,
                        "edit_url": None,
                }
                return Response(rlt)
            else:
                serializer = self.get_serializer(obj, many=False)
                rlt= serializer.data
        except:
            return Response(None)
        return Response(rlt)

    def create(self, request, *args, **kwargs):
        if isinstance(self.request.user, AnonymousUser):
            raise exceptions.NotAuthenticated(_(u"请先登录！"))
        serializer = self.get_serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

@api_view(['GET'])
@permission_classes([AllowAny])
def getChoicesForProfile(request):
    rlt = {
        'edu_degree':Profile.EDUCATION_DEGREE,
        'service_year':Profile.SERVICE_YEARS,
    }
    return Response(rlt, status=status.HTTP_200_OK)