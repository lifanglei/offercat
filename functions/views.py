from django.contrib.auth.models import AnonymousUser
from django.shortcuts import render
from datetime import date, timedelta
from django.utils import timezone
from django.db.models import Count, When, Case
from rest_framework import status, mixins
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from notifications.signals import notify
from notifications.views import live_unread_notification_list as lunl
from rest_framework.pagination import PageNumberPagination
from hire.models import Position
from .models import (Subscription,
                     Laud,
                     Application,
                     Collection,
                     Invitation,)

from django.contrib.auth import get_user_model
from notifications.models import Notification
from .serializers import (SubscriptionSerializer,
                          LaudSerializer,
                          NotificationSerializer,
                          ApplicationSerializer,
                          CollectionSerializer,
                          InvitationSerializer,)

User = get_user_model()
# Create your views here.

class SubscriptionView(ModelViewSet):
    queryset = Subscription.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SubscriptionSerializer

# class MessageView(ModelViewSet):
#     queryset = Message.objects.all()
#     permission_classes = [AllowAny]
#     serializer_class = MessageSerializer

class NotificationView(ModelViewSet):
    queryset = Notification.objects.all()
    permission_classes = [AllowAny]
    serializer_class = NotificationSerializer

    def create(self, request, *args, **kwargs):
        user = User.objects.get(pk=request.data['recipient'])
        print(request.data['recipient'])
        print(type(request.data['recipient']))
        actor = Position.objects.first()
        try:

            notify.send(actor, recipient=user, verb=request.data['verb'])
            rlt = {'rlt': 'success'}
        except:
            rlt = {'rlt': 'success'}
        return Response(rlt, status=status.HTTP_201_CREATED)

    def get_queryset(self):
        if not isinstance(self.request.user, AnonymousUser):
            return Notification.objects.filter(recipient__exact=self.request.user)
        else:
            return self.queryset


class LaudView(ModelViewSet):
    queryset = Laud.objects.all()
    permission_classes = [AllowAny]
    serializer_class = LaudSerializer
    pagination_class = None

    def get_queryset(self):
        curr_user = self.request.user
        if isinstance(curr_user, AnonymousUser):
            return super(LaudView, self).get_queryset()
        elif isinstance(curr_user, get_user_model()):
            return super(LaudView, self).get_queryset().filter(user = self.request.user)
            # return Profile.objects.filter(user = self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        position_id = Position.objects.filter(uuid=request.data['position']).first().id
        if Laud.objects.filter(user_id=self.request.user.id,position_id = position_id).exists():
            self.perform_destroy(Laud.objects.filter(user_id=self.request.user.id,position_id = position_id).first())
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        position = Position.objects.filter(uuid=request.data['position'])
        serializer = self.get_serializer(data={'position':position})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ApplicationView(ModelViewSet):
    queryset = Application.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ApplicationSerializer

class CollectionView(ModelViewSet):
    queryset = Collection.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CollectionSerializer

class InvitationView(ModelViewSet):
    queryset = Invitation.objects.all()
    permission_classes = [AllowAny]
    serializer_class = InvitationSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def live_unread_notification_list(request):
    print(request.user)
    return lunl(request)
