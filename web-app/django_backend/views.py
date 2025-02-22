from django.shortcuts import render 


# import for sign up & log in 
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,  check_password
from .models import User

def index(request):
    return render (request, 'index.html')

# for sign up 
@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))

            User.objects.create(
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
            return JsonResponse({'message': 'User registered successfully!'}, status=201)
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

            return JsonResponse({'message': 'Login successful', 'user_id': user.id}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)