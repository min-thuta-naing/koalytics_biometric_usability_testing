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

    #Many-to-Many relationship with Project table 
    projects = models.ManyToManyField('Project', related_name="users", blank=True)

    def __str__(self):
        return self.email

# for hobbies
class Hobby(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
# for projects 
class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name