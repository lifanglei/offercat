# -*- coding: UTF-8 -*-
from rest_framework import serializers
from .models import Company, Position

from django.utils.translation import ugettext_lazy as _

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = (
            'id',
            'user',
            'full_name',
            'first_name',
            'last_name',
            'edu_degree',
            'service_years',
            'tel',
            'email',
            'address',
            'description',
            'avatar',
            'avatar_url',
            'edit_url',
        )
        extra_kwargs = {'first_name': {'write_only': True},
                        'last_name': {'write_only': True}}