from django.db import models
from users.models import User
from task.models import Projects
from django.conf import settings


class Label(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='projects')
    project = models.ForeignKey(Projects,on_delete=models.CASCADE,default=1)
    label_color = models.TextField(max_length=10)
    label_name = models.TextField()



