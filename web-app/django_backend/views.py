import base64
from io import BytesIO
import io
from PIL import Image
import mediapipe as mp
from deepface import DeepFace



import os
import cv2
from django.conf import settings
from django.shortcuts import render 

from rest_framework.views import APIView
# import for sign up & log in 
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,  check_password
import numpy as np
from .models import UsabilityTestRecordingV4, User, Hobby, Project, SUSForm, Form, EmploymentStatus, Profession, Position, Industry, Gender, AgeGroup, Interest, Consent, Question, Answer, UsabilityTesting, TestingConsent, SUSQuestion
from .serializers import UsabilityTestingSerializer, UserSerializer, ProjectSerializer, AnswerSerializer, ConsentSerializer, TestingConsentSerializer, SUSFormSerializer
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_protect


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

# AUTENTICATION RELATED METHODS ##########################################################
# for sign up 
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

           
            # return JsonResponse({'message': 'User registered successfully!', 'user_id': user.id}, status=201)
            return JsonResponse({
                'message': 'User registered successfully!',
                'user_id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'birthday': user.birthday,
                'gender': user.gender,
                'marital_status': user.marital_status,
                'country': user.country,
                'zip_code': user.zip_code,
                'hobbies': list(user.hobbies.values_list('name', flat=True))  # Empty initially
                
            }, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# for saving hobbies 
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

            # Include updated hobby list
            # return JsonResponse({
            #     'message': 'Hobbies saved successfully!',
            #     'hobbies': list(user.hobbies.values_list('name', flat=True))
            # })

            return JsonResponse({'message': 'Hobbies saved successfully!'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# for saving employment status 
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

# for saving profession
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

# for saving position
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

# for saving Industry
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

# User Login
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
                return JsonResponse({'error': 'Invalid email or password'}, status=400)

            # return JsonResponse({'message': 'Login successful', 'user_id': user.id}, status=200)
            # Return user details
            return JsonResponse({
                'message': 'Login successful',
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email
            }, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


# PROJECT RELATED METHODS (RESEARCER SIDE) ####################################################################################################################
#for creating projects 
# ✅
@api_view(['POST'])
def create_project(request, user_id):
    try:
        # Ensure user exists
        user = User.objects.get(id=user_id)

        # extration of data from request 
        data = request.data
        project_name = data.get('name')
        project_description = data.get('description')
        organization = data.get('organization')
        max_participants = data.get('max_participants')  
        start_date = data.get('start_date')              
        end_date = data.get('end_date')                  
        side_notes = data.get('side_notes')             

        # Validate required fields
        if not project_name or not project_description:
            return Response({'error': 'Project name and description are required.'}, status=400)

        # Create project and associate with user
        project = Project.objects.create(
            name=project_name,
            description=project_description,
            organization=organization,
            max_participants=max_participants,
            start_date=start_date,
            end_date=end_date,
            side_notes=side_notes
        )
        user.projects.add(project)

        return Response({'message': 'Project created successfully!', 'project_id': project.id}, status=status.HTTP_201_CREATED)

    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# editing the project info 
# ✅
@csrf_exempt
def update_project(request, project_id):
    if request.method == "PATCH":
        try:
            project = get_object_or_404(Project, id=project_id)
            data = json.loads(request.body.decode('utf-8'))

            # Update only provided fields
            project.name = data.get("name", project.name)
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

# for viewing each project 
def get_project(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        return JsonResponse({
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "organization": project.organization,
            "max_participants": project.max_participants,
            "start_date": project.start_date,
            "end_date": project.end_date,
            "side_notes": project.side_notes,
            "usability_testings": list(project.usability_testings.values("id", "title", "task")),
        })
    except Project.DoesNotExist:
        return JsonResponse({"error": "Project not found"}, status=404)
    
# for deleting the projects 
@csrf_exempt
def delete_project(request, project_id):
    if request.method == "DELETE":
        project = get_object_or_404(Project, id=project_id)
        project.delete()
        return JsonResponse({"message": "Project deleted successfully"}, status=200)
    
    return JsonResponse({"error": "Method not allowed"}, status=405)


# FORM RELATED METHODS (RESEARCER SIDE) ##########################################################
# ✅ creating sus form 
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


# @csrf_exempt
# def create_question(request, form_id):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)

#             # Ensure required fields exist
#             if "question_text" not in data or "question_type" not in data:
#                 return JsonResponse({"error": "Missing question_text or question_type"}, status=400)

#             form = Form.objects.get(id=form_id)
#             question = Question.objects.create(
#                 form=form,
#                 question_text=data["question_text"],
#                 question_type=data["question_type"]
#             )

#             return JsonResponse({
#                 "id": question.id,
#                 "question_text": question.question_text,
#                 "question_type": question.question_type
#             }, status=201)

#         except Form.DoesNotExist:
#             return JsonResponse({"error": "Form not found"}, status=404)
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=400)

#     return JsonResponse({"error": "Invalid request method"}, status=405)


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


# @csrf_exempt
# def get_questions(request, form_id):
#     if request.method == "GET":
#         questions = list(Question.objects.filter(form_id=form_id).values("id", "question_text", "question_type"))
#         return JsonResponse(questions, safe=False, status=200)

#     return JsonResponse({"error": "Invalid request method."}, status=405)

@api_view(['GET'])
def get_questions(request, form_id):
    """Retrieve all questions for a specific form."""
    questions = Question.objects.filter(form_id=form_id)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# @csrf_exempt
# def delete_question(request, form_id, question_id):
#     if request.method == "DELETE":
#         try:
#             question = Question.objects.get(id=question_id, form_id=form_id)
#             question.delete()
#             return JsonResponse({"message": "Question deleted successfully"}, status=204)
#         except Question.DoesNotExist:
#             return JsonResponse({"error": "Question not found"}, status=404)
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=400)

#     return JsonResponse({"error": "Invalid request method"}, status=405)
@api_view(['DELETE'])
def delete_question(request, form_id, question_id):
    """Delete a specific question from a form."""
    question = get_object_or_404(Question, id=question_id, form_id=form_id)
    question.delete()
    return Response({'message': 'Question deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



# @api_view(['POST'])
# def create_answer(request, question_id):
#     """Create a new answer for a specific question."""
#     question = get_object_or_404(Question, id=question_id)

#     # Ensure 'question' is included before saving
#     data = request.data.copy()
#     data['question'] = question.id  

#     serializer = AnswerSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
    
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def create_answer(request, question_id):
#     """Create a new answer for a specific question."""
#     question = get_object_or_404(Question, id=question_id)

#     # Extract user email from request (Frontend should send it)
#     participant_email = request.data.get("participant_email")  
#     if not participant_email:
#         return Response({"error": "User email is required"}, status=status.HTTP_400_BAD_REQUEST)

#     # Fetch user based on email
#     user = User.objects.filter(email=participant_email).first()
#     if not user:
#         return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
#     # Prepare data and save answer
#     data = request.data.copy()
#     data["question"] = question.id
#     data["participant_email"] = user.id

#     serializer = AnswerSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
#for creating usability testings
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


#for retrieving usability testing in project detail page 
@api_view(['GET'])
def get_usability_testing(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        usability_testings = project.usability_testings.all()
    except Project.DoesNotExist:
        return Response({'error': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UsabilityTestingSerializer(usability_testings, many=True)
    return Response({'usability_testings': serializer.data}, status=status.HTTP_200_OK)

    
@api_view(['GET'])
def usability_testing_detail(request, usability_testing_id):
    try:
        usability_testing = UsabilityTesting.objects.get(id=usability_testing_id)
    except UsabilityTesting.DoesNotExist:
        return Response({'error': 'Usability testing not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UsabilityTestingSerializer(usability_testing)
    return Response(serializer.data, status=status.HTTP_200_OK)


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


# @api_view(["POST"])
# def save_recording(request):
#     parser_classes = (MultiPartParser, FormParser)
    
#     usability_testing_id = request.data.get("usability_testing_id")
#     video_file = request.FILES.get("video")
#     user = request.user

#     if UsabilityTestRecordingV4.objects.filter(user=user, usability_testing_id=usability_testing_id).exists():
#         raise ValidationError("You can only upload one recording per usability test.")

#     logger.info(f"Received recording for Usability Test ID: {usability_testing_id}")

#     if not video_file:
#         logger.error("No video file provided.")
#         return Response({"error": "No video file provided"}, status=400)

#     # Save the video file
#     usability_testing = UsabilityTesting.objects.get(id=usability_testing_id)
#     recording = UsabilityTestRecordingV4.objects.create(
#         usability_testing=usability_testing, video=video_file, user=user
#     )

#     logger.info(f"Recording saved successfully with ID: {recording.id}")

#     return Response(UsabilityTestRecordingV4Serializer(recording).data, status=201)


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
    


# @api_view(['POST'])
# def emotion_detection(request):
#     if request.method == 'POST':
#         # Get the base64 image from the frontend
#         image_data = request.data.get('image').split(',')[1]  # Remove the base64 prefix
#         image_bytes = base64.b64decode(image_data)
        
#         # Convert the bytes to an OpenCV image
#         image = Image.open(BytesIO(image_bytes))
#         image = np.array(image)
#         image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)  # Convert to BGR format for OpenCV

#         # Use MediaPipe Face Mesh for detailed facial landmarks
#         mp_face_mesh = mp.solutions.face_mesh
#         face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, min_detection_confidence=0.5)
#         results = face_mesh.process(image)

#         landmarks_data = []
#         bounding_box = None
#         emotion = 'No emotion detected'
#         connections = []  # To store landmark connections for drawing

#         # Predefined indices for specific facial regions (eyes, mouth, etc.)
#         FACE_REGIONS = {
#             'face_boundary': mp_face_mesh.FACEMESH_FACE_OVAL,
#             'left_eye': mp_face_mesh.FACEMESH_LEFT_EYE,
#             'right_eye': mp_face_mesh.FACEMESH_RIGHT_EYE,
#             'left_eyebrow': mp_face_mesh.FACEMESH_LEFT_EYEBROW,
#             'right_eyebrow': mp_face_mesh.FACEMESH_RIGHT_EYEBROW,
#             'mouth': mp_face_mesh.FACEMESH_LIPS,
#             'nose': mp_face_mesh.FACEMESH_NOSE,
#         }

#         if results.multi_face_landmarks:
#             for face_landmarks in results.multi_face_landmarks:
#                 ih, iw, _ = image.shape
#                 min_x = iw
#                 min_y = ih
#                 max_x = 0
#                 max_y = 0

#                 # Process each landmark and calculate bounding box
#                 for lm in face_landmarks.landmark:
#                     x, y = int(lm.x * iw), int(lm.y * ih)
#                     landmarks_data.append({'x': x, 'y': y})
#                     min_x = min(min_x, x)
#                     min_y = min(min_y, y)
#                     max_x = max(max_x, x)
#                     max_y = max(max_y, y)

#                 # Create the bounding box
#                 bounding_box = {'x': min_x, 'y': min_y, 'width': max_x - min_x, 'height': max_y - min_y}

#                 # Add connections for each region
#                 for region, indices in FACE_REGIONS.items():
#                     for start_idx, end_idx in indices:
#                         connections.append({'start': start_idx, 'end': end_idx})

#             # Perform emotion analysis using DeepFace (optional)
#             try:
#                 analysis = DeepFace.analyze(image, actions=['emotion'], enforce_detection=False)
#                 emotion = analysis[0]['dominant_emotion']
#                 emotion_probabilities = analysis[0]['emotion']  # Add probabilities
#             except Exception as e:
#                 emotion = 'Unable to detect emotion'
#                 emotion_probabilities = {}

#         return JsonResponse({'emotion': emotion, 'landmarks': landmarks_data, 'bounding_box': bounding_box, 'connections': connections, 'emotion_probabilities': emotion_probabilities})

#     return JsonResponse({'error': 'Invalid request'}, status=400)

import logging

logger = logging.getLogger(__name__)


@api_view(['POST'])
def emotion_detection(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Invalid request'}, status=400)

    try:
        # Decode the base64 image
        image_data = request.data.get('image').split(',')[1]
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))
        image = np.array(image)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        # Initialize Mediapipe FaceMesh
        mp_face_mesh = mp.solutions.face_mesh
        face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, min_detection_confidence=0.5)
        results = face_mesh.process(image)

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

        return JsonResponse({
            'emotion': dominant_emotion,
            'bounding_box': bounding_box,
            'emotion_probabilities': emotion_probabilities,
        })

    except Exception as e:
        logger.error(f"Emotion detection error: {e}")
        return JsonResponse({'error': str(e)}, status=500)



# PROJECT RELATED MEHTODS (PARTICIPANT SIDE) ##########################################
#get all projects on the homepage for participant 
def get_all_projects(request):
    if request.method == "GET":
        projects = list(Project.objects.values("id", "name", "description", "organization", "start_date", "end_date"))
        return JsonResponse(projects, safe=False)
    return JsonResponse({"error": "Invalid request method."}, status=405)

#get all forms for a specific project to display in the choosetest page for participant 
# def get_project_forms(request, project_id):
#     if request.method == "GET":
#         try:
#             project = Project.objects.get(id=project_id)
#             forms = list(project.forms.values("id", "title"))  # Get forms related to this project
#             return JsonResponse(forms, safe=False)
#         except Project.DoesNotExist:
#             return JsonResponse({"error": "Project not found."}, status=404)
#     return JsonResponse({"error": "Invalid request method."}, status=405)

@api_view(['GET'])
def get_project_forms(request, project_id):
    try:
        project = Project.objects.get(id=project_id)  
        forms = project.forms.filter(is_shared=True)  # ✅ Correct way to filter ManyToManyField
        serializer = FormSerializer(forms, many=True)  
        return Response(serializer.data, status=200)  
    except Project.DoesNotExist:
        return Response({"error": "Project not found."}, status=404)


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


#for retrieving all forms for participant to display in the homepage
def get_all_forms(request):
    if request.method == "GET":
        forms = list(Form.objects.values("id", "title"))
        return JsonResponse(forms, safe=False)
    return JsonResponse({"error": "Invalid request method."}, status=405)





# Get user by ID to display in MyAccount page
@csrf_exempt
def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user_data = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "birthday": user.birthday,
            "gender": user.gender,
            "marital_status": user.marital_status,
            "country": user.country,
            "zip_code": user.zip_code,
            "hobbies": list(user.hobbies.values("id", "name")), 
            "employmentStatuses" : list(user.employmentStatuses.values("id", "employmentStatuses")),
            "profession" : list(user.profession.values("id", "profession")),
            "position" : list(user.position.values("id", "position")),
            "industry" : list(user.industry.values("id", "industry")),

            "projects": list(user.projects.values(
                "id", "name", "description", "organization", 
                "max_participants", "start_date", "end_date", "side_notes"
            )),
        }
        return JsonResponse(user_data, status=200)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)


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


