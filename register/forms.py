from django import forms


class UserForm(forms.Form):
    user_name = forms.CharField(required=True, widget=forms.TextInput(attrs={
        'class': 'form-control', 'type': 'text'}))
    user_pwd = forms.CharField(required=True, widget=forms.TextInput(attrs={
        'class': 'form-control', 'type': 'text'}))