# -*- coding: utf-8 -*-
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import UserForm
from django.core.urlresolvers import reverse
from moduleData import models


def register(request):
    if request.method == 'POST':
        form = UserForm(request.POST)
        if form.is_valid():
            name = form['user_name'].data
            pwd = form['user_pwd'].data
            # 验证登录信息
            user = models.onceUser.objects.filter(user_name=name)
            if user.__len__() == 1:
                return HttpResponseRedirect(reverse('login:login'))
            elif user.__len__() == 0:
                user = models.onceUser.objects.create(user_name=name, user_pwd='123456', user_phone=name)
                user.save()
                return HttpResponseRedirect(reverse('index:index'))
    else:
        form = UserForm()
    return render(request, 'register/register.html', {'form': form})
