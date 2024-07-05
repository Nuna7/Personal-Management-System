from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import WaterConsumptionSerializer, CalorieIntakeSerializer, ExpenseSerializer, Productivity, GoalSerializer, TaskSerializer
from .models import WaterUser, CalorieUser, Expense, ExpenseUser, ProductivityModeUser, GoalUser, TaskUser, WaterConsumption, CalorieIntake, Task, ProductivityMode, Goal

from django.db.models import Case, When, Value, IntegerField, Sum, CharField
from django.db.models.functions import ExtractDay, ExtractMonth, ExtractYear
import json
from django.utils import timezone
from datetime import timedelta
from django.http import JsonResponse

expenseCategory = {
    "expenseCategory": [
        {"value": "housing", "label": "Housing"},
        {"value": "transportation", "label": "Transportation"},
        {"value": "health and medical", "label": "Health and Medical"},
        {"value": "insurance", "label": "Insurance"},
        {"value": "debt payments", "label": "Debt Payments"},
        {"value": "savings and investments", "label": "Savings and Investments"},
        {"value": "entertainment and leisure", "label": "Entertainment and Leisure:"},
        {"value": "personal care", "label": "Personal Care"},
        {"value": "education", "label": "Education"},
        {"value": "family and children", "label": "Family and Children"},
        {"value": "gifts and donations", "label": "Gifts and Donations"},
        {"value": "miscellaneous", "label": "Miscellaneous"}
    ]
}

mealType_ = {
    "mealType": [
        {"value": "breakfast", "label": "Breakfast"},
        {"value": "dinner", "label": "Dinner"},
        {"value": "lunch", "label": "Lunch"},
        {"value": "snack", "label": "Snack"}
    ]
}

def expenseOptions(request):
    """
    View to provide available expense categories.
    """
    return JsonResponse(expenseCategory)

def mealType(request):
    """
    View to provide available meal types.
    """
    return JsonResponse(mealType_)

class CustomJSONEncoder(json.JSONEncoder):
    """
    Custom JSON encoder to handle serialization of lists.
    """
    def default(self, obj):
        if isinstance(obj, list):
            return [str(item) for item in obj if item]
        return super().default(obj)

