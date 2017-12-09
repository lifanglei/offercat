# -*- coding: UTF-8 -*-
from django.contrib.auth.validators import UnicodeUsernameValidator, ASCIIUsernameValidator
from django.utils import timezone
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.serializers import api_settings as jwt_settings
from django.utils.translation import ugettext as _
from django.db.models import Q

User = get_user_model()
jwt_payload_handler = jwt_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = jwt_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = jwt_settings.JWT_DECODE_HANDLER


class UserRegisterSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(required=True, allow_blank=False,
    #                                  validators=[User.username_validator,
    #                                              UniqueValidator(queryset=User.objects.all(),
    #                                                              message=_(u"该用户已被注册！"))],
    #                                  error_messages={
    #                                      'blank': _(u"请输入用户名！"),
    #                                      'unique': _(u"该用户已被注册！"),
    #                                      'invalid': _(u"用户名只能包括字母，数字以及@/./+/-/_！")
    #                                  })
    password = serializers.CharField(allow_blank=False,
                                     write_only=True,
                                     style={'input_type': 'password'},
                                     error_messages={
                                         'blank': _(u"请输入密码！"),
                                     })
    email = serializers.EmailField(required=True,
                                   validators=[UniqueValidator(queryset=User.objects.all(), message=_(u"该邮箱已被注册！"))],
                                   error_messages={
        'invalid': _(u"邮箱格式不正确！"),
        'unique': _(u"该邮箱已被注册！"),
        'blank': _(u"请输入邮箱！"),
    })
    token = serializers.SerializerMethodField(read_only=True)
    captcha_val = serializers.CharField(max_length=128,
                                        allow_blank=False,
                                        write_only=True,
                                        error_messages={
                                            'blank': _(u"验证码不匹配，请重新验证！"),
                                        })
    captcha_key = serializers.CharField(max_length=128,
                                        allow_blank=False,
                                        write_only=True,
                                        error_messages={
                                            'blank': _(u"验证码不匹配，请重新验证！"),
                                        })

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'password',
            'email',
            'token',
            'captcha_val',
            'captcha_key',
            'uuid',
        )

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.password = make_password(validated_data['password'])  # hash password
        user.save()
        return user

    def get_token(self, obj):
        payload = jwt_payload_handler(obj)
        return jwt_encode_handler(payload)


class UserLoginSerializer(JSONWebTokenSerializer):
    username_email = serializers.CharField(required=True, error_messages={
        'blank': _(u"请输入用户名或邮箱！"),
    })
    password = serializers.CharField(required=True, write_only=True, style={'input_type': 'password'}, error_messages={
        'blank': _(u"请输入密码！"),
    })
    id = serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.CharField(read_only=True, )
    uuid = serializers.CharField(read_only=True)
    # captcha_val = serializers.CharField(max_length=128, required=True, write_only=True)
    # captcha_key = serializers.CharField(max_length=128, required=True, write_only=True)

    class Meta:
        fields = (
            'id',
            'username_email',
            'password',
            'token',
            'username',
            'uuid',
            # 'captcha_val',
            # 'captcha_key',
        )
        extra_kwargs = {"password": {"write_only": True},
                        "username_email": {"write_only": True}}

    def __init__(self, *args, **kwargs):
        """
        Dynamically add the USERNAME_FIELD to self.fields.
        """
        super(JSONWebTokenSerializer, self).__init__(*args, **kwargs)

    # check user auth
    def validate(self, data):
        tmp = User.objects.filter(Q(username=data.get('username_email')) | Q(email=data.get('username_email'))).first()

        if tmp:
            # check user auth
            name = tmp.username
            credentials = {
                self.username_field: name,
                'password': data.get('password')
            }

            if all(credentials.values()):
                user = authenticate(**credentials)
                if user:
                    if not user.is_active:
                        msg = _(u"用户已注销！")
                        raise serializers.ValidationError(msg)

                    payload = jwt_payload_handler(user)
                    user.last_login = timezone.now()
                    user.save()
                    return {
                        "token": jwt_encode_handler(payload),
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "uuid": user.uuid,
                    }
                else:
                    msg = _(u"密码错误！")
                    raise serializers.ValidationError(msg)
            # else:
            #     msg = _(' "{username_field}" and "password".')
            #     msg = msg.format(username_field=self.username_field,)
            #     raise serializers.ValidationError(msg)
        else:
            msg = _(u"该用户不存在！")
            raise serializers.ValidationError(msg)

    # def get_token(self, obj):
    #     payload = jwt_payload_handler(obj)
    #     return jwt_encode_handler(payload)


class CapthaValueSerializer(serializers.Serializer):
    val = serializers.CharField(max_length=128, required=True)
    hashKey = serializers.CharField(max_length=128, required=True)

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass
