from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token

from .views import ImageSaveView, ProfileView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', ProfileView, base_name='profile')

urlpatterns = [
    # /profiles/,
    url(r'^test/$', ImageSaveView.as_view(), name='test'),
]

urlpatterns += router.urls