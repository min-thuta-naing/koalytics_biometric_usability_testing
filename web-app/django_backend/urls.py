from django.contrib import admin
from django.urls import path
from django.urls import path, re_path
from django.views.generic import TemplateView
from . import views 

# for sign up
from .views import signup, save_hobbies, save_employment_status, save_profession, save_position, save_industry

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

from .views import form_detail
from .views import get_forms
from .views import create_form, update_form, delete_form

from .views import create_usability_testing, get_usability_testing, usability_testing_detail

from .views import get_all_projects, get_all_forms, get_project_forms, get_project_usabilitytesting, delete_usability_testing

from .views import save_recording


from .views import create_question, get_questions, delete_question

from .views import save_critieria_age_group, save_critieria_gender, save_critieria_interest

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    

    path("admin/", admin.site.urls),
    path("", views.index, name='index'),
    path('api/signup/', signup, name='signup'),

    path('api/save-hobbies/<int:user_id>/', save_hobbies, name='save-hobbies'),
    path('api/save_employment_status/<int:user_id>/', save_employment_status, name='save-employment-status'),
    path('api/save_profession/<int:user_id>/', save_profession, name='save-profession'),
    path('api/save_position/<int:user_id>/', save_position, name='save_position'),
    path('api/save_industry/<int:user_id>/', save_industry, name='save_industry'), 
    
    path('create_project/<int:user_id>/', create_project, name='create_project'),  # ✅ Add new route
    path("api/update_project/<int:project_id>/", update_project, name="update_project"),
    path('api/project/<int:project_id>/', get_project, name='get_project'),
    path("api/delete_project/<int:project_id>/", delete_project, name="delete_project"),

    path('api/save_criteria_gender/<int:project_id>/', save_critieria_gender, name='save-criteria-gender'),
    path('api/save_criteria_age_group/<int:project_id>/', save_critieria_age_group, name='save-criteria-age-group'),
    path('api/save_criteria_interest/<int:project_id>/', save_critieria_interest, name='save-criteria-interest'),

    path('api/project/<int:project_id>/create_form/', create_form, name='create_form'),
    path('api/project/<int:project_id>/forms/', get_forms, name='get_forms'),
    path('api/forms/<int:form_id>/', form_detail, name='form_detail'),
    path('api/update_form/<int:form_id>/', update_form, name='update_form'),
    path('api/delete_form/<int:form_id>/', delete_form, name='delete_form'),

    path('api/project/<int:project_id>/create_usability_testing/', create_usability_testing, name='create_usability_testing'),
    path('api/project/<int:project_id>/get_usability_testing/', get_usability_testing, name='get_usability_testing'),
    path('api/usability_testing/<int:usability_testing_id>/', usability_testing_detail, name='usability_testing_details'),
    path('api/delete_usability_testing/<int:usability_testing_id>/', delete_usability_testing, name='delete_usability_testing'),
    path("api/save-recording/", save_recording, name="save-recording"),


    path('api/forms/<int:form_id>/questions/', create_question, name="create_question"),
    path('api/forms/<int:form_id>/questions/list/', get_questions, name="get_questions"),
    path("api/forms/<int:form_id>/questions/<int:question_id>/", delete_question, name="delete_question"),

    path("api/projects/", get_all_projects, name="get_all_project"), 
    path("api/projects/<int:project_id>/related_forms/", get_project_forms, name="get_project_forms"),
    path("api/projects/<int:project_id>/related_usability_testing/", get_project_usabilitytesting, name="get_project_usabilitytesting"),
    path("api/forms/", get_all_forms, name="get_all_forms"),

    path('api/login/', login, name='login'),
    path('api/user/<int:user_id>/', get_user, name='get_user'),
    path('api/admin/users/', get_all_users, name='get_all_users'),
    path('api/delete_user/<int:user_id>/', delete_user, name='delete_user'),

    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
