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
from .views import signup

#for log in 
from .views import login


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.index, name='index'),
    path('api/signup/', signup, name='signup'),
    path('api/login/', login, name='login'),
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
]
