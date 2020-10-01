from django.urls import path
from . import views

urlpatterns = [
    path("all/", views.home_view),
    path("borders", views.WorldBorderList.as_view())
]
