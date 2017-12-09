from django.shortcuts import render
from datetime import date, timedelta
from django.utils import timezone
from django.db.models import Count, When, Case
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter, SearchFilter
from .models import (Subscription,
                     Message,
                     Laud,
                     Application,
                     Collection,
                     Invitation)
from .serializers import (SubscriptionSerializer,
                          MessageSerializer,
                          LaudSerializer,
                          ApplicationSerializer,
                          CollectionSerializer,
                          InvitationSerializer)


# Create your views here.

class SubscriptionView(ModelViewSet):
    queryset = Subscription.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SubscriptionSerializer

class MessageView(ModelViewSet):
    queryset = Message.objects.all()
    permission_classes = [AllowAny]
    serializer_class = MessageSerializer

class LaudView(ModelViewSet):
    queryset = Laud.objects.all()
    permission_classes = [AllowAny]
    serializer_class = LaudSerializer

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

