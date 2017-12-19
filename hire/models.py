# -*- coding: UTF-8 -*-
import os
import uuid
from django.db import models
from django.dispatch import receiver
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from profiles.utils import user_directory_path
from django.contrib.postgres import fields
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.


class Company(models.Model):

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
    INDUSTRY = ((INDUSTRY_BANK,u"银行"),
                (INDUSTRY_SECURITIES,u"证券"),
                (INDUSTRY_FUND,u"基金"),
                (INDUSTRY_PRIVATE_EQUITY,u"私募股权"),
                (INDUSTRY_RISkK_INVESTMENT,u"风险投资"),
                (INDUSTRY_FINANCIAL_TECHNOLOGY,u"金融科技"),
                (INDUSTRY_INTERNET_FINANCE,u"互联网金融"),
                (INDUSTRY_INSURANCE,u"保险"),
                (INDUSTRY_TRUST,u"信托"),
                (INDUSTRY_FINANCIAL_LEASING,u"金融租赁"),
                (INDUSTRY_FUTURES,u"期货"),
                (INDUSTRY_OTHER,u"其他"))

    SIZE_SMALL = 1
    SIZE_MEDIUM = 2
    SIZE_LARGE = 3
    SIZE = [(SIZE_SMALL, u"小于100人"), (SIZE_MEDIUM, u"100至1000人"), (SIZE_LARGE, u"1000人以上")]

    STOCK_SH = 1
    STOCK_SZ = 2
    STOCK_HK = 3
    STOCK_NASDAQ = 4
    STOCK_NY = 5
    STOCK_OTHER = 6
    STOCK_NONE = 7
    STOCK = [(STOCK_SH, u"上交所"), (STOCK_SZ, u"深交所"), (STOCK_HK, u"港交所"), (STOCK_NASDAQ, u"纳斯达克"), (STOCK_NY, u"纽交所"), (STOCK_OTHER, u"其他上市地点"), (STOCK_NONE, u"未上市")]

    name = models.CharField(max_length=100, blank=True)
    web_site = models.URLField(blank=True)
    industry = models.IntegerField(choices=INDUSTRY, blank=True)
    size = models.IntegerField(choices=SIZE, blank=True)
    stock = models.IntegerField(choices=STOCK, blank=True)
    shareholders = fields.ArrayField(blank=True,default= list, base_field= models.CharField(max_length=30), size=5)
    introduction = models.TextField(max_length=100, blank=True )
    description = models.TextField(blank=True)
    headquarters = models.CharField(max_length= 10,blank=True)
    photo = models.ImageField(upload_to=user_directory_path , blank=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True,)
    abbreviation = models.CharField(max_length= 10, blank=True)

    class Meta:
        verbose_name = _('company')
        verbose_name_plural = _('companies')

    def __str__(self):
        return self.name


class Position(models.Model):
    SALARY_LEVEL1 = 1
    SALARY_LEVEL2 = 2
    SALARY_LEVEL3 = 3
    SALARY_LEVEL4 = 4
    SALARY_LEVEL5 = 5
    SALARY_LEVEL6 = 6

    SALARY_LEVEL = [(SALARY_LEVEL1, u'5k以下'),
                    (SALARY_LEVEL2, '5k-10k'),
                    (SALARY_LEVEL3, '10k-15k'),
                    (SALARY_LEVEL4, '15k-25k'),
                    (SALARY_LEVEL5, '25k-50k'),
                    (SALARY_LEVEL6, u'50k以上')]

    CATEGORY_MARKET = 1
    CATEGORY_INVESTMENT = 2
    CATEGORY_PRODUCTION = 3
    CATEGORY_RISK = 4
    CATEGORY_OPERATING = 5
    CATEGORY_TECHNOLOGY = 6
    CATEGORY_FUNCTION = 7
    CATEGORY = [(CATEGORY_MARKET, u"市场与销售"),
                         (CATEGORY_INVESTMENT, u"投研"),
                         (CATEGORY_PRODUCTION, u"产品"),
                         (CATEGORY_RISK, u"风控"),
                         (CATEGORY_OPERATING, u"运营"),
                         (CATEGORY_TECHNOLOGY, u"技术"),
                         (CATEGORY_FUNCTION, u"职能")]

    TYPE_SOCIAL = 1
    TYPE_GRADUATION = 2
    TYPE_INTERN = 3
    TYPE = [(TYPE_SOCIAL, u'社会招聘'),
            (TYPE_GRADUATION, u'校园招聘'),
            (TYPE_INTERN, u'实习'), ]

    WORK_EXP_LEVEL1 = 1
    WORK_EXP_LEVEL2 = 2
    WORK_EXP_LEVEL3 = 3
    WORK_EXP_LEVEL4 = 4
    WORK_EXP_LEVEL5 = 5
    WORK_EXP_LEVEL6 = 6
    WORK_EXP_REQ = [(WORK_EXP_LEVEL1, u'学生'),
                     (WORK_EXP_LEVEL2, u'1年'),
                     (WORK_EXP_LEVEL3, u'1-3年'),
                     (WORK_EXP_LEVEL4, u'3-5年'),
                     (WORK_EXP_LEVEL5, u'5-10年'),
                     (WORK_EXP_LEVEL6, u'10年以上')]

    EDU_BACHELOR = 1
    EDU_MASTER = 2
    EDU_PHD = 3
    EDU_MBA = 4
    EDUCATION_DEGREE = [(EDU_BACHELOR, u'本科'),
                        (EDU_MASTER, u'硕士'),
                        (EDU_PHD, u'博士'),
                        (EDU_MBA, 'MBA')]

    name = models.CharField(max_length=100, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE,)
    department = models.CharField(max_length=100, blank=True)
    salary = models.IntegerField(choices=SALARY_LEVEL, blank=False)
    category = models.IntegerField(choices=CATEGORY, blank=False)
    type = models.IntegerField(choices=TYPE, blank=False)
    work_exp_req = models.IntegerField(choices=WORK_EXP_REQ, blank=False)
    edu_req = models.IntegerField(choices=EDUCATION_DEGREE, blank=False)
    city = models.CharField(max_length=10, blank=False)
    address = models.CharField(max_length=100, blank=True)
    duty = models.TextField(blank=True)
    detail_req = models.TextField(blank=True)
    email = models.EmailField(blank=False)
    created_at = models.DateTimeField(_('date created'), default=timezone.now, db_index=True)
    last_update = models.DateTimeField(_('date updated'), default=timezone.now,)
    subscription_count = models.IntegerField(default=0, blank=True)
    is_active = models.BooleanField(_('active'), default=True,)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True,)
    collections = models.ManyToManyField(User, through='functions.Collection',related_name='collections')
    lauds = models.ManyToManyField(User, through='functions.Laud',related_name='lauds')
    class Meta:
        verbose_name = _('position')
        verbose_name_plural = _('positions')

    def __str__(self):
        return self.name


@receiver(models.signals.post_delete, sender=Company)
def auto_delete_avatar_on_delete(sender, instance, **kwargs):
    import shutil
    """
    Deletes file from filesystem
    when corresponding `Company` object is deleted.
    """
    if instance.photo:
        if os.path.isdir(os.path.dirname(instance.photo.path)):
            shutil.rmtree(os.path.dirname(instance.photo.path))
