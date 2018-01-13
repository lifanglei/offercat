from django import forms
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect, Http404, HttpResponseForbidden
from .forms import (RegisterForm,
                    LoginForm,
                    CertificationUploadForm,
                    CompanyCreateForm,
                    PositionCreateForm,
                    InvitationCreateForm
                    )
from django.contrib.auth import authenticate, login
from django.urls import reverse_lazy
from rest_framework_jwt.serializers import api_settings as jwt_settings
from profiles.models import HRProfile, WorkExperience, EducationalExperience, Skill, Resume
from hire.models import Company, Position
from functions.models import Application, Invitation
from accounts.utils import create_hrproflie
from django.db.models import Q
from django.utils.translation import ugettext as _
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic import ListView
from captcha.models import CaptchaStore
from rest_framework.reverse import reverse
from django.db import transaction

User = get_user_model()
# Create your views here.
jwt_payload_handler = jwt_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = jwt_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = jwt_settings.JWT_DECODE_HANDLER


def cmsLogin(request):
    form = LoginForm(request.POST or None, request.FILES or None)
    if request.method == 'POST':

        username = request.POST['username']
        password = request.POST['password']
        # user = authenticate(request, username=username, password=password)
        if not User.objects.filter(Q(username=username) | Q(email=username)).exists():
            messages.error(request, _(u"用户不存在！"))
            # raise forms.ValidationError(_(u"用户不存在！"), code='user_not_existed')
        else:
            user = User.objects.filter(Q(username=username) | Q(email=username)).first()
            if user.check_password(password) and user.is_active:
                login(request, user)
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)

                return HttpResponseRedirect(reverse('cms:dashboard'))
            elif not user.is_active:
                messages.error(request, _(u"用户已注销！"))
                # raise forms.ValidationError(_(u"用户已注销！"),code='role_wrong')
            else :
                messages.error(request, _(u"密码错误！"))
                # raise forms.ValidationError(_(u"密码错误！"), code='password_wrong')

    return render(request, 'login.html', {'form': form})

def cmsRegister(request):
    form = RegisterForm(request.POST or None, request.FILES or None)
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            user = form.save()
            print(user)
            create_hrproflie.send(sender=user.__class__, instance=user,name=request.POST['name'],
                                  position=request.POST['position'],company=request.POST['company'])
            login(request, user)
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            data = {'token':token,'user_uuid':user.uuid}
            return HttpResponseRedirect('/cms/certification_upload/')

    return render(request, 'register.html', {'form': form})

@login_required(login_url='/cms/login/')
def cmsCertificationUpload(request):
    print(request.user.is_authenticated())
    form = CertificationUploadForm(request.POST or None, request.FILES or None)
    if request.method == 'POST':
        form = CertificationUploadForm(request.POST, request.FILES)
        print(request.FILES)
        if form.is_valid():
            hr_profile = request.user.hrprofile
            print(hr_profile)
            hr_profile.certificated_doc=request.FILES['file']
            hr_profile.status = HRProfile.STATUS_IN_PROGRESS
            hr_profile.save()
            return HttpResponseRedirect('/cms/dashboard/')

    return render(request, 'certificationUpload.html', {'form': form})

def cmsCompanyCreate(request):
    form = CompanyCreateForm(request.POST or None, request.FILES or None)
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        if form.is_valid():
            form.save()
            return HttpResponse("....")
    return render(request, 'postCompany.html', {'form': form})

def cmsPositionCreate(request):
    form = PositionCreateForm(request.POST or None, request.FILES or None)

    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        if form.is_valid():
            instance = form.save(commit=False)
            instance.post_by = request.user
            print(instance.duty)
            form.save()
            messages.info(request, '创建成功！')
            return HttpResponseRedirect('/cms/position_create/')
    return render(request, 'postPosition.html', {'form': form})


class PositionUpdateView(UpdateView):
    model = Position
    success_url = reverse_lazy('cms:dashboard')
    template_name = 'updatePosition.html'
    form_class = PositionCreateForm

    def get_object(self, queryset=None):
        """
        Returns the object the view is displaying.

        By default this requires `self.queryset` and a `pk` or `slug` argument
        in the URLconf, but subclasses can override this to return any object.
        """
        # Use a custom queryset if provided; this is required for subclasses
        # like DateDetailView
        if queryset is None:
            queryset = self.get_queryset()

        # Next, try looking up by primary key.
        uuid = self.kwargs.get("uuid")

        if uuid is not None:
            queryset = queryset.filter(uuid=uuid)

        try:
            # Get the single item from the filtered queryset
            obj = queryset.get()
        except queryset.model.DoesNotExist:
            raise Http404(_("No %(verbose_name)s found matching the query") %
                          {'verbose_name': queryset.model._meta.verbose_name})
        return obj