class WaterCreateView(generics.CreateAPIView):
    """
    API view to handle creation of water consumption records.
    """
    serializer_class = WaterConsumptionSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            water = serializer.save()
            WaterUser.objects.create(user_id=request.user, waterconsumption_id=water)
            return Response({"message": "Water created successfully"}, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CalorieCreateView(generics.CreateAPIView):
    """
    API view to handle creation of calorie intake records.
    """
    serializer_class = CalorieIntakeSerializer
    permission_classes = [IsAuthenticated]

    def create(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            calorie = serializer.save()
            CalorieUser.objects.create(user_id=request.user, calorieintake_id=calorie)
            return Response({"message": "Calorie created successfully"}, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExpenseCreateView(generics.CreateAPIView):
    """
    API view to handle creation of expense records.
    """
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            expense = serializer.save()
            ExpenseUser.objects.create(user_id=request.user, expense_id=expense)
            return Response({"message": "Expense created successfully"}, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GoalView(generics.CreateAPIView):
    """
    API view to handle creation of goal records.
    """
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            goal = serializer.save()
            GoalUser.objects.create(user_id=request.user, goal_id=goal)
            return Response({"message": "Goal created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GoalDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to handle updating and deleteing of Goal mode records.
    """
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

class ProductivityModeView(generics.CreateAPIView):
    """
    API view to handle creation of productivity mode records.
    """
    serializer_class = Productivity
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            productivity = serializer.save()

            ProductivityModeUser.objects.create(
                user_id=request.user,
                productivity_id=productivity
            )

            return Response({"message": "Productivity mode created successfully"}, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductivityDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to handle updating and deleteing of Productivity mode records.
    """
    queryset = ProductivityMode.objects.all()
    serializer_class = Productivity
    permission_classes = [IsAuthenticated]

class TaskView(generics.CreateAPIView):
    """
    API view to handle creation of task records.
    """
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():

            task = serializer.save()
            TaskUser.objects.create(user_id=request.user, task_id=task)

            return Response({"message": "Task created successfully"}, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to handle updating and deleteing of Task records.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

class UserProfileUpdateView(APIView):
    """
    API view to handle updating user profile information.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AnalyticsView(APIView):
    """
    API view to provide water consumption, expense and calorie analytics.
    """
    def get(self, request):
        current_user = self.request.user
        current_date = timezone.now().date()
        current_year = current_date.year
        current_month = current_date.month
        previous_month = (current_date.replace(day=1) - timedelta(days=1)).month
        last_month_end = current_date.replace(day=1) - timedelta(days=1)
        last_month_year = last_month_end.year
        last_month_days = last_month_end.day

        # Water consumption per month for the current year
        consumption_per_month = [
            {
                'month': month,
                'consumption': WaterConsumption.objects.filter(
                    date__year=current_year, 
                    date__month=month, 
                    water_users__user_id=current_user.id
                ).aggregate(Sum('amount'))['amount__sum'] or 0
            } for month in range(1, 13)
        ]

        # Water consumption per day for the current month
        consumption_per_day_current_month = [
            {
                'day': day,
                'consumption': WaterConsumption.objects.filter(
                    date__year=current_year, 
                    date__month=current_month, 
                    date__day=day, 
                    water_users__user_id=current_user.id
                ).aggregate(Sum('amount'))['amount__sum'] or 0
            } for day in range(1, current_date.day + 1)
        ]

        # Water consumption per day for the previous month
        consumption_per_day_last_month = [
            {
                'day': day,
                'consumption': WaterConsumption.objects.filter(
                    date__year=last_month_year, 
                    date__month=previous_month, 
                    date__day=day, 
                    water_users__user_id=current_user.id
                ).aggregate(Sum('amount'))['amount__sum'] or 0
            } for day in range(1, last_month_days + 1)
        ]

        # Calories per month for the current year
        calories_per_month = CalorieIntake.objects.filter(
            calorieuser__user_id=current_user,
            date__year=current_year
        ).values('date__month').annotate(total=Sum('calories')).order_by('date__month')

        # Calories per day for the current month
        calories_per_day_current_month = CalorieIntake.objects.filter(
            calorieuser__user_id=current_user,
            date__year=current_year,
            date__month=current_month
        ).values('date__day').annotate(total=Sum('calories')).order_by('date__day')

        # Calories per day for the previous month
        calories_per_day_previous_month = CalorieIntake.objects.filter(
            calorieuser__user_id=current_user,
            date__year=last_month_year,
            date__month=previous_month
        ).values('date__day').annotate(total=Sum('calories')).order_by('date__day')

        # Calories per meal type per month for the current month
        calories_per_meal_type_month = CalorieIntake.objects.filter(
            calorieuser__user_id=current_user,
            date__year=current_year,
            date__month=current_month
        ).values('meal_type').annotate(total=Sum('calories'))

        # Calories per meal type per day for the previous month
        calories_per_meal_type_prevmonth = CalorieIntake.objects.filter(
            calorieuser__user_id=current_user,
            date__year=last_month_year,
            date__month=previous_month
        ).values('meal_type').annotate(total=Sum('calories'))

        # Expense per month for the current year
        expense_per_month = Expense.objects.filter(
            expenseuser__user_id=current_user,
            date__year=current_year
        ).values('date__month').annotate(total=Sum('amount'))

        # Expense per category (all time)
        expense_per_category = Expense.objects.filter(
            expenseuser__user_id=current_user
        ).values('category').annotate(total=Sum('amount'))

        # Expense per category for the current month
        expense_per_category_current_month = Expense.objects.filter(
            expenseuser__user_id=current_user,
            date__year=current_year,
            date__month=current_month
        ).values('category').annotate(total=Sum('amount'))

        data = {
            'consumption_per_month': consumption_per_month,
            'consumption_per_day_current_month': consumption_per_day_current_month,
            'consumption_per_day_last_month': consumption_per_day_last_month,
            'calories_per_month': list(calories_per_month),
            'calories_per_day_current_month': list(calories_per_day_current_month),
            'calories_per_day_previous_month': list(calories_per_day_previous_month),
            'calories_per_meal_type_month': list(calories_per_meal_type_month),
            'calories_per_meal_type_prevmonth': list(calories_per_meal_type_prevmonth),
            'expense_per_month': [
                {
                    'month': item['date__month'],
                    'total': item['total']
                } for item in expense_per_month
            ],
            'expense_per_category': [
                {
                    'category': item['category'],
                    'total': item['total']
                } for item in expense_per_category
            ],
            'expense_per_category_current_month': [
                {
                    'category': item['category'],
                    'total': item['total']
                } for item in expense_per_category_current_month
            ]
        }

        print()

        return Response(data, status=status.HTTP_200_OK)

class TaskAnalyticsView(APIView):
    """
    API view to provide task analytics.
    """
    def get(self, request):
        current_user = self.request.user
        current_date = timezone.now().date()

        status_order = Case(
            When(status='in_progress', then=Value(1)),
            When(status='pending', then=Value(2)),
            When(status='completed', then=Value(3)),
            output_field=IntegerField(),
        )

        priority_order = Case(
            When(priority='High', then=Value(1)),
            When(priority='medium', then=Value(2)),
            When(priority='low', then=Value(3)),
            output_field=IntegerField(),
        )

        tasks = Task.objects.filter(
            taskuser__user_id=current_user
        ).annotate(
            custom_status_order=status_order,
            custom_priority_order=priority_order
        ).order_by(
            'custom_status_order', 'custom_priority_order'
        )

        data = []
        for item in tasks:
            data.append({
                'id':item.id,
                'title': item.title,
                'description': item.description,  
                'priority': item.priority,
                'status':item.status
            })

        return Response(data, status.HTTP_200_OK)

class GoalAnalyticsView(APIView):
    """
    API view to provide goal analytics.
    """
    def get(self, request):
        current_user = self.request.user

        status_order = Case(
            When(status='in_progress', then=Value(1)),
            When(status='pending', then=Value(2)),
            When(status='completed', then=Value(3)),
            output_field=IntegerField(),
        )

        priority_order = Case(
            When(priority='High', then=Value(1)),
            When(priority='medium', then=Value(2)),
            When(priority='low', then=Value(3)),
            output_field=IntegerField(),
        )

        goals = Goal.objects.filter(
            goaluser__user_id=current_user
        ).annotate(
            custom_status_order=status_order,
            custom_priority_order=priority_order
        ).order_by(
            'custom_status_order', 'custom_priority_order', 'end_date'
        )

        data = []
        for item in goals:
            data.append({
                'id':item.id,
                'title': item.title,
                'description': item.description,  
                'priority': item.priority,
                'status':item.status,
                'start_date':item.start_date,
                'end_date':item.end_date
            })

        return Response(data, status.HTTP_200_OK)


class ProductivityView(APIView):
    """
    API view to provide productivity mode analytics.
    """
    def get(self, request):
        current_user = self.request.user
        today = timezone.now().weekday() 

        day_order = [
            today,          
            (today + 1) % 7,  
            (today + 2) % 7, 
            (today + 3) % 7, 
            (today + 4) % 7,  
            (today + 5) % 7,  
            (today + 6) % 7   
        ]

        # Annotate each record with the future day order and sort accordingly
        productivity = ProductivityMode.objects.filter(
            productivitymodeuser__user_id=current_user
        ).annotate(
            future_day_order=Case(
                *[When(selected_day=day, then=Value(idx)) for idx, day in enumerate(day_order)],
                output_field=CharField()
            )
        ).order_by('future_day_order', 'start_time', 'end_time')

        data = []
        for item in productivity:
            data.append({
                'id': item.id,
                'selected_day': item.selected_day,
                'start_time': item.start_time.strftime('%H:%M:%S'),  
                'end_time': item.end_time.strftime('%H:%M:%S')  
            })


        return Response(data, status=status.HTTP_200_OK)








