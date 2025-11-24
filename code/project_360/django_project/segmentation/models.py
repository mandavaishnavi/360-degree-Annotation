from django.db import models
from api.models import SavedData
from label.models import Label

class SegAnnotations(models.Model):
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='projects')
    image = models.ForeignKey(SavedData, on_delete=models.CASCADE, default=1)
    frame_no = models.SmallIntegerField()
    coordinates = models.TextField()
    label_id = models.ForeignKey(Label, on_delete=models.CASCADE, default=1)