class PositionDeleteView(DeleteView):
    model = Position
    success_url = reverse_lazy('cms:dashboard')
    template_name = 'position_confirm_delete.html'

    def get_object(self, queryset=None):
        """
        Returns the object the view is displaying.

        By default this requires `self.queryset` and a `pk` or `slug` argument
        in the URLconf, but subclasses can override this to return any object.
        """
        # Use a custom queryset if provided; this is required for subclasses
        # like DateDetailView
        if queryset is None:
            queryset = self.get_queryset()

        # Next, try looking up by primary key.
        uuid = self.kwargs.get("uuid")

        if uuid is not None:
            queryset = queryset.filter(uuid=uuid)

        try:
            # Get the single item from the filtered queryset
            obj = queryset.get()
        except queryset.model.DoesNotExist:
            raise Http404(_("No %(verbose_name)s found matching the query") %
                          {'verbose_name': queryset.model._meta.verbose_name})
        return obj

    # @login_required(login_url='/cms/login/')
    def dispatch(self, request, *args, **kwargs):
        # check for user logged in
        ...
        # check for user permission:
        # Take pk from kwargs
        uuid = kwargs.get('uuid')  # example
        # Take user from request
        user = request.user
        print(request.user)
        # check permission
        try:
            Position.objects.get(uuid=uuid, post_by=user)
            return super(PositionDeleteView, self).dispatch(request, *args, **kwargs)
        except Position.DoesNotExist as e:
            return HttpResponseForbidden()

    def delete(self, request, *args, **kwargs):
        """
        Calls the delete() method on the fetched object and then
        redirects to the success URL.
        """
        self.object = self.get_object()
        success_url = self.get_success_url()
        self.object.delete()
        return HttpResponseRedirect(success_url)

@login_required(login_url='/cms/login/')
def cmsDashBoard(request):
    invitation_form = InvitationCreateForm(request.POST or None, request.FILES or None)
    position_form = PositionCreateForm(request.POST)
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
            return HttpResponse("....")

    my_positions = Position.objects.filter(post_by=request.user).defer('id')
    received_applications = Application.objects.filter(position__post_by=request.user).select_related('user','position','user__profile')
    sent_invitations = Invitation.objects.filter(sent_by=request.user).select_related('application','user__profile','position')
    data = {'invitation_form': invitation_form
            }
    if my_positions.exists():
        data['my_positions'] = my_positions.all()
    if received_applications.exists():
        data['received_applications'] = received_applications.all()
    if sent_invitations.exists():
        data['sent_invitations'] = sent_invitations.all()
    return render(request, template_name='dashboard.html',context=data)

def cmsInvitationCreate(request):
    form = InvitationCreateForm(request.POST or None, request.FILES or None)
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        if form.is_valid():
            instance = form.save(commit=False)
            instance.sent_by = request.user
            user = User.objects.filter(uuid=form.data['user_uuid'])
            position = Position.objects.filter(uuid=form.data['position_uuid'])
            application = Application.objects.filter(id=form.data['application'])
            if user.exists():
                instance.user = user.first()
            if position.exists():
                instance.position = position.first()
            if application.exists():
                instance.application = application.first()
            with transaction.atomic():
                form.save()
                instance.application.status = Application.STATUS_RECEPTED
                instance.application.save()
            return HttpResponseRedirect('/cms/dashboard/')
    return render(request, 'createInvitation.html', {'form': form})

@login_required(login_url='/cms/login/')
def cmsRejectApplication(request, id=None):
    if request.method == 'POST':
        if id :
            application = Application.objects.filter(id= id)
            if application.exists():
                application= application.first()
                application.status = Application.STATUS_NOTAPPLICABLE
                application.save()
                return HttpResponse(u'已回绝改申请！')

def cmsShowApplication(request, id=None):
    if request.method == 'GET':
        application = Application.objects.filter(id=id).select_related('user','position','user__profile')
        work_exp = WorkExperience.objects.filter(user=application.first().user)
        edu_exp = EducationalExperience.objects.filter(user=application.first().user)
        skill = Skill.objects.filter(user=application.first().user)
        resumes = Resume.objects.filter(user=application.first().user)
        data = {
                }
        if application.exists():
            data['application'] = application.first()
        if work_exp.exists():
            data['work_exps'] = work_exp.all()
        if edu_exp.exists():
            data['edu_exps'] = edu_exp.all()
        if skill.exists():
            data['skills'] = skill.all()
        if resumes.exists():
            data['resumes'] = resumes.all()
        application.first().status = Application.STATUS_VIEWED
        application.first().save()
        return render(request, template_name='showApplication.html', context=data)


def cmsShowInvitation(request, id=None):
    if request.method == 'GET':
        invitation = Invitation.objects.filter(id=id).select_related('application','user__profile','position')
        data = {
                }
        if invitation.exists():
            data['invitation'] = invitation.first()
        return render(request, template_name='showInvitation.html', context=data)
