from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token

from .views import (CompanyView, PositionView, CompanyOrderListAPIView)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('company', CompanyView, base_name='company')
router.register('position', PositionView, base_name='position')

urlpatterns = [
    # /hire/,
url(r'^company/orderbyhotness/$', CompanyOrderListAPIView.as_view(), name='company-order-hotness'),
]

urlpatterns += router.urls