# -*- coding: UTF-8 -*-
from django.db import models
from hire.models import Position
from django.conf import settings
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

User = settings.AUTH_USER_MODEL
# Create your models here.
class Collection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    created_at = models.DateTimeField(blank=False, default=timezone.now)
    last_update = models.DateTimeField(blank=False, default=timezone.now)

    class Meta:
        verbose_name = _('collection')
        verbose_name_plural = _('collections')


class Application(models.Model):
    STATUS_SUCCESS = 1
    STATUS_VIEWED = 2
    STATUS_RECEPTED = 3
    STATUS_NOTAPPLICABLE = 4
    STATUS = []
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    status = models.IntegerField(choices=EDUCATION_DEGREE, blank=True)
    created_at = models.DateTimeField(blank=False, default=timezone.now)
    last_update = models.DateTimeField(blank=False, default=timezone.now)

    class Meta:
        verbose_name = _('application')
        verbose_name_plural = _('applications')