# -*- coding: UTF-8 -*-
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, AbstractUser, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator, ASCIIUsernameValidator
from django.db import models
from django.utils import six, timezone
from .utils import MyASCIIUsernameValidator, MyUnicodeUsernameValidator
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail
from django.core.signals import request_finished


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    username_validator = MyUnicodeUsernameValidator() if six.PY3 else MyASCIIUsernameValidator()

    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        db_index=True,
        help_text=_('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        blank=False,
        error_messages={
            'invalid':_(u"用户名不合法！"),
            'unique': _(u"该用户已被注册！"),
            'blank': _(u"请输入用户名！"),
        },
    )
    # first_name = models.CharField(_('first name'), max_length=30, blank=True)
    # last_name = models.CharField(_('last name'), max_length=30, blank=True)
    password = models.CharField(_('password'), max_length=128, blank=False,)
    email = models.EmailField(_('email address'), blank=False, unique=True,)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    last_login = models.DateTimeField(_('last login'), default=timezone.now, null=True)
    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        indexes = [
            models.Index(fields=['username', 'email']),
        ]

    def clean(self):
        super(AbstractBaseUser, self).clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def get_full_name(self):
        pass

    def get_short_name(self):
        pass
