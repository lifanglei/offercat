# -*- coding: UTF-8 -*-
from rest_framework import serializers
from .models import Company, Position

from django.utils.translation import ugettext_lazy as _

class CompanySerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(use_url=True, required=False, write_only=True)
    photo_url = serializers.SerializerMethodField(read_only=True)
    edit_url = serializers.HyperlinkedIdentityField(view_name='hire:company-detail', lookup_url_kwarg='pk')

    class Meta:
        model = Company
        fields = (
            'id',
            'name',
            'web_site',
            'industry',
            'size',
            'stock',
            'description',
            'photo',
            'photo_url',
            'edit_url',
        )

    def get_photo_url(self,obj):
        return self.context['request'].build_absolute_uri(obj.photo.url)

class PositionSerializer(serializers.ModelSerializer):
    edit_url = serializers.HyperlinkedIdentityField(view_name='hire:position-detail', lookup_url_kwarg='pk')

    class Meta:
        model = Position
        fields = (
            'id',
            'name',
            'company',
            'department',
            'salary',
            'type',
            'work_exp_req',
            'edu_req',
            'city',
            'address',
            'duty',
            'detail_req',
            'email',
            'last_update',
            'subscription_count',
            'edit_url',
        )
        read_only_fields = ('last_update', 'subscription_count' )