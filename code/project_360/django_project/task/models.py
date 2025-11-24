from django.db import models
from users.models import User

class Projects(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    project_no = models.TextField()
    project_name = models.TextField()
