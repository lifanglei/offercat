# -*- coding: UTF-8 -*-
import os
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from .utils import user_directory_path
# Create your models here.
User = settings.AUTH_USER_MODEL


class Profile(models.Model):
    EDU_BACHELOR = 1
    EDU_MASTER = 2
    EDU_PHD = 3
    EDU_MBA = 4
    EDUCATION_DEGREE = [(EDU_BACHELOR, u'本科'),
                        (EDU_MASTER, u'硕士'),
                        (EDU_PHD, u'博士'),
                        (EDU_MBA, 'MBA')]
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

    user = models.OneToOneField(User, on_delete=models.CASCADE, )
    first_name = models.CharField(_(u'名'), max_length=30, blank=True)
    last_name = models.CharField(_(u'姓'), max_length=30, blank=True)
    edu_degree = models.IntegerField(_(u'学历'), choices=EDUCATION_DEGREE, blank=True)
    service_years = models.IntegerField(_(u'工作年限'), choices=SERVICE_YEARS, blank=True)
    tel = PhoneNumberField(_(u'手机号码'), max_length=15, blank=True)
    email = models.EmailField(_(u'个人邮箱'), blank=True)
    address = models.CharField(_(u'现居地'), max_length=10, blank=True)
    description = models.TextField(_(u'个人简介'), blank=True)
    avatar = models.ImageField(_(u'照片'), upload_to=user_directory_path,blank=True)

    class Meta:
        db_table = 'profiles'
        verbose_name = _('profile')
        verbose_name_plural = _('profiles')

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = '{0} {1}'.format(self.first_name, self.last_name)
        return full_name.strip()



class Test(models.Model):
    image = models.ImageField()

    class Meta:
        verbose_name = _('test')
        verbose_name_plural = _('tests')


@receiver(models.signals.post_delete, sender=Profile)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    import shutil
    """
    Deletes file from filesystem
    when corresponding `Profile` object is deleted.
    """
    # if instance.avatar:
    #     print(os.path.dirname(instance.avatar.path))
    #     if os.path.isfile(instance.avatar.path):
    #         os.remove(instance.avatar.path)
    if instance.avatar:
        print(os.path.dirname(instance.avatar.path))
        if os.path.isdir(os.path.dirname(instance.avatar.path)):
            shutil.rmtree(os.path.dirname(instance.avatar.path))

