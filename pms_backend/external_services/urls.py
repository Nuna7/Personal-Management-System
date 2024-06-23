from django.urls import path
from . import views

urlpatterns = [
    path("news/headlines/", views.headlines, name='headlines'),
    path("news/articles/",views.articles, name='articles'),
    path("news/sources/",views.sources, name='sources'),
    path("quote/",views.quote, name='quote')
] 