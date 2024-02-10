# sim7600/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('make_call/', views.make_call, name='make_call'),
    path('send_text_message/', views.send_text_message, name='send_text_message'),
]