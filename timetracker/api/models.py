from django.db import models
from django.contrib.auth.models import User

# Defines the event model. 
class Event(models.Model):
    text = models.CharField(max_length=100)    
    start = models.CharField(max_length=100)
    end = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Event')
    def __str__(self):
        return self.title