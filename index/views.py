from django.shortcuts import render
from moduleData import models


def index(request):
    # models.onceUser.objects.create(user_name='bryant', user_pwd='leekobe24')
    man = models.onceUser.objects.get(pk=1)
    context = {
        'user': man
    }
    return render(request, 'Index/index.html', context)
