# api/serializers.py
from PIL import Image
import requests
from io import BytesIO
import os



from rest_framework import serializers
from .models import SavedData

class SavedDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedData
        fields = ['data', 'image']
