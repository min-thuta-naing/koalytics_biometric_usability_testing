from django.conf import settings
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Hobby, Project, Form, Question, Answer, Consent

from .models import UsabilityTestRecordingV4
from .models import UsabilityTesting


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


class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = ['id', 'title', 'is_shared']

class ConsentSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Consent 
        fields = ['id', 'form', 'consent_text']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'form', 'question_text', 'question_type']
        #extra_kwargs = {'created_by': {'read_only': True}}

class AnswerSerializer(serializers.ModelSerializer):
    participant_email = serializers.EmailField(source="participant_email.email", read_only=True)

    class Meta:
        model = Answer
        fields = ['id', 'question', 'participant_email', 'answer_text']

class UsabilityTestingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsabilityTesting #model name 
        fields = ['id', 'title', 'task', 'duration', 'website_link', 'figma_embed_code'] #fields inside that mdoels 


class UsabilityTestRecordingV4Serializer(serializers.ModelSerializer):
    participant_email = serializers.EmailField(source="participant_email.email", read_only=True)
    video = serializers.SerializerMethodField()

    def get_video(self, obj):
        # Return the correct URL for the video file
        return f"{settings.MEDIA_URL}/{obj.video.name}"

    class Meta:
        model = UsabilityTestRecordingV4
        fields = ['id', 'usability_testing', 'video', 'participant_email']












    # def create(self, validated_data):
    #     hobbies_data = validated_data.pop('hobbies', [])
    #     validated_data['password'] = make_password(validated_data['password'])
    #     user = User.objects.create(**validated_data)

    #     # Link hobbies to user
    #     for hobby_data in hobbies_data:
    #         hobby, _ = Hobby.objects.get_or_create(name=hobby_data['name'])
    #         user.hobbies.add(hobby)

    #     return user
