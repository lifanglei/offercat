# -*- coding: UTF-8 -*-
from rest_framework import serializers
from .models import Profile, WorkExperience, EducationalExperience, Skill, Resume
from .utils import get_default_image, ChoicesDisplayField, validate_resume_extension
from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse


class ProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False, use_url=True,write_only=True)
    avatar_url = serializers.SerializerMethodField(read_only=True)
    # edu_degree = ChoicesDisplayField(choices=Profile.EDUCATION_DEGREE)
    # service_years = ChoicesDisplayField(choices=Profile.SERVICE_YEARS)
    # edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:profile-detail',lookup_field='uuid',lookup_url_kwarg='uuid')
    edit_url = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
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
            'uuid',
        )
        read_only_fields= ('user',)
        extra_kwargs = {}

    def get_edu_degree(self, obj):
        return obj.get_edu_degree_display()

    def get_service_years(self, obj):
        return obj.get_service_years_display()

    def get_avatar_url(self, obj):
        return self.context['request'].build_absolute_uri(obj.avatar.url)

    def get_edit_url(self,obj):
        return reverse('profiles:profile-detail',kwargs={'uuid': obj.uuid})

    def get_full_name(self, obj):
        return obj.get_full_name()


class WorkExperienceSerializer(serializers.ModelSerializer):
    # edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:work_exp-detail', lookup_url_kwarg='pk')
    edit_url = serializers.SerializerMethodField()
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
        read_only_fields = ('user',)

    def get_edit_url(self,obj):
        return reverse('profiles:work_exp-detail',kwargs={'pk': obj.id})

class EducationalExperienceSerializer(serializers.ModelSerializer):
    degree = ChoicesDisplayField(choices=EducationalExperience.EDUCATION_DEGREE)
    graduate_date = serializers.DateField(format="%Y")
    # edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:edu_exp-detail', lookup_url_kwarg='pk')
    edit_url = serializers.SerializerMethodField()
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
        read_only_fields = ('user',)

    def get_edit_url(self,obj):
        return reverse('profiles:edu_exp-detail',kwargs={'pk': obj.id})

class SkillSerializer(serializers.ModelSerializer):
    degree = ChoicesDisplayField(choices=Skill.SKILL_LEVEL)
    graduate_date = serializers.DateField(format="%Y")
    # edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:skills-detail', lookup_url_kwarg='pk')
    edit_url = serializers.SerializerMethodField()
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
        read_only_fields = ('user',)
    def get_edit_url(self, obj):
        return reverse('profiles:skills-detail', kwargs={'pk': obj.id})

class ProfileOverViewSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField(read_only=True)
    edu_degree = ChoicesDisplayField(choices=Profile.EDUCATION_DEGREE)
    service_years = ChoicesDisplayField(choices=Profile.SERVICE_YEARS)
    # edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:profile-detail', lookup_url_kwarg='uuid')
    edit_url = serializers.SerializerMethodField()
    work_exp = serializers.SerializerMethodField()
    edu_exp = serializers.SerializerMethodField()
    skills = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'first_name',
            'last_name',
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
        extra_kwargs = {}

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
        return SkillSerializer(obj.query_skills(), many=True, context={'request': self.context.get('request')}).data

    def get_edit_url(self,obj):
        return reverse('profiles:profile-detail',kwargs={'uuid': obj.uuid})

class ResumeSerializer(serializers.ModelSerializer):
    resume = serializers.FileField(allow_empty_file=True, use_url=True,write_only=True,)
    resume_url = serializers.SerializerMethodField(read_only=True)
    user_uuid = serializers.SerializerMethodField(read_only=True)
    # edit_url = serializers.HyperlinkedIdentityField(view_name='profiles:resumes-detail', lookup_url_kwarg='pk')
    edit_url = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = ("resume",
                  "resume_url",
                  "user_uuid",
                  "edit_url",)

        read_only_fields = ('edit_url','resume_url')
        extra_kwargs = {'user': {'write_only': True},
                        }

    def get_resume_url(self, obj):
        print(obj)
        return self.context['request'].build_absolute_uri(obj.resume.url)

    def get_user_uuid(self, obj):
        return obj.user.uuid

    def get_edit_url(self,obj):
        return reverse('profiles:resumes-detail',kwargs={'user__uuid': obj.user.uuid})
