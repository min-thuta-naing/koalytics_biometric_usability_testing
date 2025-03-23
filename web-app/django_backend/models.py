from django.db import models
from django.contrib.auth.hashers import make_password

# for sign up 
class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    birthday = models.DateField()
    gender = models.CharField(max_length=20, choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other'), ('nosay', 'Prefer not to say')])
    marital_status = models.CharField(max_length=20, choices=[('single', 'Single'), ('married', 'Married'), ('divorced', 'Divorced')])
    country = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Store hashed password

    # Many-to-Many relationship with Hobby table
    hobbies = models.ManyToManyField('Hobby', related_name="users", blank=True)

    # Many-to-Many relationship with employment status table
    employmentStatuses = models.ManyToManyField('EmploymentStatus', related_name="users", blank=True)

    # Many-to-Many relationship with profession table
    profession = models.ManyToManyField('Profession', related_name="users", blank=True)

    # One-to-Many relationship with position table
    position = models.ManyToManyField('Position', related_name="users", blank=True)

    # One-to-Many relationship with industry table
    industry = models.ManyToManyField('Industry', related_name="users", blank=True)

    #Many-to-Many relationship with Project table 
    projects = models.ManyToManyField('Project', related_name="users", blank=True)

    def __str__(self):
        return self.email

# for hobbies
class Hobby(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

# for employement status 
class EmploymentStatus (models.Model):
    employmentStatuses = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.employmentStatuses

# for profession
class Profession (models.Model):
    profession = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.profession
    
# for position
class Position (models.Model):
    position = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.position
    
# for industry
class Industry (models.Model):
    industry = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.industry
    
    
# for projects 
class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    organization = models.CharField(max_length=255, blank=True, null=True)
    max_participants = models.IntegerField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    side_notes = models.TextField(blank=True, null=True)

    gender = models.ManyToManyField('Gender', related_name="projects", blank=True )
    age_group = models.ManyToManyField('AgeGroup', related_name="projects", blank=True )
    interest = models.ManyToManyField('Interest', related_name="projects", blank=True )

    #Many to many relationship with Form table 
    forms = models.ManyToManyField('Form', related_name="projects", blank=True)

    usability_testings = models.ManyToManyField('UsabilityTesting', related_name="projects", blank=True)

    def __str__(self):
        return self.name
    
# for genders
class Gender(models.Model):
    gender = models.CharField(max_length=200)

    def __str__(self):
        return self.gender
    
# for age groups
class AgeGroup(models.Model):
    age_group = models.CharField(max_length=200)

    def __str__(self):
        return self.age_group

# for interest
class Interest(models.Model):
    interest = models.CharField(max_length=200)

    def __str__(self):
        return self.interest

# for forms
class Form(models.Model): 
    title = models.CharField(max_length=200)
    is_shared = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
class Consent(models.Model):
    form = models.OneToOneField(Form, on_delete=models.CASCADE)  # one consent per one form
    consent_text = models.TextField()

class Question(models.Model):
    TEXT = 'text'
    MULTIPLE_CHOICE = 'mcq'
    RATING = 'rating'
    
    QUESTION_TYPES = [
        (TEXT, 'Text'),
        (MULTIPLE_CHOICE, 'Multiple Choice'),
        (RATING, 'Rating')
    ]

    form = models.ForeignKey(Form, on_delete=models.CASCADE)
    question_text = models.TextField()
    question_type = models.CharField(max_length=10, choices=QUESTION_TYPES)
    #created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    participant_email = models.ForeignKey(User, on_delete=models.CASCADE)
    answer_text = models.TextField()
    # submitted_at = models.DateTimeField(auto_now_add=True, blank=True)

class UsabilityTesting(models.Model):
    title = models.CharField(max_length=200)
    task = models.CharField(max_length=500) 
    duration = models.IntegerField(blank=True, null=True) 
    website_link = models.URLField(max_length=500, blank=True, null=True)  # URL field for the website link
    figma_embed_code = models.TextField(blank=True, null=True)  # Field to store the Figma embed code

    

class UsabilityTestRecordingV4(models.Model):
    usability_testing = models.ForeignKey(UsabilityTesting, on_delete=models.CASCADE)
    video = models.FileField(upload_to='recordings/')
    #created_at = models.DateTimeField(auto_now_add=True)
    participant_email = models.ForeignKey(User, on_delete=models.CASCADE )




# class UsabilityTestRecording(models.Model):
#     # usability_testing_id = models.IntegerField()  # ForeignKey can be used if usability testing is a model
#     usability_testing = models.OneToOneField(
#         UsabilityTesting, 
#         on_delete=models.CASCADE,  # Delete recording if usability test is deleted
#         related_name="recording"   # Allows accessing recording from usability test instance
#     )
#     video = models.FileField(upload_to='recordings/')
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Recording for Test {self.usability_testing_id}"