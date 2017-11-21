from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    context = {
        'name': 'bryant'
    }
    return render(request, 'Index/index.html', context)
