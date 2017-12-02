#-*- coding: UTF-8 -*-
from rest_framework_jwt.compat import get_username_field, get_username
from yunpian_python_sdk.model import constant as YC
from yunpian_python_sdk.ypclient import YunpianClient
from officeCat.config import yunpian_apikey

def sendSMS(tel,code):
# 初始化client,apikey作为所有请求的默认值
    clnt = YunpianClient(yunpian_apikey)
    param = {YC.MOBILE:tel,YC.TEXT:'【云片网】您的验证码是{0}'.format(code)}
    r = clnt.sms().single_send(param)
    return r
