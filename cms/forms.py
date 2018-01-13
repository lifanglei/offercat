from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, UsernameField
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext as _
from django.db.models import Q
from django.contrib.auth.hashers import make_password
from captcha.fields import CaptchaField
from hire.models import Company, Position
from functions.models import Invitation

User = get_user_model()

class RegisterForm(UserCreationForm):
    username = forms.CharField(label=u"用户名", max_length=150, )
    name = forms.CharField(label=u"姓名", max_length=10, help_text=_(u'请输入工作中使用的姓名'))
    password1 = forms.CharField(
        label=_(u'密码'),
        strip=False,
        widget=forms.PasswordInput,
        # help_text=password_validation.password_validators_help_text_html(),
    )
    password2 = forms.CharField(
        label=_(u"确认密码"),
        widget=forms.PasswordInput,
        strip=False,
        help_text=_(u"再次输入密码"),
    )
    # password = forms.CharField(widget=forms.PasswordInput(),label=u'密码', required=True,)
    # comfirmed_password = forms.CharField(widget=forms.PasswordInput(), label=u"确认密码",required=True,)
    email = forms.EmailField(label=u"邮箱",required=True, help_text=_(u'请输入工作邮箱'))
    company = forms.CharField(label=u"公司", max_length=30, required=True, help_text=_(u'请填写与营业执照/劳动合同一致的公司名称'))
    position = forms.CharField(label=u"职位", max_length=20, required=True, help_text=_(u'请输入当前职位'))
    captcha = CaptchaField()

    class Meta:
        model = User
        fields = ("username","email",)

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.password = make_password(self.cleaned_data["password1"])
        user.is_staff = True
        if commit:
            user.save()
        return user

class LoginForm(AuthenticationForm):
    username = UsernameField(
        label=_(u"用户名或邮箱"),
        required=True,
        max_length=254,
        widget=forms.TextInput(attrs={'autofocus': True}),
        error_messages={
            'required': _(u"请输入用户名或邮箱！"),
        }
    )
    password = forms.CharField(
        label=_(u"密码"),
        strip=False,
        required=True,
        widget=forms.PasswordInput,
        error_messages={
            'required': _(u"请输入密码！"),
        }
    )

    error_messages = {
        'invalid_login': _(
            "Please enter a correct %(username)s and password. Note that both "
            "fields may be case-sensitive."
        ),
        'inactive': _("This account is inactive."),
        'user_not_existed': _(u"用户不存在！"),
        'password_wrong': _(u"密码不正确！")
    }

    def is_valid(self):
        return self.is_bound and not self.errors

    def confirm_login_allowed(self, user):
        print(user)
        if not user.is_active:
            raise forms.ValidationError(
                self.error_messages['inactive'],
                code='inactive',)

class CertificationUploadForm(forms.Form):
    file = forms.FileField(required=True, error_messages={'required': _(u"请选择文件！")})

class CompanyCreateForm(ModelForm):
    industry = forms.ChoiceField(choices=Company.INDUSTRY, initial=Company.INDUSTRY_BANK)
    size = forms.ChoiceField(choices=Company.SIZE, initial=Company.SIZE_SMALL)
    stock = forms.ChoiceField(choices=Company.STOCK, initial=Company.STOCK_NONE)
    name = forms.CharField(required=True,max_length=100, error_messages={'required': _(u"请输入公司名称！")})
    introduction = forms.CharField(widget=forms.Textarea(attrs={'class': "textarea"}),)
    description = forms.CharField(widget=forms.Textarea(attrs={'class': "textarea"}), )
    class Meta:
        model = Company
        fields = (
            'name',
            'web_site',
            'industry',
            'size',
            'stock',
            'introduction',
            'description',
            'photo',
            'shareholders',
            'abbreviation',
            'headquarters',
        )

class PositionCreateForm(ModelForm):
    name = forms.CharField(required=True,max_length=100, error_messages={'required': _(u"请输入职位名称！")})
    salary = forms.ChoiceField(choices=Position.SALARY_LEVEL,initial=Position.SALARY_LEVEL1)
    category = forms.ChoiceField(choices=Position.CATEGORY,initial=Position.CATEGORY_FUNCTION)
    type = forms.ChoiceField(choices=Position.TYPE, initial=Position.TYPE_GRADUATION)
    work_exp_req = forms.ChoiceField(choices=Position.WORK_EXP_REQ, initial=Position.WORK_EXP_LEVEL1)
    edu_req = forms.ChoiceField(choices=Position.EDUCATION_DEGREE, initial=Position.EDU_BACHELOR)
    duty = forms.CharField(widget=forms.Textarea(attrs={'class': "textarea"}),)
    detail_req = forms.CharField(widget=forms.Textarea(attrs={'class': "textarea"}), )

    class Meta:
        model=Position
        fields = (
            'name',
            'company',
            'department',
            'salary',
            'category',
            'type',
            'work_exp_req',
            'edu_req',
            'email',
            'duty',
            'detail_req',
            'city',
            'address',
        )

class InvitationCreateForm(ModelForm):
    user_uuid = forms.UUIDField(widget = forms.HiddenInput(),required=True)
    position_uuid = forms.UUIDField(widget = forms.HiddenInput(), required=True)
    application = forms.IntegerField(widget = forms.HiddenInput(), required=True)
    interview_time = forms.DateTimeField(required=True)
    class Meta:
        model= Invitation
        fields = (
            'interview_time',
            'interview_address',
            'content',
        )