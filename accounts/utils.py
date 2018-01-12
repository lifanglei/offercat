#-*- coding: UTF-8 -*-
from django.contrib.auth.validators import ASCIIUsernameValidator,UnicodeUsernameValidator
from django.contrib.auth.password_validation import CommonPasswordValidator, UserAttributeSimilarityValidator, MinimumLengthValidator
from django.utils.deconstruct import deconstructible
import django.dispatch
from django.core.exceptions import (
    FieldDoesNotExist, ImproperlyConfigured, ValidationError,
)

from yunpian_python_sdk.model import constant as YC
from yunpian_python_sdk.ypclient import YunpianClient
from officeCat.config import yunpian_apikey
from django.utils.translation import ugettext_lazy as _, ungettext_lazy

def sendSMS(tel,code):
# TODO: sending SMS for register
# 初始化client,apikey作为所有请求的默认值
    clnt = YunpianClient(yunpian_apikey)
    param = {YC.MOBILE:tel,YC.TEXT:'【云片网】您的验证码是{0}'.format(code)}
    r = clnt.sms().single_send(param)
    return r


@deconstructible
class MyASCIIUsernameValidator(ASCIIUsernameValidator):
    message = _(u"用户名只能包含字母，数字以及@/./+/-/")


@deconstructible
class MyUnicodeUsernameValidator(UnicodeUsernameValidator):
    message = _(u"用户名只能包含字母，数字以及@/./+/-/")

@deconstructible
class MYCommonPasswordValidator(CommonPasswordValidator):
    def validate(self, password, user=None):
        if password.lower().strip() in self.passwords:
            raise ValidationError(
                _(u"密码太简单！"),
                code='password_too_common',
            )

@deconstructible
class MyMinimumLengthValidator(MinimumLengthValidator):
    def validate(self, password, user=None):
        if len(password) < self.min_length:
            raise ValidationError(
                _(
                    u"密码太短了！ 最少包含 %(min_length)d 个字符.",
                    u"密码太短了！ 最少包含 %(min_length)d 个字符.",
                    self.min_length
                ),
                code='password_too_short',
                params={'min_length': self.min_length},
            )


create_proflie = django.dispatch.Signal(providing_args=["instance"])

create_hrproflie = django.dispatch.Signal(providing_args=["instance"])