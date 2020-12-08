from django.urls import path
from . import views

urlpatterns = [
    path("all", views.home_view),
    path("search_config", views.search_config_view),
    path("borders", views.WorldBorderList.as_view()),
    path("dmw", views.DMWList.as_view()),
    path("detail", views.DMWDetail.as_view())
]
