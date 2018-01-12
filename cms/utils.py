from django.contrib.auth.backends import ModelBackend
from django import forms
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext as _
from django.db.models import Q

User = get_user_model()

class MyModelBackend(ModelBackend):

    def authenticate(self, request, username=None, password=None, **kwargs):

        if username is None:
            username = kwargs.get(User.USERNAME_FIELD)

        if not User.objects.filter(Q(username=username) | Q(email=username)).exists():
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a non-existing user (#20760).
            # User().set_password(password)
            raise forms.ValidationError(_(u"用户不存在！"), code='user_not_existed')
        else:
            user = User.objects.filter(Q(username=username) | Q(email=username)).first()
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

            elif not self.user_can_authenticate(user) :
                raise forms.ValidationError(_(u"用户已注销！"),code='role_wrong')
            else :
                raise forms.ValidationError(_(u"密码错误！"), code='password_wrong')



