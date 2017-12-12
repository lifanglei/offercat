# -*- coding: UTF-8 -*-
from django.core.urlresolvers import reverse
from rest_framework import serializers
from django.utils import timezone
from profiles.utils import ChoicesDisplayField
from .models import Company, Position

from django.utils.translation import ugettext_lazy as _

class PositionBriefSerializer(serializers.ModelSerializer):
    # edit_url = serializers.HyperlinkedIdentityField(view_name='hire:position-detail', lookup_field='uuid')
    edit_url = serializers.SerializerMethodField()
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
            'uuid',
        )
        read_only_fields = ('subscription_count','uuid')
        extra_kwargs = {}

    def get_created_at(self,obj):
        if obj.created_at.date() == timezone.now().date():
            return obj.created_at.strftime(u"今天 %H:%M")
        else:
            return obj.created_at.strftime("%Y-%m-%d")

    def get_edit_url(self,obj):
        return reverse('hire:position-detail',kwargs={'uuid': obj.uuid})


class CompanySerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=True, required=False, allow_empty_file=True, write_only=True)
    photo_url = serializers.SerializerMethodField(read_only=True)
    industry = ChoicesDisplayField(choices=Company.INDUSTRY)
    size = ChoicesDisplayField(choices=Company.SIZE)
    stock = ChoicesDisplayField(choices=Company.STOCK)
    # edit_url = serializers.HyperlinkedIdentityField(view_name='hire:company-detail',lookup_field='uuid')
    edit_url = serializers.SerializerMethodField()
    # position_set = serializers.HyperlinkedRelatedField(read_only=True, many=True, view_name="hire:position-detail",)
    position_set = PositionBriefSerializer(many=True, read_only=True)
    shareholders = serializers.ListField(child=serializers.CharField(max_length=30, allow_blank=False), max_length = 5)

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
            'uuid',
        )
        read_only_fields = ('subscription_count','uuid')


    def get_photo_url(self,obj):
        if obj.photo:
            return self.context['request'].build_absolute_uri(obj.photo.url)
        else:
            return None

    def get_edit_url(self,obj):
        return reverse('hire:company-detail',kwargs={'uuid': obj.uuid})

class CompanyBriefSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField(read_only=True)
    industry = ChoicesDisplayField(choices=Company.INDUSTRY,read_only=True)
    # edit_url = serializers.HyperlinkedIdentityField(view_name='hire:company-detail', lookup_field='uuid',)
    edit_url = serializers.SerializerMethodField()

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
            'uuid'
        )
        read_only_fields = ('web_site', 'uuid')

    def get_photo_url(self,obj):
        if obj.photo:
            return self.context['request'].build_absolute_uri(obj.photo.url)
        else:
            return None

    def get_edit_url(self,obj):
        return reverse('hire:company-detail',kwargs={'uuid': obj.uuid})

class PositionSerializer(serializers.ModelSerializer):
    # edit_url = serializers.HyperlinkedIdentityField(view_name='hire:position-detail', lookup_field='uuid')
    edit_url = serializers.SerializerMethodField()
    # company_url = serializers.HyperlinkedIdentityField(read_only=True, view_name="hire:company-detail",
    #                                                    lookup_field ='company_id',lookup_url_kwarg='pk')
    category = ChoicesDisplayField(choices=Position.CATEGORY)
    type = ChoicesDisplayField(choices=Position.TYPE)
    created_at = serializers.SerializerMethodField(read_only=True)
    company_info = CompanyBriefSerializer(read_only=True, source='company')
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
            'company_info',
            'uuid',
        )
        read_only_fields = ('subscription_count', 'uuid')
        extra_kwargs = {'company': {'write_only': True},}


    def get_created_at(self,obj):
        if obj.created_at.date() == timezone.now().date():
            return obj.created_at.strftime(u"今天 %H:%M")
        else:
            return obj.created_at.strftime("%Y-%m-%d")

    def get_collection_count(self, obj):
        return obj.collection_set.count()

    def get_edit_url(self,obj):
        return reverse('hire:position-detail',kwargs={'uuid': obj.uuid})


class CompanyOrderOnRecentPositionsSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField(read_only=True)
    # industry = ChoicesDisplayField(choices=Company.INDUSTRY, read_only=True)
    # size = ChoicesDisplayField(choices=Company.SIZE, read_only=True)
    # stock = ChoicesDisplayField(choices=Company.STOCK, read_only=True)
    # detail_url = serializers.HyperlinkedIdentityField(view_name='hire:company-detail', lookup_field='uuid')
    edit_url = serializers.SerializerMethodField()
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
            'edit_url',
            'recent_position_count',
            'uuid',
        )
        read_only_fields = ('detail_url', 'recent_position_count', 'web_site','uuid')

    def get_photo_url(self, obj):
        if obj.photo:
            return self.context['request'].build_absolute_uri(obj.photo.url)
        else:
            return None

    def get_edit_url(self,obj):
        return reverse('hire:company-detail',kwargs={'uuid': obj.uuid})