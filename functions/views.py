from django.contrib.auth.models import AnonymousUser
from django.shortcuts import render
from datetime import date, timedelta
from django.utils import timezone
from django.db.models import Count, When, Case
from rest_framework import status, mixins, exceptions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import GenericAPIView, ListCreateAPIView,ListAPIView
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from notifications.signals import notify
from notifications.views import live_unread_notification_list as lunl
from rest_framework.pagination import PageNumberPagination
from django.utils.translation import ugettext_lazy as _
from hire.models import Position
from .models import (Subscription,
                     Laud,
                     Application,
                     Collection,
                     Invitation,)

from django.contrib.auth import get_user_model
from notifications.models import Notification
from hire.serializers import PositionBriefSerializer
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
    pagination_class = None

    def get_queryset(self):
        curr_user = self.request.user
        if isinstance(curr_user, AnonymousUser):
            return []
        elif isinstance(curr_user, get_user_model()):
            return super(SubscriptionView, self).get_queryset().filter(user = self.request.user)
            # return Profile.objects.filter(user = self.request.user)

    def create(self, request, *args, **kwargs):
        if isinstance(self.request.user, AnonymousUser):
            raise exceptions.NotAuthenticated(_(u"请先登录！"))
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user == self.request.user:
            raise exceptions.PermissionDenied(_(u"权限不够！"))
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        super(SubscriptionView,self).update(request,partial=True)
        return self.list(request, *args, **kwargs)

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


class LaudView(ModelViewSet,):
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


    def create(self, request, *args, **kwargs):
        try:
            position = Position.objects.filter(uuid=request.data['position'])
        except :
            raise exceptions.NotAcceptable(_(u"position uuid is not validated!"))
        if position.exists():
            if Laud.objects.filter(user=self.request.user,position= position.first()).exists():
                self.perform_destroy(Laud.objects.filter(user=self.request.user, position=position.first()).first())
                return self.list(request, *args, **kwargs)
            else:
                serializer = self.get_serializer(data={'position': position})
                serializer.is_valid(raise_exception=True)
                serializer.save(user=self.request.user)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(_(u"职位不存在！"), status=status.HTTP_400_BAD_REQUEST, )


class ApplicationView(ModelViewSet):
    queryset = Application.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ApplicationSerializer

class CollectionView(ModelViewSet):
    queryset = Collection.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CollectionSerializer
    pagination_class = None

    def get_queryset(self):
        curr_user = self.request.user
        if isinstance(curr_user, AnonymousUser):
            return super(CollectionView, self).get_queryset()
        elif isinstance(curr_user, get_user_model()):
            return super(CollectionView, self).get_queryset().filter(user = self.request.user)


    def create(self, request, *args, **kwargs):
        try:
            position = Position.objects.filter(uuid=request.data['position'])
        except :
            raise exceptions.NotAcceptable(_(u"position uuid is not validated!"))
        if position.exists():
            if Collection.objects.filter(user_id=self.request.user.id,position_id = position.first().id).exists():
                self.perform_destroy(Collection.objects.filter(user_id=self.request.user.id, position_id=position.first().id).first())
                return self.list(request, *args, **kwargs)
            else:
                serializer = self.get_serializer(data={'position':position})
                serializer.is_valid(raise_exception=True)
                serializer.save(user=self.request.user)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            return Response(_(u"职位不存在！"), status=status.HTTP_400_BAD_REQUEST, )

class InvitationView(ModelViewSet):
    queryset = Invitation.objects.all()
    permission_classes = [AllowAny]
    serializer_class = InvitationSerializer

class SubscribedPositionView(ListAPIView):
    queryset = Position.objects.all().order_by('-id')
    permission_classes = [AllowAny]
    serializer_class = PositionBriefSerializer

    def get_queryset(self):
        curr_user = self.request.user
        if isinstance(curr_user, AnonymousUser):
            return []
        elif isinstance(curr_user, get_user_model()):
            if curr_user.subscription_set.exists():
                subscription_set = curr_user.subscription_set.all()
                total_rlt = set()
                for spn in subscription_set:
                    if len(spn.category)>0 :
                        rlt = Position.objects.filter(category__in=spn.category)
                    if len(spn.salary)>0:
                        rlt = rlt.filter(salary__in=spn.salary)
                    if len(spn.industry)>0:
                        rlt = rlt.filter(company__industry__in=spn.industry)
                    for pos in rlt.all():
                        total_rlt.add(pos)
                return list(total_rlt)
            else:
                return []


@api_view(['GET'])
@permission_classes([AllowAny])
def live_unread_notification_list(request):
    print(request.user)
    return lunl(request)
