from django.http import HttpResponse
from django.shortcuts import render


def login(request):
    context = {
        'name': 'bryant'
    }
    return render(request, 'Login/login.html', context)
