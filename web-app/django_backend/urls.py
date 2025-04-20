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
from .views import get_form
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
    
    # project related 
    path('create_project/<int:user_id>/', create_project, name='create_project'), 
    path('api/projects/<int:project_id>/publish/', views.publish_project, name="publish_project"), # publishing the project on ProjectDashboard.jsx
    path("api/update_project/<int:project_id>/", update_project, name="update_project"),
    path('api/project/<int:project_id>/', get_project, name='get_project'),
    path("api/delete_project/<int:project_id>/", delete_project, name="delete_project"),

    path('api/project/<int:project_id>/save-criteria/', views.create_or_update_criteria, name='create_or_update_criteria'),
    path('api/project/<int:project_id>/get-criteria/', views.get_project_criteria, name='get_project_criteria'),



    path('api/save_criteria_gender/<int:project_id>/', save_critieria_gender, name='save-criteria-gender'),
    path('api/save_criteria_age_group/<int:project_id>/', save_critieria_age_group, name='save-criteria-age-group'),
    path('api/save_criteria_interest/<int:project_id>/', save_critieria_interest, name='save-criteria-interest'),

    # sus form related 
    path('api/projects/<int:project_id>/create-susform/', views.create_susform, name="create_susform"),
    path('api/projects/<int:project_id>/get-susforms/', views.get_susform, name='get_susforms'),
    path('api/forms/delete-susforms/<int:susform_id>/', views.delete_susform, name='delete_susform'),
    path('api/<int:susform_id>/form-details/', views.susform_detail, name='susform_detail'),

    # sus questins related 
    path('api/<int:form_id>/sus-questions/', views.create_or_update_sus_questions, name='create_or_update_sus_questions'),
    path('api/<int:form_id>/sus-questions/list/', views.get_sus_questions, name="get_sus_questions"),


    # sus answers related 
    path('api/questions/<int:question_id>/answers/', views.create_or_update_susanswer, name='create-answer'),
    path('api/<int:form_id>/sus-answers/results/', views.get_sus_answers_results, name="get_sus_answers_results"),


    path('projects/<int:project_id>/form/', views.create_form, name='create_form'),
    path('forms/<int:form_id>/share/', views.ShareFormView, name='share-form-view'),
    path('projects/<int:project_id>/forms/', views.get_form, name='get_forms'),
    path('forms/<int:form_id>/', views.form_detail, name='form_detail'),
    path('forms/update/<int:form_id>/', views.update_form, name='update_form'),
    path('forms/delete/<int:form_id>/', views.delete_form, name='delete_form'),


    # ✅ usability testing 
    path('projects/<int:project_id>/usability-testing/', views.create_usability_testing, name='create_usability_testing'), # usability testing creation form CreateUsabilityTesting.jsx
    path('projects/<int:project_id>/usability-testings/', views.get_usability_testing, name='get_usability_testing'), # get all usability testings list on ProjectDashboard.jsx
    path('usability-testing/<int:usability_testing_id>/', views.usability_testing_detail, name='usability_testing_detail'), # usability testing detail on UsabilityTestingDetail.jsx
    path('usability-testing/delete/<int:usability_testing_id>/', views.delete_usability_testing, name='delete_usability_testing'), # delete usability testing on ProjectDashboard.jsx
    path("api/save-recording/check/<int:usability_testing_id>/", views.check_recording, name="check-recording"), # ❌
    path("api/save-recording/", views.save_recording, name="save-recording"), # start and save recording on TestCalibration.jsx
    path('emotion-detection/', views.emotion_detection, name='emotion_detection'), # emotion detection from BrowserinBrowser.jsx
    path('api/usability-testing/<int:usability_testing_id>/emotion-data/', views.emotion_data_list, name='emotion-data-list'), # emotion data list from DetailedEmotion.jsx and TestingResults.jsx
    path('usability-testing/<int:usability_testing_id>/recordings/', views.get_recordings_for_usability_testing, name='get_recordings_for_usability_testing'), # usability testing recording on TestingResults.jsx
    path('video/<str:video_name>/', lambda request, video_name: print(f"Video requested: {video_name}") or views.video_view(request, video_name), name='video-view'), # usability testing recording on TestingResults.jsx

    path('usability-testing/<int:usability_testing_id>/create-or-update-testingconsent/', views.create_or_update_testingconsent, name="create_or_update_testingconsent"),
    path('usability-testing/<int:usability_testing_id>/testingconsent/', views.get_testingconsent, name="get_testingconsent"),

    path('forms/<int:form_id>/questions/', views.create_question, name="create_question"),
    path('forms/<int:form_id>/questions/list/', views.get_questions, name="get_questions"),
    path("forms/<int:form_id>/questions/<int:question_id>/", views.delete_question, name="delete_question"),

    path('forms/<int:form_id>/create-or-update-consent/', views.create_or_update_consent, name="create_or_update_consent"),
    path('forms/<int:form_id>/consent/', views.get_consent, name="get_consent"),
    path("forms/<int:form_id>/consent/<int:consent_id>/", views.delete_consent, name="delete_consent"),


    path('questions/<int:question_id>/answers/', views.create_answer, name='create-answer'),
    path('forms/<int:form_id>/answers/', views.get_form_answers, name='get-form-answers'),

    # participant side 
    path("api/all-published-projects/", get_all_projects, name="get_all_project"), 
    path('api/projects/<int:project_id>/details/', views.get_project_details),
    path("api/projects/<int:project_id>/related_forms/", get_project_forms, name="get_project_forms"),
    path("api/projects/<int:project_id>/related_usability_testing/", get_project_usabilitytesting, name="get_project_usabilitytesting"),
    path("api/forms/", get_all_forms, name="get_all_forms"),

    path('api/login/', login, name='login'),
    path('api/user/<int:user_id>/', get_user, name='get_user'),
    path('api/admin/users/', get_all_users, name='get_all_users'),
    path('api/delete_user/<int:user_id>/', delete_user, name='delete_user'),

   

    
    # + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),


    #re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
] 


# # Ensure the static media path is served before the catch-all route
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),

# Static files URL handling
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Catch-all route should be placed at the end of urlpatterns
urlpatterns += [
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
]
