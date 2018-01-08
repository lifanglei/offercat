# -*- coding: UTF-8 -*-
from django.core.urlresolvers import reverse
from rest_framework import serializers
from django.utils import timezone
from profiles.utils import ChoicesDisplayField
from .models import Company, Position
from functions.models import Laud,Collection
from django.contrib.auth.models import AnonymousUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model

class PositionBriefSerializer(serializers.ModelSerializer):
    # edit_url = serializers.HyperlinkedIdentityField(view_name='hire:position-detail', lookup_field='uuid')
    edit_url = serializers.SerializerMethodField()
    salary = ChoicesDisplayField(choices=Position.SALARY_LEVEL)
    category = ChoicesDisplayField(choices=Position.CATEGORY)
    type = ChoicesDisplayField(choices=Position.TYPE)
    work_exp_req = ChoicesDisplayField(choices=Position.WORK_EXP_REQ)
    edu_req = ChoicesDisplayField(choices=Position.EDUCATION_DEGREE)
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
            'is_certified',
            'uuid',
        )
        read_only_fields = ('subscription_count','uuid','is_certified')
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
    positions = PositionBriefSerializer(many=True, read_only=True,source='position_set')
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
            'positions',
            'shareholders',
            'abbreviation',
            'headquarters',
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
    size = ChoicesDisplayField(choices=Company.SIZE)
    stock = ChoicesDisplayField(choices=Company.STOCK)
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
            'uuid',
            'size',
            'stock',
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
    salary = ChoicesDisplayField(choices=Position.SALARY_LEVEL)
    category = ChoicesDisplayField(choices=Position.CATEGORY)
    type = ChoicesDisplayField(choices=Position.TYPE)
    work_exp_req = ChoicesDisplayField(choices=Position.WORK_EXP_REQ)
    edu_req = ChoicesDisplayField(choices=Position.EDUCATION_DEGREE)
    created_at = serializers.SerializerMethodField(read_only=True)
    company_info = CompanyBriefSerializer(read_only=True, source='company')
    # last_update = serializers.DateTimeField(format="%Y-%m-%d %H:%M",read_only=True)
    collection_count = serializers.SerializerMethodField()
    is_collected = serializers.SerializerMethodField()
    laud_count = serializers.SerializerMethodField()
    is_lauded = serializers.SerializerMethodField()
    serializers.CurrentUserDefault()
    post_by = serializers.SerializerMethodField()
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
            'is_collected',
            'laud_count',
            'is_certified',
            'is_lauded',
            'post_by',
        )
        read_only_fields = ('subscription_count', 'uuid', 'is_certified','post_by')
        extra_kwargs = {'company': {'write_only': True},}

    def get_created_at(self,obj):
        if obj.created_at.date() == timezone.now().date():
            return obj.created_at.strftime(u"今天 %H:%M")
        else:
            return obj.created_at.strftime("%Y-%m-%d")

    def get_collection_count(self, obj):
        return obj.collections.count()

    def get_laud_count(self, obj):
        return obj.lauds.count()

    def get_edit_url(self,obj):
        return reverse('hire:position-detail',kwargs={'uuid': obj.uuid})

    def get_is_collected(self,obj):
        curr_user = self.context['request'].user
        if isinstance(curr_user, AnonymousUser):
            return False
        elif isinstance(curr_user, get_user_model()):
            return Collection.objects.get(user_id=curr_user.id,position_id = obj.id).exists()
            return curr_user in obj.collections.all()

    def get_is_lauded(self, obj):
        curr_user = self.context['request'].user
        if isinstance(curr_user, AnonymousUser):
            return False
        elif isinstance(curr_user, get_user_model()):
            return Laud.objects.get(user_id=curr_user.id,position_id = obj.id).exists()
            return curr_user in obj.lauds.all()

    def get_post_by(self,obj):
        if obj.post_by:
            return obj.post_by.uuid
        else:
            return None

    def _current_user(self, obj):
        curr_user = self.context['request'].user
        if isinstance(curr_user, AnonymousUser):
            return None
        elif isinstance(curr_user, get_user_model()):
            return curr_user.id

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