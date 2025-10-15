import base64
from io import BytesIO
import io
from PIL import Image
import numpy as np
import mediapipe as mp
from deepface import DeepFace
import math
import os
import cv2
from django.conf import settings
from django.shortcuts import render 
from rest_framework.views import APIView
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,  check_password
import numpy as np
from .models import UsabilityTestRecordingV4, User, Hobby, Project, SUSForm, Form, EmploymentStatus, Profession, Position, Industry, Gender, AgeGroup, Interest, Consent, Question, Answer, UsabilityTesting, TestingConsent, SUSQuestion, SUSQAnswer, ProjectCriteria, EmotionCapture, Collaboration
from .serializers import EmotionCaptureSerializer, UsabilityTestingSerializer, UserSerializer, ProjectSerializer, AnswerSerializer, ConsentSerializer, TestingConsentSerializer, SUSFormSerializer, SUSQuestionSerializer, SUSQAnswerSerializer, ProjectCriteriaSerializer, CollaborationSerializer
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_protect
from collections import defaultdict
from django.utils.timezone import now
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.core.files.storage import default_storage
from .models import UsabilityTestRecordingV4
from .serializers import UsabilityTestRecordingV4Serializer, FormSerializer, QuestionSerializer
import logging
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated

logger = logging.getLogger(__name__)


def index(request):
    return render (request, 'index.html')


#########################################################################################################################################################################################################################################################
#########################################################################################################################################################################################################################################################
#########################################################################################################################################################################################################################################################
######################################################################################### AUTH RELATED MEHTODS ##########################################################################################################################################
# for sign up [Done]
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))

            user = User.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                birthday=data['birthday'],
                gender=data['gender'],
                marital_status=data['marital_status'],
                country=data['country'],
                zip_code=data['zip_code'],
                email=data['email'],
                password=make_password(data['password'])  # Hash the password
            )

            user_data = {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'birthday': user.birthday,
                'gender': user.gender,
                'marital_status': user.marital_status,
                'country': user.country,
                'zip_code': user.zip_code,
                'hobbies': [],
                'employmentStatuses': [],
                'profession': [],
                'position': [],
                'industry': [],
                'projects': []
            }
            
            return JsonResponse({
                'message': 'User registered successfully!',
                'user': user_data  
            }, status=201)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# for saving hobbies [Done]
