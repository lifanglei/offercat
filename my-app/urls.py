from django.conf.urls import url
from . import views

urlpatterns = [
    # /my-app/
    # match the root
    url(r'^$', views.index,),
    # match all other pages
    url(r'^(?:.*)/?$', views.index,),
]