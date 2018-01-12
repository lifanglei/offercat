from django import template

register = template.Library()

@register.filter(name='switch_application_status')
def switch_application_status(value):
    return '未处理' if value == '投递成功' else value

