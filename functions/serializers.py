from rest_framework import serializers
from django.utils import timezone
from django.core.urlresolvers import reverse
from profiles.utils import ChoicesDisplayField
from .models import Subscription,Laud,Collection,Application,Invitation
from hire.models import Position, Company
from notifications.models import Notification
from hire.serializers import PositionBriefSerializer
from profiles.utils import ChoicesDisplayField
from django.utils.translation import ugettext_lazy as _

class SubscriptionSerializer(serializers.ModelSerializer):
    salary = serializers.ListField(child=ChoicesDisplayField(choices=Position.SALARY_LEVEL), max_length=5)
    category = serializers.ListField(child=ChoicesDisplayField(choices=Position.CATEGORY), max_length=5)
    industry = serializers.ListField(child=ChoicesDisplayField(choices=Company.INDUSTRY), max_length=5)
    created_at = serializers.SerializerMethodField()
    last_update = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    edit_url = serializers.SerializerMethodField()
    class Meta:
        model = Subscription
        fields = (
            'id',
            'category',
            'industry',
            'salary',
            'created_at',
            'last_update',
            'user',
            'edit_url',
        )
        read_only_fields = ('user',)
        extra_kwargs = {}

    def get_created_at(self,obj):
        if obj.created_at.date() == timezone.now().date():
            return obj.created_at.strftime(u"今天 %H:%M")
        else:
            return obj.created_at.strftime("%Y-%m-%d")

    def get_last_update(self,obj):
        if obj.last_update.date() == timezone.now().date():
            return obj.last_update.strftime(u"今天 %H:%M")
        else:
            return obj.last_update.strftime("%Y-%m-%d")

    def get_user(self,obj):
        user = obj.user
        return user.uuid

    def get_edit_url(self,obj):
        return reverse('functions:subscription-detail', kwargs={'pk': obj.id})
# class MessageSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Message
#         fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    actor_info = serializers.SerializerMethodField()
    target_info = serializers.SerializerMethodField()
    class Meta:
        model = Notification
        fields = (
            'recipient',
            'verb',
            'created_at',
            'user',
            'actor_info',
            'target_info'
        )
        read_only_fields = ('user',)
        extra_kwargs = {"recipient": {"write_only": True},
                        }

    def get_created_at(self,obj):
        if obj.timestamp.date() == timezone.now().date():
            return obj.timestamp.strftime(u"今天 %H:%M")
        else:
            return obj.timestamp.strftime("%Y-%m-%d")

    def get_user(self,obj):
        user = obj.recipient
        return user.uuid

    def get_actor_info(self,obj):
        if getattr(obj.actor, 'uuid', False):
            rlt = {
                "content_type": str(obj.actor_content_type),
                "pk": obj.actor.uuid
            }
        else:
            rlt = {
                "content_type":str(obj.actor_content_type),
                "pk": obj.actor.pk
            }
        return rlt

    def get_target_info(self, obj):
        rlt = None
        if obj.target:
            if getattr(obj.actor, 'uuid', False):
                rlt = {
                    "content_type": str(obj.actor_content_type),
                    "pk": obj.actor.uuid
                }
            else:
                rlt = {
                    "content_type": str(obj.actor_content_type),
                    "pk": obj.actor.pk
                }

        return rlt


class LaudSerializer(serializers.ModelSerializer):
    user_uuid = serializers.SerializerMethodField()
    position_info = PositionBriefSerializer(read_only=True, source='position')
    edit_url = serializers.SerializerMethodField()
    class Meta:
        model = Laud
        fields = ('user_uuid', 'position','position_info','edit_url')
        read_only_fields = ('user_uuid',)
        extra_kwargs = {'position': {'write_only': True}, }

    def get_user_uuid(self,obj):
        return obj.user.uuid

    def get_edit_url(self,obj):
        return reverse('functions:laud-detail', kwargs={'pk': obj.id})



class CollectionSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    user_uuid = serializers.SerializerMethodField()
    position_info = PositionBriefSerializer(read_only=True, source='position')
    edit_url = serializers.SerializerMethodField()
    class Meta:
        model = Collection
        fields = ('id', 'user_uuid','position','position_info','edit_url','created_at')
        extra_kwargs = {'position': {'write_only': True}, }

    def get_created_at(self, obj):
        if obj.created_at.date() == timezone.now().date():
            return obj.created_at.strftime(u"今天 %H:%M")
        else:
            return obj.created_at.strftime("%Y-%m-%d")

    def get_user_uuid(self,obj):
        return obj.user.uuid

    def get_edit_url(self,obj):
        return reverse('functions:collection-detail', kwargs={'pk': obj.id})

class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = '__all__'

class InvitationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invitation
        fields = '__all__'