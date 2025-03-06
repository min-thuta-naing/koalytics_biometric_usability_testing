from django.shortcuts import render 


# import for sign up & log in 
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,  check_password
from .models import User, Hobby, Project, Form, EmploymentStatus, Profession, Position, Industry, Gender, AgeGroup, Interest, Question
from .serializers import UserSerializer, ProjectSerializer
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_protect

def index(request):
    return render (request, 'index.html')

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
                user.position.add(industry)

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


#for creating projects 
@csrf_exempt
def create_project(request, user_id):
    if request.method == 'POST':
        try:
            # Ensure user exists
            user = User.objects.get(id=user_id)

            # Parse request body
            data = json.loads(request.body.decode('utf-8'))
            project_name = data.get('name')
            project_description = data.get('description')
            organization = data.get('organization')
            max_participants = data.get('max_participants')  
            start_date = data.get('start_date')              
            end_date = data.get('end_date')                  
            side_notes = data.get('side_notes')             

            # Validate required fields
            if not project_name or not project_description:
                return JsonResponse({'error': 'Project name and description are required.'}, status=400)

            # Create project and associate with user
            # project = Project.objects.create(name=project_name, description=project_description)
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

            return JsonResponse({'message': 'Project created successfully!', 'project_id': project.id}, status=201)

        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

# editing the project info 
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


# # for creating forms 
# @csrf_exempt
# def create_form(request, project_id):
#     if request.method == 'POST':
#         try:
#             project = Project.objects.get(id=project_id)
#             data = json.loads(request.body.decode('utf-8'))
#             form = Form.objects.create(project=project, title=data['title'])
#             return JsonResponse({'message': 'Form created successfully!', 'form_id': form.id}, status=201)
#         except Project.DoesNotExist:
#             return JsonResponse({'error': 'Project not found.'}, status=404)
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
#     return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def create_form(request, project_id):
    if request.method == 'POST':
        try:
            project = Project.objects.get(id=project_id)
            data = json.loads(request.body.decode('utf-8'))
            
            # Create the form independently
            form = Form.objects.create(title=data['title'])
            
            # Add the form to the project's many-to-many field
            project.forms.add(form)

            return JsonResponse({'message': 'Form created successfully!', 'form_id': form.id}, status=201)
        
        except Project.DoesNotExist:
            return JsonResponse({'error': 'Project not found.'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
    
    return JsonResponse({'error': 'Invalid request method.'}, status=405)



#for retrieving forms 
def get_forms(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        forms = list(project.forms.values('id', 'title'))
        return JsonResponse({'forms': forms}, status=200)
    except Project.DoesNotExist:
        return JsonResponse({'error': 'Project not found.'}, status=404)
    
def form_detail(request, form_id):
    form = get_object_or_404(Form, id=form_id)
    return JsonResponse({"id": form.id, "title": form.title})
    

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

    

# for deleting form 
@csrf_exempt
def delete_form(request, form_id):
    if request.method == 'DELETE':
        form = get_object_or_404(Form, id=form_id)
        form.delete()
        return JsonResponse({'message': 'Form deleted successfully'}, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def create_question(request, form_id):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Ensure required fields exist
            if "question_text" not in data or "question_type" not in data:
                return JsonResponse({"error": "Missing question_text or question_type"}, status=400)

            form = Form.objects.get(id=form_id)
            question = Question.objects.create(
                form=form,
                question_text=data["question_text"],
                question_type=data["question_type"]
            )

            return JsonResponse({
                "id": question.id,
                "question_text": question.question_text,
                "question_type": question.question_type
            }, status=201)

        except Form.DoesNotExist:
            return JsonResponse({"error": "Form not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def get_questions(request, form_id):
    if request.method == "GET":
        questions = list(Question.objects.filter(form_id=form_id).values("id", "question_text", "question_type"))
        return JsonResponse(questions, safe=False, status=200)

    return JsonResponse({"error": "Invalid request method."}, status=405)


@csrf_exempt
def delete_question(request, form_id, question_id):
    if request.method == "DELETE":
        try:
            question = Question.objects.get(id=question_id, form_id=form_id)
            question.delete()
            return JsonResponse({"message": "Question deleted successfully"}, status=204)
        except Question.DoesNotExist:
            return JsonResponse({"error": "Question not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)



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

