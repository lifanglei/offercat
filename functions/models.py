# -*- coding: UTF-8 -*-
from django.db import models
from hire.models import Position
from django.contrib.postgres.fields import ArrayField
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
    STATUS = [(STATUS_SUCCESS, u"投递成功"), (STATUS_VIEWED, u"已查看"), (STATUS_RECEPTED, u"邀请面试"),
              (STATUS_NOTAPPLICABLE, u"不合适")]

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
    interview_address = models.CharField(max_length=200, blank=False)
    content = models.TextField(blank=False)

    class Meta:
        verbose_name = _('invitation')
        verbose_name_plural = _('invitations')


class Subscription(models.Model):
    # TODO
    INDUSTRY_BANK = 1
    INDUSTRY_SECURITIES = 2
    INDUSTRY_FUND = 3
    INDUSTRY_PRIVATE_EQUITY = 4
    INDUSTRY_RISkK_INVESTMENT = 5
    INDUSTRY_FINANCIAL_TECHNOLOGY = 6
    INDUSTRY_INTERNET_FINANCE = 7
    INDUSTRY_INSURANCE = 8
    INDUSTRY_TRUST = 9
    INDUSTRY_FINANCIAL_LEASING = 10
    INDUSTRY_FUTURES = 11
    INDUSTRY_OTHER = 12
    INDUSTRY_ALL = 13
    INDUSTRY = ((INDUSTRY_BANK, u"银行"),
                (INDUSTRY_SECURITIES, u"证券"),
                (INDUSTRY_FUND, u"基金"),
                (INDUSTRY_PRIVATE_EQUITY, u"私募股权"),
                (INDUSTRY_RISkK_INVESTMENT, u"风险投资"),
                (INDUSTRY_FINANCIAL_TECHNOLOGY, u"金融科技"),
                (INDUSTRY_INTERNET_FINANCE, u"互联网金融"),
                (INDUSTRY_INSURANCE, u"保险"),
                (INDUSTRY_TRUST, u"信托"),
                (INDUSTRY_FINANCIAL_LEASING, u"金融租赁"),
                (INDUSTRY_FUTURES, u"期货"),
                (INDUSTRY_OTHER, u"其他"),
                (INDUSTRY_ALL, u"全部"))

    category = ArrayField(base_field=models.IntegerField(choices=Position.CATEGORY,blank=True),default={},size=3)
    industry = ArrayField(base_field=models.IntegerField(choices=INDUSTRY,blank=True,default=INDUSTRY_ALL),default={}, size=3)
    salary = ArrayField(base_field=models.IntegerField(choices=Position.SALARY_LEVEL,blank=True),default={},size=3)
    created_at = models.DateTimeField(blank=False, default=timezone.now)
    last_update = models.DateTimeField(blank=False, default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

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



