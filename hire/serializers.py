# -*- coding: UTF-8 -*-
from rest_framework import serializers
from django.utils import timezone
from profiles.utils import ChoicesDisplayField
from .models import Company, Position

from django.utils.translation import ugettext_lazy as _

class PositionBriefSerializer(serializers.ModelSerializer):
    edit_url = serializers.HyperlinkedIdentityField(view_name='hire:position-detail', lookup_url_kwarg='pk')
    category = ChoicesDisplayField(choices=Position.CATEGORY)
    type = ChoicesDisplayField(choices=Position.TYPE)
    created_at = serializers.SerializerMethodField(read_only=True)
    # last_update = serializers.DateTimeField(format="%Y-%m-%d %H:%M",read_only=True)

    class Meta:
        model = Position
        fields = (
            'id',
            'name',
            'department',
            'salary',
            'category',
            'type',
            'work_exp_req',
            'edu_req',
            'city',
            'address',
            'created_at',
            'subscription_count',
            'edit_url',
        )
        read_only_fields = ('subscription_count',)
        extra_kwargs = {}

    def get_created_at(self,obj):
        if obj.created_at.date() == timezone.now().date():
            return obj.created_at.strftime(u"今天 %H:%M")
        else:
            return obj.created_at.strftime("%Y-%m-%d")


class CompanySerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=True, required=False, allow_empty_file=True, write_only=True)
    photo_url = serializers.SerializerMethodField(read_only=True)
    industry = ChoicesDisplayField(choices=Company.INDUSTRY)
    size = ChoicesDisplayField(choices=Company.SIZE)
    stock = ChoicesDisplayField(choices=Company.STOCK)
    edit_url = serializers.HyperlinkedIdentityField(view_name='hire:company-detail', lookup_url_kwarg='pk')
    # position_set = serializers.HyperlinkedRelatedField(read_only=True, many=True, view_name="hire:position-detail",)
    position_set = PositionBriefSerializer(many=True)
    shareholders = serializers.ListField(child= serializers.CharField(max_length=30, allow_blank=False), max_length = 5)

    class Meta:
        model = Company
        fields = (
            'id',
            'name',
            'web_site',
            'industry',
            'size',
            'stock',
            'introduction',
            'description',
            'photo',
            'photo_url',
            'edit_url',
            'position_set',
            'shareholders',
            'abbreviation',
        )

    def get_photo_url(self,obj):
        if obj.photo:
            return self.context['request'].build_absolute_uri(obj.photo.url)
        else:
            return None


class CompanyBriefSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField(read_only=True)
    industry = ChoicesDisplayField(choices=Company.INDUSTRY,read_only=True)
    edit_url = serializers.HyperlinkedIdentityField(view_name='hire:company-detail', lookup_url_kwarg='pk')


    class Meta:
        model = Company
        fields = (
            'id',
            'name',
            'web_site',
            'industry',
            'introduction',
            'photo_url',
            'edit_url',
            'abbreviation',
        )
        read_only_fields = ('web_site',)

    def get_photo_url(self,obj):
        if obj.photo:
            return self.context['request'].build_absolute_uri(obj.photo.url)
        else:
            return None

class PositionSerializer(serializers.ModelSerializer):
    edit_url = serializers.HyperlinkedIdentityField(view_name='hire:position-detail', lookup_url_kwarg='pk')
    # company_url = serializers.HyperlinkedIdentityField(read_only=True, view_name="hire:company-detail",
    #                                                    lookup_field ='company_id',lookup_url_kwarg='pk')
    category = ChoicesDisplayField(choices=Position.CATEGORY)
    type = ChoicesDisplayField(choices=Position.TYPE)
    created_at = serializers.SerializerMethodField(read_only=True)
    company = CompanyBriefSerializer(read_only=True)
    # last_update = serializers.DateTimeField(format="%Y-%m-%d %H:%M",read_only=True)
    collection_count = serializers.SerializerMethodField()

    class Meta:
        model = Position
        fields = (
            'id',
            'name',
            'department',
            'salary',
            'category',
            'type',
            'work_exp_req',
            'edu_req',
            'city',
            'address',
            'duty',
            'detail_req',
            'email',
            'created_at',
            'subscription_count',
            'edit_url',
            # 'company_url',
            'company',
            'collection_count',
        )
        read_only_fields = ('subscription_count',)
        extra_kwargs = {}

    def get_created_at(self,obj):
        if obj.created_at.date() == timezone.now().date():
            return obj.created_at.strftime(u"今天 %H:%M")
        else:
            return obj.created_at.strftime("%Y-%m-%d")

    def get_collection_count(self, obj):
        return obj.collection_set.count()


class CompanyOrderOnRecentPositionsSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField(read_only=True)
    # industry = ChoicesDisplayField(choices=Company.INDUSTRY, read_only=True)
    # size = ChoicesDisplayField(choices=Company.SIZE, read_only=True)
    # stock = ChoicesDisplayField(choices=Company.STOCK, read_only=True)
    detail_url = serializers.HyperlinkedIdentityField(view_name='hire:company-detail', lookup_url_kwarg='pk')
    recent_position_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Company
        fields = (
            'id',
            'abbreviation',
            'name',
            'web_site',
            'introduction',
            'photo_url',
            'detail_url',
            'recent_position_count',
        )
        read_only_fields = ('detail_url', 'recent_position_count', 'web_site')

    def get_photo_url(self, obj):
        if obj.photo:
            return self.context['request'].build_absolute_uri(obj.photo.url)
        else:
            return None
