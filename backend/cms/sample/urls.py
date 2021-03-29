from django.urls import path
from . import views

urlpatterns = [
    path("all", views.home_view),
    path("categories", views.CategoryList.as_view()),
    path("search_config", views.search_config_view),
    path("borders", views.WorldBorderList.as_view()),
    path("dmw", views.DMWList.as_view()),
    path("hot", views.HotList.as_view()),
    path("detail", views.DMWDetail.as_view()),
    path("community_spending_by_committee", views.StackedBarChart.as_view()),
    path("community_spending_by_organization", views.TreeMap.as_view())
]
