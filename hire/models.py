# -*- coding: UTF-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _
from profiles.utils import user_directory_path
from profiles.models import User


# Create your models here.


class Company(models.Model):
    name = models.CharField(max_length=100, blank=True)
    web_site = models.URLField(blank=True)
    type = models.CharField(max_length=10, blank=True)
    size = models.CharField(max_length=10, blank=True)
    stock = models.CharField(max_length=50, blank=True)
    description = models.TextField(max_length=50, blank=True )
    photo = models.ImageField(_(u'照片'), upload_to=user_directory_path, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('company')
        verbose_name_plural = _('companies')


class Position(models.Model):
    SALARY_LEVEL1 = 1
    SALARY_LEVEL2 = 2
    SALARY_LEVEL3 = 3
    SALARY_LEVEL4 = 4
    SALARY_LEVEL5 = 5
    SALARY_LEVEL = [(SALARY_LEVEL1, u'5k以下'),
                    (SALARY_LEVEL2, u'5k-10k'),
                    (SALARY_LEVEL3, u'10k-15k'),
                    (SALARY_LEVEL4, '15k-25k'),
                    (SALARY_LEVEL4, '25k以上')]

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
    company = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True)
    department = models.CharField(max_length=100, blank=True)
    salary = models.IntegerField(choices=SALARY_LEVEL, blank=False)
    type = models.IntegerField(choices=TYPE, blank=False)
    work_exp_req = models.IntegerField(choices=WORK_EXP_REQ, blank=False)
    edu_req = models.IntegerField(choices=EDUCATION_DEGREE, blank=False)
    city = models.CharField(max_length=10, blank=False)
    address = models.CharField(max_length=100, blank=True)
    duty = models.TextField(blank=True)
    detail_req = models.TextField(blank=True)
    email = models.EmailField(blank=False)

    class Meta:
        verbose_name = _('position')
        verbose_name_plural = _('positions')


