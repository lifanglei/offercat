from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token

from .views import (ProfileView,
                    WorkExperienceView,
                    EducationalExoerienceView,
                    SkillView,
                    ProfileOverViewAPIView,
                    ResumeView,
                    getChoicesForProfile)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('profile', ProfileView, base_name='profile')
router.register('work_exp', WorkExperienceView, base_name='work_exp')
router.register('edu_exp', EducationalExoerienceView, base_name='edu_exp')
router.register('skills', SkillView, base_name='skills')
router.register('resumes', ResumeView, base_name='resumes')

urlpatterns = [
    # /profiles/,
    url(r'^overview/$', ProfileOverViewAPIView.as_view(), name='profile-overview'),
    url(r'^profile/choices/$', getChoicesForProfile, name='profile-choices'),
]

urlpatterns += router.urls