from django.conf.urls import url
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    # /cms/,
    url(r'^login/$', views.cmsLogin, name='login'),
    url(r'^register/$', views.cmsRegister, name='register'),
    url(r'^certification_upload/$', views.cmsCertificationUpload, name='certification-upload'),
    url(r'^dashboard/$', views.cmsDashBoard, name='dashboard'),
    url(r'^company_create/$', views.cmsCompanyCreate, name='company-create'),
    url(r'^position_create/$', views.cmsPositionCreate, name='position-create'),
    url(r'^position_list/$', views.cmsPositionList, name='position-list'),
    url(r'^position_update/(?P<uuid>.+)/$', views.PositionUpdateView.as_view(), name='position-update'),
    url(r'^position_delete/(?P<uuid>.+)/$', views.PositionDeleteView.as_view(), name='position-delete'),
    url(r'^application_reject/(?P<id>.+)/$', views.cmsRejectApplication, name='application-reject'),
    url(r'^received_applications/$', views.cmsReceivedApplications, name='application-received-list'),
    url(r'^show_application/(?P<id>.+)/$', views.cmsShowApplication, name='application-show'),
    url(r'^invitation_create/$', views.cmsInvitationCreate, name='invitation-delete'),
    url(r'^sent_invitations/$', views.cmsSentInvitations, name='invitation-sent-list'),
    url(r'^show_invitation/(?P<id>.+)/$', views.cmsShowInvitation, name='invitation-show'),
    ]