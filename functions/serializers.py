from rest_framework import serializers
from django.utils import timezone
from profiles.utils import ChoicesDisplayField
from .models import Subscription, Message,Laud,Collection,Application,Invitation

from django.utils.translation import ugettext_lazy as _

class SubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscription
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'

class LaudSerializer(serializers.ModelSerializer):

    class Meta:
        model = Laud
        fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collection
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = '__all__'

class InvitationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invitation
        fields = '__all__'