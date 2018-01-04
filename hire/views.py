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
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from .models import Company, Position
from .serializers import CompanySerializer, CompanyOrderOnRecentPositionsSerializer , PositionSerializer

# Create your views here.
class CompanyView(ModelViewSet):
    queryset = Company.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CompanySerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('industry', 'headquarters')
    lookup_field = 'uuid'

    def get_queryset(self):

        if self.request.query_params.get('ordering', None):
            if self.request.query_params.get('ordering', None) == "hotness":
                three_days_ago = timezone.now() - timedelta(days=3)
                return Company.objects.annotate(recent_position_count=Count(Case(
                        When(position__last_update__gte=three_days_ago, then=1),))).order_by('-recent_position_count')
            if self.request.query_params.get('ordering', None)== "position_count":
                return Company.objects.annotate(position_count=Count('position')).order_by('-position_count')
        return super(CompanyView, self).get_queryset()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class PositionView(ModelViewSet):

    queryset = Position.objects.all().order_by('-id')
    permission_classes = [AllowAny]
    serializer_class = PositionSerializer
    filter_backends = (SearchFilter,)
    search_fields = ('^name', '^department','^company__name','=company__abbreviation')
    filter_fields = ('category',)
    lookup_field = 'uuid'

    def get_queryset(self):
        if self.request.query_params:
            if "ordering" in self.request.query_params and self.request.query_params["ordering"] == "hotness":
                return Position.objects.all().annotate(hotness=Count('collection')).order_by('-hotness')
            elif "category" in self.request.query_params:
                if self.request.query_params['category'] in [str(key) for key,value in Position.CATEGORY]:
                    return Position.objects.filter(category=self.request.query_params['category'])
                elif self.request.query_params['category'] in [value for key,value in Position.CATEGORY]:
                    val = [key for key, value in Position.CATEGORY if value == self.request.query_params['category']][0]
                    return Position.objects.filter(category=val)
                else:
                    return super(PositionView, self).get_queryset().none()
        return super(PositionView, self).get_queryset()

    def perform_create(self, serializer):
        serializer.save(post_by=self.request.user)

class CompanyOrderListAPIView(ListAPIView):
    three_days_ago = timezone.now() - timedelta(days=3)
    queryset = Company.objects.annotate(recent_position_count=Count(Case(
        When(position__last_update__gte=three_days_ago, then=1),
    )))
    permission_classes = [AllowAny]
    serializer_class = CompanyOrderOnRecentPositionsSerializer
    filter_backends = (OrderingFilter,)
    ordering = ('-recent_position_count','id')
    lookup_field = 'uuid'
    def get_queryset(self):
        queryset = super(CompanyOrderListAPIView, self).get_queryset()
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