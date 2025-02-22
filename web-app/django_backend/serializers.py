from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'birthday', 
                  'gender', 'marital_status', 'country', 'zip_code']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
