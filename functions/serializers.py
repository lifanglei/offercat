from rest_framework import serializers
from django.utils import timezone
from profiles.utils import ChoicesDisplayField
from .models import Subscription,Laud,Collection,Application,Invitation
from notifications.models import Notification
from profiles.utils import ChoicesDisplayField
from django.utils.translation import ugettext_lazy as _

class SubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscription
        fields = '__all__'

# class MessageSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Message
#         fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Notification
        fields = (
            'recipient',
            'verb',
            'created_at',
        )

    def get_created_at(self,obj):
        if obj.timestamp.date() == timezone.now().date():
            return obj.timestamp.strftime(u"今天 %H:%M")
        else:
            return obj.timestamp.strftime("%Y-%m-%d")



class LaudSerializer(serializers.ModelSerializer):

    class Meta:
        model = Laud
        fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()

    class Meta:
        model = Collection
        fields = ('id', 'user', 'position','created_at')

    def get_created_at(self, obj):
        if obj.created_at.date() == timezone.now().date():
            return obj.created_at.strftime(u"今天 %H:%M")
        else:
            return obj.created_at.strftime("%Y-%m-%d")

class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = '__all__'

class InvitationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invitation
        fields = '__all__'