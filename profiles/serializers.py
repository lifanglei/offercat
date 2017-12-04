# -*- coding: UTF-8 -*-
from rest_framework import serializers
from .models import Test, Profile
from .utils import get_default_image, ChoicesDisplayField


class SaveImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(default= get_default_image(), use_url=True,write_only=True)
    image_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Test
        fields = ('image', 'image_url')

    def get_image_url(self, obj):
        print(obj.image.url)
        return self.context['request'].build_absolute_uri(obj.image.url)

class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(default= get_default_image(), use_url=True,write_only=True)
    avatar_url = serializers.SerializerMethodField(read_only=True)
    full_name = serializers.SerializerMethodField(read_only=True)
    edu_degree = ChoicesDisplayField(choices=Profile.EDUCATION_DEGREE)
    service_years = ChoicesDisplayField(choices=Profile.SERVICE_YEARS)
    edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:profile-detail', lookup_url_kwarg='pk')
    class Meta:
        model = Profile
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

    def get_edu_degree(self, obj):
        return obj.get_edu_degree_display()

    def get_service_years(self, obj):
        return obj.get_service_years_display()

    def get_avatar_url(self, obj):
        return self.context['request'].build_absolute_uri(obj.avatar.url)

    def get_full_name(self, obj):
        return obj.get_full_name()