@csrf_exempt
def save_hobbies(request, user_id):
    if request.method == 'POST':
        try:
            user = User.objects.get(id=user_id)
            data = json.loads(request.body.decode('utf-8'))
            hobby_names = data.get('hobbies', [])

            for name in hobby_names:
                hobby, created = Hobby.objects.get_or_create(name=name)
                user.hobbies.add(hobby)

            return JsonResponse({'message': 'Hobbies saved successfully!'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# for saving employment status [Done]
@csrf_exempt
def save_employment_status (request, user_id):
    if request.method == 'POST':
        try:
            user = User.objects.get(id=user_id)
            data = json.loads(request.body.decode('utf-8'))
            employment_status = data.get('employmentStatuses', [])

            for employmentStatuses in employment_status:
                employmentStatus, created = EmploymentStatus.objects.get_or_create(employmentStatuses=employmentStatuses)
                user.employmentStatuses.add(employmentStatus)

            return JsonResponse({'message': 'Employment status saved successfully!'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# for saving profession [Done]
@csrf_exempt
def save_profession (request, user_id):
    if request.method == 'POST':
        try:
            user = User.objects.get(id=user_id)
            data = json.loads(request.body.decode('utf-8'))
            profession = data.get('profession', [])

            for profession in profession:
                profession, created = Profession.objects.get_or_create(profession=profession)
                user.profession.add(profession)

            return JsonResponse({'message': 'Profession saved successfully!'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# for saving position [Done]
@csrf_exempt
def save_position (request, user_id):
    if request.method == 'POST':
        try:
            user = User.objects.get(id=user_id)
            data = json.loads(request.body.decode('utf-8'))
            position = data.get('position', [])

            for position in position:
                position, created = Position.objects.get_or_create(position=position)
                user.position.add(position)

            return JsonResponse({'message': 'Position saved successfully!'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# for saving Industry [Done]
@csrf_exempt
def save_industry (request, user_id):
    if request.method == 'POST':
        try:
            user = User.objects.get(id=user_id)
            data = json.loads(request.body.decode('utf-8'))
            industry = data.get('industry', [])

            for industry in industry:
                industry, created = Industry.objects.get_or_create(industry=industry)
                user.industry.add(industry)

            return JsonResponse({'message': 'Industry saved successfully!'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# for login [Done]
@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            password = data.get('password')

            # Check if user exists
            user = User.objects.filter(email=email).first()
            if user is None:
                return JsonResponse({'error': 'Invalid email or password'}, status=400)

            # Check password
            if not check_password(password, user.password):  # ✅ Fixed check_password
                return JsonResponse({'error': 'Wrong password! Please try again.'}, status=400)

            # Return user details
            user_data = {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'birthday': user.birthday,
                'gender': user.gender,
                'marital_status': user.marital_status,
                'country': user.country,
                'zip_code': user.zip_code,
                'hobbies': list(user.hobbies.values('id', 'name')),
                'employmentStatuses': list(user.employmentStatuses.values('id', 'employmentStatuses')),
                'profession': list(user.profession.values('id', 'profession')),
                'position': list(user.position.values('id', 'position')),
                'industry': list(user.industry.values('id', 'industry')),
                'projects': list(user.projects.values('id', 'name'))
            }
            return JsonResponse({
                'message': 'Login successful',
                'user': user_data 
            }, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# [Done] fetch the users together with their projects to display on ResearcherDashboard.jsx [Done] 
@csrf_exempt
def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user_data = {
            "id": user.id,  # Add ID to response
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "birthday": user.birthday,
            "gender": user.gender,
            "marital_status": user.marital_status,
            "country": user.country,
            "zip_code": user.zip_code,
            "hobbies": list(user.hobbies.values("id", "name")), 
            "employmentStatuses": list(user.employmentStatuses.values("id", "employmentStatuses")),
            "profession": list(user.profession.values("id", "profession")),
            "position": list(user.position.values("id", "position")),
            "industry": list(user.industry.values("id", "industry")),
            "projects": list(user.projects.values(
                "id", "name", "description", "organization",
                "max_participants", "start_date", "end_date", "side_notes",
                "image_path", "category", "is_shared"
            )),
        }
        return JsonResponse(user_data, status=200)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)


#########################################################################################################################################################################################################################################################
#########################################################################################################################################################################################################################################################
#########################################################################################################################################################################################################################################################
######################################################################################### PROJECT RELATED MEHTODS (RESEARCHER SIDE) #####################################################################################################################

# [Done] for fetching shared project on collaborator side on ResearcherDashboard.jsx
@api_view(["GET"])
def get_shared_projects(request, user_id):
    collaborations = Collaboration.objects.filter(collaborator_id=user_id)
    projects = [c.project for c in collaborations]
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

# [Done] for deleting the projects (when delete the proj, it will detele its related susforms, questions and answers and usability testings)
@csrf_exempt
def delete_project(request, project_id):
    if request.method == "DELETE":
        project = get_object_or_404(Project, id=project_id)

        # Manually delete related susforms (if no other project uses them)
        for susform in project.susforms.all():
            susform.delete()

        # Same for usability_testings, forms, etc.
        for ut in project.usability_testings.all():
            ut.delete()

        project.delete()
        return JsonResponse({"message": "Project and related forms deleted successfully"}, status=200)
    
    return JsonResponse({"error": "Method not allowed"}, status=405)

# [Done] for creating projects 
@api_view(['POST'])
def create_project(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        data = request.data
        
        print("Received data:", data)  # Debug log

        # Required fields
        project_name = data.get('name')
        project_description = data.get('description')
        consent_text = data.get('consent_text', '')  # Default to empty string
        
        print("Consent text received:", consent_text)  # Debug log

        if not project_name or not project_description:
            return Response({'error': 'Project name and description are required.'}, status=400)

        project = Project.objects.create(
            name=project_name,
            description=project_description,
            category = data.get('category'),
            organization=data.get('organization'),
            max_participants=data.get('max_participants'),
            start_date=data.get('start_date'),
            end_date=data.get('end_date'),
            side_notes=data.get('side_notes'),
            image_path=data.get('image_path'),
            consent_text=consent_text  
        )
        
        user.projects.add(project)
        print("Project created with consent:", project.consent_text) 

        return Response({
            'message': 'Project created successfully!', 
            'project_id': project.id,
            'has_consent': bool(project.consent_text)  
        }, status=status.HTTP_201_CREATED)

    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)
    except Exception as e:
        print("Error creating project:", str(e))  # Debug log
        return Response({'error': str(e)}, status=500)

# [Done] for viewing each project in the ProjectDashboard.jsx 
def get_project(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        return JsonResponse({
            "id": project.id,
            "name": project.name,
            "category":project.category,
            "description": project.description,
            "organization": project.organization,
            "max_participants": project.max_participants,
            "start_date": project.start_date,
            "end_date": project.end_date,
            "side_notes": project.side_notes,
            "image_path": project.image_path,
            "is_shared" : project.is_shared, 
            "usability_testings": list(project.usability_testings.values("id", "title", "task")),
        })
    except Project.DoesNotExist:
        return JsonResponse({"error": "Project not found"}, status=404)

    
# [Done] publish the project 
@api_view(['POST'])
def publish_project(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        project.is_shared = True
        project.save()
        return Response({"message": "Project shared successfully!"}, status=200)
    except Project.DoesNotExist:
        return Response({"error": "Project not found."}, status=404)

# [Done] un-publish the project 
@api_view(['POST'])
def unpublish_project(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        project.is_shared = False
        project.save()
        return Response({"message": "Project unpublished successfully!"}, status=200)
    except Project.DoesNotExist:
        return Response({"error": "Project not found."}, status=404)

# [Done] searching email function 
@api_view(['GET'])
def search_users_by_email(request):
    query = request.GET.get('q', '')
    if query:
        users = User.objects.filter(email__icontains=query).values('id', 'email')
        return Response(list(users))
    return Response([])

# [Done] adding collaborators to project
@api_view(['POST'])
def add_collaborator(request):
    try:
        project_id = request.data.get('project_id')
        collaborator_id = request.data.get('collaborator_id')
        researcher_id = request.data.get('researcher_id')
        researcher_email = request.data.get('researcher_email')

        collaborator = User.objects.get(id=collaborator_id)
        researcher = User.objects.get(id=researcher_id)
        project = Project.objects.get(id=project_id)

        collaboration = Collaboration.objects.create(
            project=project,
            researcher=researcher,
            collaborator=collaborator,
            researcher_email=researcher_email,
            collaborator_email=collaborator.email
        )
        serializer = CollaborationSerializer(collaboration)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
# [Done] display a list of collaborators in the project 
@api_view(['GET'])
def get_collaborators(request, project_id):
    collaborations = Collaboration.objects.filter(project_id=project_id)
    data = [
        {
            "id": collab.id,
            "collaborator_email": collab.collaborator_email,
            "collaborator_id": collab.collaborator.id
        }
        for collab in collaborations
    ]
    return Response(data)

# [Done] remove the collaborators 
@api_view(['DELETE'])
def delete_collaborator(request, collaboration_id):
    try:
        collaboration = Collaboration.objects.get(id=collaboration_id)
        collaboration.delete()
        return Response({"message": "Collaborator removed."}, status=status.HTTP_204_NO_CONTENT)
    except Collaboration.DoesNotExist:
        return Response({"error": "Collaboration not found."}, status=status.HTTP_404_NOT_FOUND)


# [Done] editing the project info 
@csrf_exempt
def update_project(request, project_id):
    if request.method == "PATCH":
        try:
            project = get_object_or_404(Project, id=project_id)
            data = json.loads(request.body.decode('utf-8'))

            # Update only provided fields
            project.name = data.get("name", project.name)
            project.category = data.get("category", project.category)
            project.description = data.get("description", project.description)
            project.organization = data.get("organization", project.organization)
            project.max_participants = data.get("max_participants", project.max_participants)
            project.start_date = data.get("start_date", project.start_date)
            project.end_date = data.get("end_date", project.end_date)
            project.side_notes = data.get("side_notes", project.side_notes)

            project.save()
            return JsonResponse({"message": "Project updated successfully"}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


# ✅ saving project criteria 
@api_view(["POST"])
def create_or_update_criteria(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
    except Project.DoesNotExist:
        return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)

    data = request.data

    criteria, created = ProjectCriteria.objects.get_or_create(project=project)
    criteria.gender = data.get("gender", [])
    criteria.age_group = data.get("ageGroup", [])
    criteria.interest = data.get("interest", [])
    criteria.save()

    return Response({"message": "Criteria updated successfully!"}, status=status.HTTP_200_OK)

# ✅ fetching project criteria 
@api_view(['GET'])
def get_project_criteria(request, project_id):
    try:
        criteria = ProjectCriteria.objects.get(project_id=project_id)
        serializer = ProjectCriteriaSerializer(criteria)
        return Response(serializer.data)
    except ProjectCriteria.DoesNotExist:
        return Response({"detail": "No criteria set for this project."}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def save_critieria_gender (request, project_id):
    if request.method == 'POST': 
        try: 
            project = Project.objects.get(id= project_id)
            data = json.loads(request.body.decode('utf-8'))
            gender = data.get('gender', [])

            for gender in gender:
                gender, created = Gender.objects.get_or_create(gender=gender)
                project.gender.add(gender)
            
            return JsonResponse({'message': 'Gender saved successfully!'})
        except Project.DoesNotExist: 
            return JsonResponse({'error': 'Project not found'}, status=404)
        except Exception as e: 
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def save_critieria_age_group (request, project_id):
    if request.method == 'POST': 
        try: 
            project = Project.objects.get(id= project_id)
            data = json.loads(request.body.decode('utf-8'))
            age_group = data.get('age_group', [])

            for age_group in age_group:
                age_group, created = AgeGroup.objects.get_or_create(age_group=age_group)
                project.age_group.add(age_group)
            
            return JsonResponse({'message': 'Age group saved successfully!'})
        except Project.DoesNotExist: 
            return JsonResponse({'error': 'Project not found'}, status=404)
        except Exception as e: 
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def save_critieria_interest (request, project_id):
    if request.method == 'POST': 
        try: 
            project = Project.objects.get(id= project_id)
            data = json.loads(request.body.decode('utf-8'))
            interest = data.get('interest', [])

            for interest in interest:
                interest, created = Interest.objects.get_or_create(interest=interest)
                project.interest.add(interest)
            
            return JsonResponse({'message': 'Interest saved successfully!'})
        except Project.DoesNotExist: 
            return JsonResponse({'error': 'Project not found'}, status=404)
        except Exception as e: 
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# SUS FORM RELATED METHODS (RESEARCER SIDE) ##########################################################
# [Done] creating sus form 
@api_view(['POST'])
def create_susform(request, project_id):
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist: 
            return Response({'error': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'POST':
            serializer = SUSFormSerializer(data=request.data)
            if serializer.is_valid(): 
                susform = serializer.save() 
                project.susforms.add(susform)

                return Response({'message': 'Form created successfully!', 'susform_id': susform.id}, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ✅ getting sus form list 
@api_view(['GET'])
def get_susform(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        susforms = project.susforms.all()
    except Project.DoesNotExist:
        return Response({'error': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SUSFormSerializer(susforms, many=True)
    return Response({'susforms': serializer.data}, status=status.HTTP_200_OK)

# ✅ delete the sus forms 
@api_view(['DELETE'])
def delete_susform(request, susform_id):
    try: 
        susform = SUSForm.objects.get(id=susform_id)
    except SUSForm.DoesNotExist: 
        return Response({'error': 'Form is not found.'},  status=status.HTTP_404_NOT_FOUND)
    
    susform.delete()
    return Response({'message': 'Form deleted successfully.'}, status=status.HTTP_200_OK)

# ✅ get the detail of each sus form 
@api_view(['GET'])   
def susform_detail(request, susform_id):
    try: 
        susform = SUSForm.objects.get(id=susform_id)
    except SUSForm.DoesNotExist: 
        return Response({'error': 'Form is not found.'},  status=status.HTTP_404_NOT_FOUND)
    
    serializer = SUSFormSerializer(susform)
    return Response(serializer.data, status=status.HTTP_200_OK)


# QUESTIONS RELATED METHODS (RESEARCER SIDE) ##########################################################
# ✅ create or update question 
@api_view(['POST'])
def create_or_update_sus_questions(request, form_id):
    try:
        form = SUSForm.objects.get(id=form_id)
    except SUSForm.DoesNotExist:
        return Response({"error": "Form not found."}, status=status.HTTP_404_NOT_FOUND)

    questions_data = request.data.get("questions", [])

    if len(questions_data) != 10:
        return Response({"error": "Exactly 10 questions are required."}, status=status.HTTP_400_BAD_REQUEST)

    existing_questions = SUSQuestion.objects.filter(susform=form).order_by("id")

    if existing_questions.exists():
        # Update existing questions
        for i, question in enumerate(existing_questions):
            question.question_text = questions_data[i]
            question.save()
        return Response({"message": "Questions updated successfully."}, status=status.HTTP_200_OK)
    else:
        # Create new questions
        for question_text in questions_data:
            SUSQuestion.objects.create(susform=form, question_text=question_text)
        return Response({"message": "Questions created successfully."}, status=status.HTTP_201_CREATED)

# ✅ display question on the participant side 
@api_view(['GET'])
def get_sus_questions(request, form_id):
    try:
        questions = SUSQuestion.objects.filter(susform_id=form_id)  # ✅ Fixed
        serializer = SUSQuestionSerializer(questions, many=True)
        return Response(serializer.data, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=400)


# ✅ display question on the participant side 
@api_view(['POST'])
def create_or_update_susanswer(request, question_id):
    """Create or update an answer for a specific question."""
    question = get_object_or_404(SUSQuestion, id=question_id)

    # Extract user email from request (Frontend should send it)
    user_email = request.data.get("participant_email")
    if not user_email:
        return Response({"error": "User email is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch user based on email
    try:
        user = User.objects.get(email=user_email)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Extract answer text from request
    answer_text = request.data.get("answer_text")
    if not answer_text:
        return Response({"error": "Answer text is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the user has already answered this question
    existing_answer = SUSQAnswer.objects.filter(susquestion=question, participant_email=user).first()
    
    if existing_answer:
        # If an answer exists, update it
        existing_answer.answer = answer_text
        existing_answer.save()
        serializer = SUSQAnswerSerializer(existing_answer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        # If no answer exists, create a new one
        answer = SUSQAnswer.objects.create(
            susquestion=question,
            participant_email=user,
            answer=answer_text
        )
        serializer = SUSQAnswerSerializer(answer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# ✅ display answers from the sus question + sus score on ViewResults.jsx page
@api_view(['GET'])
def get_sus_answers_results(request, form_id):
    """Get the answers of all participants for a given SUS form, displaying answers in a table format."""
    form = get_object_or_404(SUSForm, id=form_id)
    
    # Get all the questions for the form
    questions = SUSQuestion.objects.filter(susform=form)
    
    # Fetch all answers for the form
    answers = SUSQAnswer.objects.filter(susquestion__susform=form)
    
    # Group answers by participant
    grouped_answers = defaultdict(lambda: {q.id: None for q in questions})  # Default to empty answers for each question
    for answer in answers:
        grouped_answers[answer.participant_email.email][answer.susquestion.id] = answer.answer
    
    # Prepare response data
    response_data = []
    for participant_email, answers in grouped_answers.items():
        participant_data = {
            'participant_email': participant_email,
        }
        for question in questions:
            participant_data[f'Q{question.id}'] = answers.get(question.id)
        response_data.append(participant_data)
    
    return Response(response_data, status=status.HTTP_200_OK)





@api_view(['POST'])
def create_form(request, project_id):
        try:
            project = Project.objects.get(id=project_id)
        except Project.DoesNotExist: 
            return Response({'error': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)

        if request.method == 'POST':
            serializer = FormSerializer(data=request.data)
            if serializer.is_valid(): 
                form = serializer.save() 
                project.forms.add(form)

                return Response({'message': 'Form created successfully!', 'form_id': form.id}, status=status.HTTP_201_CREATED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_form(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        forms = project.forms.all()
    except Project.DoesNotExist:
        return Response({'error': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = FormSerializer(forms, many=True)
    return Response({'forms': serializer.data}, status=status.HTTP_200_OK)

@api_view(['GET'])   
def form_detail(request, form_id):
    try: 
        form = Form.objects.get(id=form_id)
    except Form.DoesNotExist: 
        return Response({'error': 'Form is not found.'},  status=status.HTTP_404_NOT_FOUND)
    
    serializer = FormSerializer(form)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def ShareFormView(request, form_id):
    try:
        form = Form.objects.get(id=form_id)
        form.is_shared = True
        form.save()
        return Response({"message": "Form shared successfully!"}, status=200)
    except Form.DoesNotExist:
        return Response({"error": "Form not found."}, status=404)
        

#for updating form 
@csrf_exempt
def update_form(request, form_id):
    if request.method == 'PATCH':
        try:
            form = Form.objects.get(id=form_id)
            data = json.loads(request.body.decode('utf-8'))
            form.title = data.get('title', form.title)  # Update only if provided
            form.save()
            return JsonResponse({'message': 'Form updated successfully'}, status=200)
        except Form.DoesNotExist:
            return JsonResponse({'error': 'Form not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@api_view(['DELETE'])
def delete_form(request, form_id):
    try: 
        form = Form.objects.get(id=form_id)
    except Form.DoesNotExist: 
        return Response({'error': 'Form is not found.'},  status=status.HTTP_404_NOT_FOUND)
    
    form.delete()
    return Response({'message': 'Form deleted successfully.'}, status=status.HTTP_200_OK)


# if the consent form does not exist, create one 
# if the consent form exists, updates it instead of creating a new one
@api_view(['POST'])
def create_or_update_consent(request, form_id):
    form = get_object_or_404(Form, id=form_id)

    # Check if a Consent already exists for this form
    consent, created = Consent.objects.get_or_create(form=form)

    # Update the existing consent instead of creating a new one
    serializer = ConsentSerializer(consent, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_consent(request, form_id):
    try:
        consent = Consent.objects.get(form_id=form_id)
        serializer = ConsentSerializer(consent)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Consent.DoesNotExist:
        return Response({"detail": "Consent not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_consent(request, form_id, consent_id):
    consent = get_object_or_404(Consent, id=consent_id, form_id=form_id)
    consent.delete()
    return Response({'message': 'Consent deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def create_question(request, form_id):
    """Create a new question for a specific form."""
    form = get_object_or_404(Form, id=form_id)

    # Ensure 'form' is included before saving
    data = request.data.copy()  
    data['form'] = form.id  

    serializer = QuestionSerializer(data=data)
    if serializer.is_valid():
        serializer.save()  # The form is already included in data
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_questions(request, form_id):
    """Retrieve all questions for a specific form."""
    questions = Question.objects.filter(form_id=form_id)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_question(request, form_id, question_id):
    """Delete a specific question from a form."""
    question = get_object_or_404(Question, id=question_id, form_id=form_id)
    question.delete()
    return Response({'message': 'Question deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def create_answer(request, question_id):
    """Create a new answer for a specific question."""
    question = get_object_or_404(Question, id=question_id)

    # Extract user email from request (Frontend should send it)
    user_email = request.data.get("participant_email")
    if not user_email:
        return Response({"error": "User email is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch user based on email
    try:
        user = User.objects.get(email=user_email)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Extract answer text from request
    answer_text = request.data.get("answer_text")
    if not answer_text:
        return Response({"error": "Answer text is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Create the Answer object explicitly
    answer = Answer.objects.create(
        question=question,
        participant_email=user,  # Assign the User object directly
        answer_text=answer_text
    )

    # Serialize the created answer for the response
    serializer = AnswerSerializer(answer)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_form_answers(request, form_id):
    """Retrieve all answers for a specific form."""
    questions = Question.objects.filter(form_id=form_id)
    answers = Answer.objects.filter(question__in=questions)

    serializer = AnswerSerializer(answers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# USABILITY TESTING RELATED METHODS (RESEARCER SIDE) ##########################################################
# [Done] for creating usability testings
@api_view(['POST'])
def create_usability_testing(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        serializer = UsabilityTestingSerializer(data=request.data)
        if serializer.is_valid():
            usability_testing = serializer.save()
            project.usability_testings.add(usability_testing)

            return Response({
                'message': 'Usability testing created successfully',
                'usability_testing_id': usability_testing.id
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#f ✅ or retrieving usability testing list in ProjectDashboard page 
@api_view(['GET'])
def get_usability_testing(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        usability_testings = project.usability_testings.all()
    except Project.DoesNotExist:
        return Response({'error': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UsabilityTestingSerializer(usability_testings, many=True)
    return Response({'usability_testings': serializer.data}, status=status.HTTP_200_OK)

# ✅ for retrieving usability testind details
@api_view(['GET'])
def usability_testing_detail(request, usability_testing_id):
    try:
        usability_testing = UsabilityTesting.objects.get(id=usability_testing_id)
    except UsabilityTesting.DoesNotExist:
        return Response({'error': 'Usability testing not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UsabilityTestingSerializer(usability_testing)
    return Response(serializer.data, status=status.HTTP_200_OK)

# ✅ for deleting the usability testing
@api_view(['DELETE'])
def delete_usability_testing(request, usability_testing_id):
    try:
        usability_testing = UsabilityTesting.objects.get(id=usability_testing_id)
    except UsabilityTesting.DoesNotExist:
        return Response({'error': 'Usability testing not found.'}, status=status.HTTP_404_NOT_FOUND)

    usability_testing.delete()
    return Response({'message': 'Usability testing deleted successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_or_update_testingconsent(request, usability_testing_id):
    # Fetch the UsabilityTesting instance
    usability_testing = get_object_or_404(UsabilityTesting, id=usability_testing_id)

    # Ensure the correct field name is used when creating or fetching TestingConsent
    consent, created = TestingConsent.objects.get_or_create(usability_testing=usability_testing)

    # Update the existing consent instead of creating a new one
    serializer = TestingConsentSerializer(consent, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_testingconsent(request, usability_testing_id):
    try:
        consent = TestingConsent.objects.get(usability_testing_id=usability_testing_id)
        serializer = TestingConsentSerializer(consent)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Consent.DoesNotExist:
        return Response({"detail": "Consent not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def check_recording(request, usability_testing_id):
    user = request.user
    has_recording = UsabilityTestRecordingV4.objects.filter(user=user, usability_testing_id=usability_testing_id).exists()
    return Response({"hasRecording": has_recording})


@api_view(['POST'])
def validate_camera_frame(request):
    try:
        image_data = request.data.get('image')
        if not image_data:
            return Response({'error': 'No image data provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Decode base64 image
        content = image_data.split(';base64,')[-1]
        image_bytes = base64.b64decode(content)
        np_arr = np.frombuffer(image_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        result = {
            'face_detected': False,
            'multiple_faces': False,
            'blurry': False,
            'too_dark': False,
            'too_bright': False,
        }

        # Lighting check
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        mean_brightness = np.mean(gray)
        result['too_dark'] = mean_brightness < 50
        result['too_bright'] = mean_brightness > 200

        # Blur check
        blur_score = cv2.Laplacian(gray, cv2.CV_64F).var()
        result['blurry'] = blur_score < 100

        # Face detection using FaceMesh (supports multiple)
        mp_face_mesh = mp.solutions.face_mesh
        with mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=5, refine_landmarks=True, min_detection_confidence=0.5) as face_mesh:
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results_mesh = face_mesh.process(rgb_frame)

            if results_mesh.multi_face_landmarks:
                face_count = len(results_mesh.multi_face_landmarks)
                result['face_detected'] = True
                result['multiple_faces'] = face_count > 1

                # ❌ Reject if more than one face
                if face_count > 1:
                    return Response(result)

        return Response(result)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ✅ record the screen 
@api_view(["POST"])
def save_recording(request):
    parser_classes = (MultiPartParser, FormParser)
    
    usability_testing_id = request.data.get("usability_testing_id")
    video_file = request.FILES.get("video")
    participant_email = request.data.get("participant_email")  # Extract participant email from request

    if not participant_email:
        return Response({"error": "Participant email is required"}, status=400)

    user = User.objects.filter(email=participant_email).first()  # Get user based on email
    if not user:
        return Response({"error": "User not found"}, status=404)

    if UsabilityTestRecordingV4.objects.filter(participant_email=user, usability_testing_id=usability_testing_id).exists():
        raise ValidationError("You can only upload one recording per usability test.")

    logger.info(f"Received recording for Usability Test ID: {usability_testing_id}")

    if not video_file:
        logger.error("No video file provided.")
        return Response({"error": "No video file provided"}, status=400)

    # Save the video file
    usability_testing = UsabilityTesting.objects.get(id=usability_testing_id)
    recording = UsabilityTestRecordingV4.objects.create(
        usability_testing=usability_testing,
        video=video_file,
        participant_email=user  # Save the participant email (user object)
    )

    logger.info(f"Recording saved successfully with ID: {recording.id}")

    return Response(UsabilityTestRecordingV4Serializer(recording).data, status=201)

# ✅ fetch the screen recording 
@api_view(['GET'])
def get_recordings_for_usability_testing(request, usability_testing_id):
    """Retrieve all recordings for a specific usability testing."""
    usability_testing = get_object_or_404(UsabilityTesting, id=usability_testing_id)
    recordings = UsabilityTestRecordingV4.objects.filter(usability_testing=usability_testing)
    
    # Serialize the data and return it
    serializer = UsabilityTestRecordingV4Serializer(recordings, many=True)
    return Response(serializer.data)

def video_view(request, video_name):
    print(f"Requested video: {video_name}")  # Debugging log
    video_path = os.path.join(settings.MEDIA_ROOT, 'recordings', video_name)
    print(f"Video path: {video_path}")  # Debugging log

    if os.path.exists(video_path):
        with open(video_path, 'rb') as f:
            return HttpResponse(f.read(), content_type='video/webm')
    else:
        print(f"Video not found: {video_path}")  # Debugging log
        return HttpResponse("Video not found", status=404)
    

import logging

logger = logging.getLogger(__name__)

# ✅ emotion detection 
@api_view(['POST'])
def emotion_detection(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request'}, status=400)
    
    user_email=request.data.get("participant_email")
    if not user_email: 
        return Response({"error": "User email is required."}, status=status.HTTP_400)
    
    # Fetch user based on email
    try:
        user = User.objects.get(email=user_email)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    try:
        # Decode the base64 image
        image_data = request.data.get('image').split(',')[1]
        test_id = request.data.get('test_id')  # <-- Get test ID from frontend
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        image = np.array(image)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # Initialize Mediapipe FaceMesh
        mp_face_mesh = mp.solutions.face_mesh
        face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, min_detection_confidence=0.5)
        results = face_mesh.process(image)
        print(results.multi_face_landmarks)  # Log face landmarks ************************


        bounding_box = None
        dominant_emotion = 'No emotion detected'
        emotion_probabilities = {}

        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                ih, iw, _ = image.shape
                min_x, min_y, max_x, max_y = iw, ih, 0, 0

                for lm in face_landmarks.landmark:
                    x, y = int(lm.x * iw), int(lm.y * ih)
                    min_x, min_y = min(min_x, x), min(min_y, y)
                    max_x, max_y = max(max_x, x), max(max_y, y)

                bounding_box = {'x': min_x, 'y': min_y, 'width': max_x - min_x, 'height': max_y - min_y}

            # Perform emotion recognition using DeepFace
            analysis = DeepFace.analyze(image, actions=['emotion'], enforce_detection=False)
            dominant_emotion = analysis[0]['dominant_emotion']
            emotion_probabilities = analysis[0]['emotion']

            # Save to EmotionSnapshot model
            test_instance = UsabilityTesting.objects.get(id=test_id)
            EmotionCapture.objects.create(
                usability_test=test_instance,
                participant_email=user,
                sad=emotion_probabilities.get('sad'),
                angry=emotion_probabilities.get('angry'),
                disgust=emotion_probabilities.get('disgust'),
                fear=emotion_probabilities.get('fear'),
                happy=emotion_probabilities.get('happy'),
                surprise=emotion_probabilities.get('surprise'),
                neutral=emotion_probabilities.get('neutral'),
                dominant=dominant_emotion
            )

        return JsonResponse({
            'emotion': dominant_emotion,
            'bounding_box': bounding_box,
            'emotion_probabilities': emotion_probabilities,
        })

    except Exception as e:
        import traceback
        print("=== Emotion Detection Error ===")
        print(traceback.format_exc())
        return JsonResponse({'error': f"Backend error: {str(e)}"}, status=500)


# ✅ fetching the emotion data
@api_view(['GET'])
def emotion_data_list(request, usability_testing_id):
    queryset = EmotionCapture.objects.filter(usability_test_id=usability_testing_id)
    
    # Filter by participant if provided
    participant_email = request.query_params.get('participant', None)
    if participant_email is not None:
        queryset = queryset.filter(participant_email__email=participant_email)
        
    serializer = EmotionCaptureSerializer(queryset.order_by('timestamp'), many=True)
    return Response(serializer.data)


#########################################################################################################################################################################################################################################################
#########################################################################################################################################################################################################################################################
#########################################################################################################################################################################################################################################################
######################################################################################### PROJECT RELATED MEHTODS (PARTICIPANT SIDE) ####################################################################################################################
# ✅ get all projects on the homepage for participant 
def get_all_published_projects(request):
    if request.method == "GET":
        projects = Project.objects.filter(is_shared=True).values(
            "id", "name", "description", "organization",
            "max_participants", "start_date", "end_date", "side_notes",
            "image_path", "category", "is_shared", "consent_text" 
        )
        return JsonResponse(list(projects), safe=False)
    return JsonResponse({"error": "Invalid request method."}, status=405)

# ✅ display project's forms to display in the ChooseTest.jsx
@api_view(['GET'])
def get_project_forms(request, project_id):
    try:
        project = Project.objects.get(id=project_id) 
        forms = list(project.susforms.values("id", "susform_title", "susform_description")) 
        serializer = SUSFormSerializer(forms, many=True)  
        return Response(serializer.data, status=200)  
    except Project.DoesNotExist:
        return Response({"error": "Project not found."}, status=404)

# ✅ to display the consent in the choosetest.jsx 
@api_view(['GET'])
def get_project_details(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        data = {
            "id": project.id,
            "name": project.name,
            "consent_text": project.consent_text,
        }
        return Response(data, status=200)
    except Project.DoesNotExist:
        return Response({"error": "Project not found."}, status=404)



# ✅ display project's usability testing to display in the ChooseTest.jsx       
def get_project_usabilitytesting(request, project_id):
    if request.method == "GET":
        try:
            project = Project.objects.get(id=project_id)
            usability_testings = list(project.usability_testings.values("id", "title", "task"))
            print("Fetched usability testings:", usability_testings)  # Debugging line
            return JsonResponse(usability_testings, safe=False)
        except Project.DoesNotExist:
            print("Project not found")  # Debugging line
            return JsonResponse({"error": "Project not found."}, status=404)
    print("Invalid request method")  # Debugging line
    return JsonResponse({"error": "Invalid request method."}, status=405)


# ✅ for retrieving all forms for participant to display in the homepage (OLD CODE - to be deleted ❌ )
def get_all_forms(request):
    if request.method == "GET":
        forms = list(Form.objects.values("id", "title"))
        return JsonResponse(forms, safe=False)
    return JsonResponse({"error": "Invalid request method."}, status=405)

    
    

# ✅ Update user information from MyAccount page 


#########################################################################################################################################################################################################################################################
#########################################################################################################################################################################################################################################################
#########################################################################################################################################################################################################################################################
######################################################################################### ADMIN RELATED MEHTODS (ADMIN SIDE) ####################################################################################################################
# Fetch All Users for Admin Dashboard
@csrf_exempt
def get_all_users(request):
    if request.method == 'GET':
        try:
            users = User.objects.all().values(
                'id', 'first_name', 'last_name', 'email', 'birthday', 
                'gender', 'marital_status', 'country', 'zip_code'
            )
            return JsonResponse(list(users), safe=False, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# deleting the users together with hobbies and projects 
@csrf_exempt
def delete_user(request, user_id):
    if request.method == "DELETE":
        try:
            user = get_object_or_404(User, id=user_id)

            # Delete associated hobbies (Many-to-Many relationship)
            user.hobbies.clear()

            # Delete associated projects (Many-to-Many relationship)
            user.projects.all().delete()

            # Delete the user
            user.delete()

            return JsonResponse({"message": "User deleted successfully"}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Method not allowed"}, status=405)


