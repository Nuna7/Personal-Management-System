from django.urls import path
from . import views

urlpatterns = [
    path("water/", views.WaterCreateView.as_view(), name='water'),
    path("calorie/", views.CalorieCreateView.as_view(), name='calorie'),
    path("calorie/options/",views.mealType,name='calorie_options'),
    path("expense/", views.ExpenseCreateView.as_view(), name='expense'),
    path("expense/options/",views.expenseOptions, name='expense_options'),
    path("productivity/", views.ProductivityModeView.as_view(), name='productivity'),
    path("productivity/plot/", views.ProductivityView.as_view(), name='productivity'),
    path("productivity/token/", views.UserProfileUpdateView.as_view(), name='productivity_token'),
    path('productivity/<int:pk>/', views.ProductivityDetailView.as_view(), name='productivity-detail'),
    path("goal/", views.GoalView.as_view(), name='goal'),
    path('goal/<int:pk>/', views.GoalDetailView.as_view(), name='goal-detail'),
    path("goal/plot/", views.GoalAnalyticsView.as_view(), name='goal_plot'),
    path("task/",views.TaskView.as_view(), name='task'),
    path('task/<int:pk>/', views.TaskDetailView.as_view(), name='task-detail'),
    path("task/plot/", views.TaskAnalyticsView.as_view(), name='task_plot'),
    path("home_plot/", views.AnalyticsView.as_view(), name='home_plot')
] 