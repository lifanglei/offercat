from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token

from .views import (ProfileView, WorkExperienceView, EducationalExoerienceView, SkillsView, ProfileOverViewAPIView)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('profile', ProfileView, base_name='profile')
router.register('work_exp', WorkExperienceView, base_name='work_exp')
router.register('edu_exp', EducationalExoerienceView, base_name='edu_exp')
router.register('skills', SkillsView, base_name='skills')

urlpatterns = [
    # /profiles/,
    url(r'^overview/(?P<id>.+)/$', ProfileOverViewAPIView.as_view(), name='profile-overview'),
]

urlpatterns += router.urls