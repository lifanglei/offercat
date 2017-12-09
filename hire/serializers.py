# -*- coding: UTF-8 -*-
from rest_framework import serializers

from profiles.utils import ChoicesDisplayField
from .models import Company, Position

from django.utils.translation import ugettext_lazy as _

class CompanySerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=True, required=False, allow_empty_file=True, write_only=True)
    photo_url = serializers.SerializerMethodField(read_only=True)
    industry = ChoicesDisplayField(choices=Company.INDUSTRY)
    size = ChoicesDisplayField(choices=Company.SIZE)
    stock = ChoicesDisplayField(choices=Company.STOCK)
    edit_url = serializers.HyperlinkedIdentityField(view_name='hire:company-detail', lookup_url_kwarg='pk')
    position_set = serializers.HyperlinkedRelatedField(read_only=True, many=True, view_name="hire:position-detail",)
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
            'abbreviation',
        )

    def get_photo_url(self,obj):
        if obj.photo:
            return self.context['request'].build_absolute_uri(obj.photo.url)
        else:
            return None

class PositionSerializer(serializers.ModelSerializer):
    edit_url = serializers.HyperlinkedIdentityField(view_name='hire:position-detail', lookup_url_kwarg='pk')
    company_url = serializers.HyperlinkedIdentityField(read_only=True, view_name="hire:company-detail",
                                                       lookup_field ='company_id',lookup_url_kwarg='pk')
    category = ChoicesDisplayField(choices=Position.CATEGORY)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M")
    last_update = serializers.DateTimeField(format="%Y-%m-%d %H:%M")

    class Meta:
        model = Position
        fields = (
            'id',
            'name',
            'company',
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
            'last_update',
            'subscription_count',
            'edit_url',
            'company_url',
        )
        read_only_fields = ('last_update', 'subscription_count','created_at')
        extra_kwargs = {}


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
