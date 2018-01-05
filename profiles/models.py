# -*- coding: UTF-8 -*-
import os, uuid
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from .utils import user_directory_path, resume_directory_path, validate_resume_extension, get_default_image
from accounts.utils import create_proflie

from django.core.signals import request_finished

# Create your models here.
User = settings.AUTH_USER_MODEL


class Profile(models.Model):
    EDU_BACHELOR = 1
    EDU_MASTER = 2
    EDU_PHD = 3
    EDU_MBA = 4
    EDU_OTHER = 5
    EDUCATION_DEGREE = [(EDU_BACHELOR, u'本科'),
                        (EDU_MASTER, u'硕士'),
                        (EDU_PHD, u'博士'),
                        (EDU_MBA, 'MBA'),
                        (EDU_OTHER, u'其他')]
    SERVICE_STUDENT, SERVICE_GRADUATE, SERVICE_YEAR1, SERVICE_YEAR2, SERVICE_YEAR3, SERVICE_YEAR4, SERVICE_YEAR5, \
    SERVICE_YEAR10, SERVICE_10MORE = list(range(1, 10))

    SERVICE_YEARS = [(SERVICE_STUDENT, u'在读'),
                     (SERVICE_GRADUATE, u'应届生'),
                     (SERVICE_YEAR1, u'1年'),
                     (SERVICE_YEAR2, u'2年'),
                     (SERVICE_YEAR3, u'3年'),
                     (SERVICE_YEAR4, u'4年'),
                     (SERVICE_YEAR5, u'5年'),
                     (SERVICE_YEAR10, u'10年'),
                     (SERVICE_10MORE, u'10年以上')]

    user = models.OneToOneField(User, on_delete=models.CASCADE,)
    first_name = models.CharField(_(u'名'), max_length=30,  null=True)
    last_name = models.CharField(_(u'姓'), max_length=30,  null=True)
    edu_degree = models.IntegerField(_(u'学历'), choices=EDUCATION_DEGREE, null=True)
    service_years = models.IntegerField(_(u'工作年限'), choices=SERVICE_YEARS, null=True)
    tel = PhoneNumberField(_(u'手机号码'), max_length=15, null=True)
    email = models.EmailField(_(u'个人邮箱'), null=True)
    address = models.CharField(_(u'现居地'), max_length=10, null=True)
    description = models.TextField(_(u'个人简介'), null=True)
    avatar = models.ImageField(_(u'照片'), upload_to=user_directory_path,blank=True )
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True,)
    class Meta:
        db_table = 'profiles'
        verbose_name = _('profile')
        verbose_name_plural = _('profiles')

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        if self.last_name == None:
            return None
        else:
            full_name = '{0} {1}'.format(self.last_name, self.first_name)
            return full_name.strip()

    def query_work_exp(self,):
        return WorkExperience.objects.filter(user=self.user)

    def query_edu_exp(self,):
        return EducationalExperience.objects.filter(user=self.user)

    def query_skills(self,):
        return Skill.objects.filter(user=self.user)




class WorkExperience(models.Model):
    company = models.CharField(_(u'公司'), max_length=200, blank=False)
    position = models.CharField(_(u'职位'), max_length=100, blank=False)
    start_date = models.CharField(_(u'开始日期'), max_length=10, blank=False)
    end_date = models.CharField(_(u'结束日期'), max_length=10, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    # uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True, )

    class Meta:
        db_table = 'profiles_work_exp'
        verbose_name = _('Work Experience')
        verbose_name_plural = _('Work Experience')


class EducationalExperience(models.Model):
    EDU_BACHELOR = 1
    EDU_MASTER = 2
    EDU_PHD = 3
    EDU_MBA = 4
    EDUCATION_DEGREE = [(EDU_BACHELOR, u'本科'),
                        (EDU_MASTER, u'硕士'),
                        (EDU_PHD, u'博士'),
                        (EDU_MBA, 'MBA')]
    college = models.CharField(_(u'学校'), max_length=200, blank=False)
    major = models.CharField(_(u'专业'), max_length=100, blank=False)
    degree = models.IntegerField(_(u'学历'), choices=EDUCATION_DEGREE, blank=False)
    graduate_date = models.DateField(_(u'毕业年份'),blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,)
    # uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True, )

    class Meta:
        db_table = 'profiles_edu_exp'
        verbose_name = _('Educational Experience')
        verbose_name_plural = _('Educational Experience')

class Skill(models.Model):
    LEVEL_1 = 1
    LEVEL_2 = 2
    LEVEL_3 = 3
    LEVEL_4 = 4
    LEVEL_5 = 5
    SKILL_LEVEL = [ (LEVEL_1, u'入门'),
                    (LEVEL_2, u'掌握'),
                    (LEVEL_3, u'熟练'),
                    (LEVEL_4, u'精通'),
                    (LEVEL_5, u'专家'), ]

    name = models.CharField(_(u'技能'), max_length=50, blank=False)
    level = models.IntegerField(_(u'水平'), choices=SKILL_LEVEL, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, )
    # uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, db_index=True, )

    class Meta:
        db_table = 'profiles_skills'
        verbose_name = _('Educational Experience')
        verbose_name_plural = _('Educational Experience')


class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, )
    resume = models.FileField(upload_to=resume_directory_path, validators=[validate_resume_extension])

    class Meta:
        db_table = 'profiles_resume'
        verbose_name = _('Personal Resume')
        verbose_name_plural = _('Personal Resumes')


@receiver(models.signals.post_delete, sender=Profile)
def auto_delete_avatar_on_delete(sender, instance, **kwargs):
    import shutil
    """
    Deletes file from filesystem
    when corresponding `Profile` object is deleted.
    """
    if instance.avatar:
        if os.path.isdir(os.path.dirname(instance.avatar.path)):
            shutil.rmtree(os.path.dirname(instance.avatar.path))


@receiver(models.signals.post_delete, sender=Resume)
def auto_delete_resume_on_delete(sender, instance, **kwargs):
    import shutil
    """
    Deletes file from filesystem
    when corresponding `Profile` object is deleted.
    """
    if instance.resume:
        if os.path.isdir(os.path.dirname(instance.resume.path)):
            shutil.rmtree(os.path.dirname(instance.resume.path))

@receiver(create_proflie)
def auto_create_profile_on_user_create(sender, instance, **kwargs):
    if instance.id:
        obj = Profile(user=instance, avatar=get_default_image())
        obj.save()
