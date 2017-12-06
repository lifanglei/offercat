#-*- coding: UTF-8 -*-
from django.contrib.auth.validators import ASCIIUsernameValidator,UnicodeUsernameValidator
from django.utils.deconstruct import deconstructible

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