from django.urls import path, include
from . import views

urlpatterns = [
    path('hello/', views.hello_world), 
    path('test/', views.test_api, name = "test"),
    path('maloprodaja/', views.get_maloprodaja, name = "get_maloprodaja"),
    ]