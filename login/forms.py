from django import forms

class LoginForm(forms.Form):
    user_name = forms.CharField(required=True, widget=forms.TextInput(attrs={
        'class': 'form-control', 'id': 'ms-form-user', 'type': 'text'}))
    user_pwd = forms.CharField(required=True, widget=forms.TextInput(attrs={
        'class': 'form-control', 'id': 'ms-form-pass', 'type': 'password'}))