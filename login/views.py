from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.core.urlresolvers import reverse
from .forms import LoginForm
from moduleData import models


def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            name = form['user_name'].data
            pwd = form['user_pwd'].data
            # 验证登录信息
            user = models.onceUser.objects.filter(user_name=name, user_pwd=pwd)
            if user.__len__() == 1:
                return HttpResponseRedirect(reverse('index:index'))
            else:
                return render(request, 'register/register.html', {'form': form, 'error': '用户名或密码错误'})

    else:
        form = LoginForm()

    return render(request, 'Login/login.html', {'form': form, 'error': ''})
