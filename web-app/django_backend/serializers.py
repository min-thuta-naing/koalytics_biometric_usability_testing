from django.conf import settings
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Hobby, EmploymentStatus, Profession, Position, Industry, Project, Form, Question, Answer, Consent, TestingConsent, SUSForm, SUSQuestion, SUSQAnswer,Gender, AgeGroup, Interest, ProjectCriteria,EmotionCapture, Collaboration

from .models import UsabilityTestRecordingV4
from .models import UsabilityTesting

class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields = ['id', 'name']

class EmploymentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentStatus
        fields = ['id', 'employmentStatuses']

class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ['id', 'profession']

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ['id', 'position']

class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = ['id', 'industry']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    hobbies = HobbySerializer(many=True, read_only=True)
    employmentStatuses = EmploymentStatusSerializer(many=True, read_only=True)
    profession = ProfessionSerializer(many=True, read_only=True)
    position = PositionSerializer(many=True, read_only=True)
    industry = IndustrySerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'birthday', 
                  'gender', 'marital_status', 'country', 'zip_code', 'hobbies',
                  'employmentStatuses', 'profession', 'position', 'industry', 'projects'
        ]

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

# ✅  
class ProjectSerializer (serializers.ModelSerializer):               
    class Meta: 
        model = Project
        fields = ["id", "name", "category", "image_path", "description", "organization", "max_participants", "start_date", "end_date", "side_notes", "consent_text", "is_shared"]

# ✅  
class CollaborationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collaboration
        fields = '__all__'

# ✅
class ProjectCriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCriteria
        fields = ["id", "gender", "age_group", "interest"]


# ✅
class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = ['id', 'gender']  

# ✅
class AgeGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgeGroup
        fields = ['id', 'age_group']  

# ✅
class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ['id', 'interest'] 


class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Form
        fields = ['id', 'title', 'is_shared']

# ✅
class SUSFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = SUSForm
        fields = ['id', 'susform_title', 'susform_description']

# ✅
class SUSQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SUSQuestion
        fields = ['id', 'susform', 'question_text']

# ✅
class SUSQAnswerSerializer(serializers.ModelSerializer):
    participant_email = serializers.EmailField(source="participant_email.email", read_only=True)

    class Meta:
        model = SUSQAnswer
        fields = ['id', 'susquestion', 'participant_email', 'answer']


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

class TestingConsentSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = TestingConsent
        fields = ['id', 'usability_testing', 'consent_text']

class EmotionCaptureSerializer(serializers.ModelSerializer):
    participant_email = serializers.EmailField(source='participant_email.email')
    usability_test_title = serializers.CharField(source='usability_test.title', read_only=True)
    
    class Meta:
        model = EmotionCapture
        fields = [
            'id',
            'usability_test',
            'usability_test_title',
            'participant_email',
            'timestamp',
            'sad',
            'angry',
            'disgust',
            'fear',
            'happy',
            'surprise',
            'neutral',
            'dominant'
        ]
        read_only_fields = ['id', 'timestamp']


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
