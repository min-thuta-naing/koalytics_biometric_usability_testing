"""
URL configuration for django_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import path, re_path
from django.views.generic import TemplateView
from . import views 

# for sign up
from .views import signup, save_hobbies, save_employment_status, save_profession

#for log in 
from .views import login

from .views import get_user

# for admin dashboard table 
from .views import get_all_users

from .views import create_project
from .views import update_project

from .views import get_project
from .views import delete_project
from .views import delete_user

from .views import get_forms, create_form, update_form, delete_form




urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index, name='index'),
    path('api/signup/', signup, name='signup'),
    path('api/save-hobbies/<int:user_id>/', save_hobbies, name='save-hobbies'),
    path('api/save_employment_status/<int:user_id>/', save_employment_status, name='save-employment-status'),
    path('api/save_profession/<int:user_id>/', save_profession, name='save-profession'),
    
    path('create_project/<int:user_id>/', create_project, name='create_project'),  # ✅ Add new route
    path("api/update_project/<int:project_id>/", update_project, name="update_project"),
    path('api/project/<int:project_id>/', get_project, name='get_project'),
    path("api/delete_project/<int:project_id>/", delete_project, name="delete_project"),

    path('api/project/<int:project_id>/forms/', get_forms, name='get_forms'),
    path('api/project/<int:project_id>/create_form/', create_form, name='create_form'),
    path('api/update_form/<int:form_id>/', update_form, name='update_form'),
    path('api/delete_form/<int:form_id>/', delete_form, name='delete_form'),

    path('api/login/', login, name='login'),
    path('api/user/<int:user_id>/', get_user, name='get_user'),
    path('api/admin/users/', get_all_users, name='get_all_users'),
    path('api/delete_user/<int:user_id>/', delete_user, name='delete_user'),

    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
]


