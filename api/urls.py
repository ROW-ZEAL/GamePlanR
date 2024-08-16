from django.urls import path
from . import views



urlpatterns = [
    path('venue', views.api_venues, name="api"),




]
