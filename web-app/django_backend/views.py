from django.shortcuts import render 


# import for sign up & log in 
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,  check_password
from .models import User, Hobby, Project, Form, EmploymentStatus
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


# for creating forms 
@csrf_exempt
def create_form(request, project_id):
    if request.method == 'POST':
        try:
            project = Project.objects.get(id=project_id)
            data = json.loads(request.body.decode('utf-8'))
            form = Form.objects.create(project=project, title=data['title'])
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
