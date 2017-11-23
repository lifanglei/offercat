from django.db import models


class onceUser(models.Model):
    db_table = ''
    id = models.IntegerField(primary_key='true', default=0, auto_created='true' ),
    user_name = models.CharField(max_length=16, blank='false')
    user_pwd = models.CharField(max_length=32, blank='false')
    user_sex = models.CharField(max_length=4, blank='true')
    user_email = models.CharField(max_length=256, blank='true')
    user_phone = models.CharField(max_length=256, blank='true')
    user_address = models.CharField(max_length=256, blank='true')
    user_city = models.CharField(max_length=256, blank='true')