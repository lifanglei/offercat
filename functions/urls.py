from django.conf.urls import url

from .views import (SubscriptionView,
                    LaudView,
                    NotificationView,
                    CollectionView,
                    InvitationView,
                    ApplicationView,
                    live_unread_notification_list)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('subscription', SubscriptionView, base_name='subscription')
# router.register('message', MessageView, base_name='message')
router.register('notification',NotificationView, base_name='notification')
router.register('laud', LaudView, base_name='laud')
router.register('collection',CollectionView , base_name='collection')
router.register('invitation', InvitationView, base_name='invitation')
router.register('application', ApplicationView, base_name='application')

urlpatterns = [
    # /functions/,
    url(r'^notification/api/unread_list/$', live_unread_notification_list, name='notification-api-unread_list'),
]

urlpatterns += router.urls