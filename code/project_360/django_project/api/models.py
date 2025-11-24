# api/models.py

from django.db import models
import os
from django.conf import settings
from task.models import Projects


def get_saved_data_count():
    return SavedData.objects.count()

def change_image_name(instance,filename):
    ext = filename.split('.')[-1]
    co = get_saved_data_count()+1
    filename = f"{instance.user.username}_{instance.project_no.project_no}_{co}.{ext}"
    print("ll")
    return os.path.join('./images/', filename)





class SavedData(models.Model):
    '''saving form data'''
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    data = models.TextField()
    project_no = models.ForeignKey(Projects,on_delete=models.CASCADE,default=1)
    image = models.ImageField(upload_to=change_image_name)
    no_of_frames = models.IntegerField(null=True, blank=True)     # column cuts

    class Meta:
        app_label = 'api'
