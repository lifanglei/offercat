from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    context = {
        'name': 'bryant',
        'isLogin': 'true'
    }
    return render(request, 'Index/index.html', context)
