from django.conf.urls import url

from .views import (SubscriptionView,
                    MessageView,
                    LaudView,
                    CollectionSerializer,
                    InvitationSerializer,
                    ApplicationView)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('subscription', SubscriptionView, base_name='subscription')
router.register('message', MessageView, base_name='message')
router.register('laud', LaudView, base_name='laud')
router.register('collection', CollectionSerializer, base_name='collection')
router.register('invitation', InvitationSerializer, base_name='invitation')
router.register('application', ApplicationView, base_name='application')

urlpatterns = [
    # /function/,

]

urlpatterns += router.urls