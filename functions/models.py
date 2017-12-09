# -*- coding: UTF-8 -*-
from django.db import models
from hire.models import Position
from django.conf import settings
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from hire.models import Company, Position

User = settings.AUTH_USER_MODEL
# Create your models here.
# for config data types

class Collection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    created_at = models.DateTimeField(blank=False, default=timezone.now)
    last_update = models.DateTimeField(blank=True, default=timezone.now)

    class Meta:
        verbose_name = _('collection')
        verbose_name_plural = _('collections')

    def __str__(self):
        return self.id


class Application(models.Model):
    STATUS_SUCCESS = 1
    STATUS_VIEWED = 2
    STATUS_RECEPTED = 3
    STATUS_NOTAPPLICABLE = 4
    STATUS = [(STATUS_SUCCESS,u"投递成功"),(STATUS_VIEWED,u"已查看"),(STATUS_RECEPTED,u"邀请面试"),(STATUS_NOTAPPLICABLE,u"不合适")]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS, blank=False)
    created_at = models.DateTimeField(blank=False, default=timezone.now)
    last_update = models.DateTimeField(blank=False, default=timezone.now)

    class Meta:
        verbose_name = _('application')
        verbose_name_plural = _('applications')


class Invitation(models.Model):

    STATUS_UNDECIDED = 1
    STATUS_GO = 2
    STATUS_NOTGO = 3
    STATUS = [(STATUS_UNDECIDED, u"未确认"), (STATUS_GO, u"已接受"), (STATUS_NOTGO, u"已放弃")]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    status = models.IntegerField(choices=STATUS, blank=False)
    created_at = models.DateTimeField(blank=False, default=timezone.now)
    interview_time = models.DateTimeField(blank=False)
    interview_address = models.CharField(max_length=200,blank=False)
    content = models.TextField(blank=False)

    class Meta:
        verbose_name = _('invitation')
        verbose_name_plural = _('invitations')


class Subscription(models.Model):
    # TODO
    postion = models.IntegerField(choices=Position.CATEGORY)
    industry = models.ForeignKey(choices=Company.INDUSTRY)
    salary = models.IntegerField(choices=Position.SALARY_LEVEL,)


    class Meta:
        verbose_name = _('subscription')
        verbose_name_plural = _('subscriptions')


class Laud(models.Model):
    position = models.IntegerField(choices=Position.CATEGORY)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(blank=False, default=timezone.now)
    title = models.CharField(max_length=50, blank=False)
    content = models.TextField(blank=False)
    is_read = models.BooleanField(default=False)


class PositionConstrain(models.Model):
    # TODO
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    constrain = models.IntegerField()