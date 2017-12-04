# -*- coding: UTF-8 -*-
from rest_framework import serializers
from .models import Profile, WorkExperience, EducationalExperience, Skills
from .utils import get_default_image, ChoicesDisplayField
from django.utils.translation import ugettext_lazy as _


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


class WorkExperienceSerializer(serializers.ModelSerializer):
    edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:work_exp-detail', lookup_url_kwarg='pk')
    class Meta:
        model = WorkExperience
        fields = (
            'id',
            'user',
            'company',
            'position',
            'start_date',
            'end_date',
            'edit_url',
        )

class EducationalExperienceSerializer(serializers.ModelSerializer):
    degree = ChoicesDisplayField(choices=EducationalExperience.EDUCATION_DEGREE)
    graduate_date = serializers.DateField(format="%Y")
    edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:edu_exp-detail', lookup_url_kwarg='pk')

    class Meta:
        model = EducationalExperience
        fields = (
            'id',
            'user',
            'college',
            'major',
            'degree',
            'graduate_date',
            'edit_url',
        )


class SkillsSerializer(serializers.ModelSerializer):
    degree = ChoicesDisplayField(choices=Skills.SKILL_LEVEL)
    graduate_date = serializers.DateField(format="%Y")
    edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:skills-detail', lookup_url_kwarg='pk')

    class Meta:
        model = EducationalExperience
        fields = (
            'id',
            'user',
            'college',
            'major',
            'degree',
            'graduate_date',
            'edit_url',
        )

class ProfileOverViewSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField(read_only=True)
    full_name = serializers.SerializerMethodField(read_only=True)
    edu_degree = ChoicesDisplayField(choices=Profile.EDUCATION_DEGREE)
    service_years = ChoicesDisplayField(choices=Profile.SERVICE_YEARS)
    edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:profile-detail', lookup_url_kwarg='pk')
    work_exp = serializers.SerializerMethodField()
    edu_exp = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'full_name',
            'edu_degree',
            'service_years',
            'tel',
            'email',
            'address',
            'description',
            'avatar_url',
            'edit_url',
            'work_exp',
            'edu_exp',
            'skills',
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

    def get_work_exp(self,obj):
        if obj.query_work_exp().count() == 0:
            return []
        return WorkExperienceSerializer(obj.query_work_exp(), many=True, context={'request': self.context.get('request')}).data

    def get_edu_exp(self,obj):
        if obj.query_edu_exp().count() == 0:
            return []
        return EducationalExperienceSerializer(obj.query_edu_exp(), many=True, context={'request': self.context.get('request')}).data

    def get_skills(self,obj):
        if obj.query_skills().count() == 0:
            return []
        return SkillsSerializer(obj.query_skills(), many=True, context={'request': self.context.get('request')}).data

