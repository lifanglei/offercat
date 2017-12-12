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
from .models import Company, Position
from .serializers import CompanySerializer, CompanyOrderOnRecentPositionsSerializer , PositionSerializer


# Create your views here.

class CompanyView(ModelViewSet):
    queryset = Company.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CompanySerializer

    def get_queryset(self):
        print(self.request.query_params)
        if self.request.query_params:
            if self.request.query_params["ordering"] == "hotness":
                three_days_ago = timezone.now() - timedelta(days=3)
                return Company.objects.annotate(recent_position_count=Count(Case(
                        When(position__last_update__gte=three_days_ago, then=1),))).order_by('-recent_position_count')

        return super(CompanyView, self).get_queryset()

class PositionView(ModelViewSet):
    queryset = Position.objects.all().order_by('-id')
    permission_classes = [AllowAny]
    serializer_class = PositionSerializer
    filter_backends = (SearchFilter,)
    search_fields = ('^name', '^department','^company__name','=company__abbreviation')

    def get_queryset(self):
        print(self.request.query_params)
        if self.request.query_params:
            if self.request.query_params["ordering"] == "hotness":
                return Position.objects.all().annotate(hotness=Count('collection')).order_by('-hotness')

        return super(PositionView, self).get_queryset()


class CompanyOrderListAPIView(ListAPIView):
    three_days_ago = timezone.now() - timedelta(days=3)
    queryset = Company.objects.annotate(recent_position_count=Count(Case(
        When(position__last_update__gte=three_days_ago, then=1),
    )))
    permission_classes = [AllowAny]
    serializer_class = CompanyOrderOnRecentPositionsSerializer
    filter_backends = (OrderingFilter,)
    ordering = ('-recent_position_count','id')

    def get_queryset(self):
        queryset = super(CompanyOrderListAPIView, self).get_queryset()
        print(self.request.query_params)
        return queryset



@api_view(['GET'])
@permission_classes([AllowAny])
def getChoicesForCompany(request):
    rlt = {
        'industry':Company.INDUSTRY,
        'size':Company.SIZE,
        'stock':Company.STOCK
    }
    return Response(rlt, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def getChoicesForPosition(request):
    rlt = {
        'salary':Position.SALARY_LEVEL,
        'category':Position.CATEGORY,
        'type':Position.TYPE,
        'work_exp_req': Position.WORK_EXP_REQ,
        'edu_req': Position.EDUCATION_DEGREE
    }
    return Response(rlt, status=status.HTTP_200_OK)