from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token

from . import views

urlpatterns = [
    # /accounts/,
    url(r'^api/captcha/$', views.captcha, name='api-captcha'),
    url(r'^api/register/$', views.UserRegisterAPIView.as_view(), name='api-register'),
    url(r'^api/login/$', views.UserLoginAPIView.as_view(), name='api-login'),
    url(r'^api/token-auth/', obtain_jwt_token,),
]