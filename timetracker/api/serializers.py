from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Event


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extrakwargs = {'password':{'write_only':True}}

        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id','text','start','end','author']
        extrakwargs = {'author':{'read_only':True}}