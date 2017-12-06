from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Company, Position
from .serializers import CompanySerializer, PositionSerializer

# Create your views here.

class CompanyView(ModelViewSet):
    queryset = Company.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CompanySerializer

class PositionView(ModelViewSet):
    queryset = Position.objects.all()
    permission_classes = [AllowAny]
    serializer_class = PositionSerializer