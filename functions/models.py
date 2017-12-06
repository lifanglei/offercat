from django.db import models
from hire.models import Position
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL
# Create your models here.
class Collection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        pass
