from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Hobby, Project

class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ['id','name']

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'birthday', 
                  'gender', 'marital_status', 'country', 'zip_code', 'hobbies']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    
class ProjectSerializer (serializers.ModelSerializer):
    
    class Meta: 
        model = Project
        fields = ["id", "name", "description", "organization", "max_participants", "start_date", "end_date", "side_notes"]














    # def create(self, validated_data):
    #     hobbies_data = validated_data.pop('hobbies', [])
    #     validated_data['password'] = make_password(validated_data['password'])
    #     user = User.objects.create(**validated_data)

    #     # Link hobbies to user
    #     for hobby_data in hobbies_data:
    #         hobby, _ = Hobby.objects.get_or_create(name=hobby_data['name'])
    #         user.hobbies.add(hobby)

    #     return user
