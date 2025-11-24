from django.db import models

# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
import random

def generate_random_number():
    return random.randint(100000, 999999)


class User(AbstractUser):
    # Add any additional fields you need
    # profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    username = models.TextField(unique=True)
    password = models.TextField()
    salt = models.PositiveIntegerField(default=generate_random_number)
    



