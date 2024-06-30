from rest_framework import serializers
from .models import WaterConsumption, CalorieIntake, Expense, ProductivityMode, Goal, Task

class WaterConsumptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterConsumption
        fields = ['id', 'amount', 'date']

    def create(self, validated_data):
        waterconsumption = WaterConsumption.objects.create(**validated_data)
        return waterconsumption

class CalorieIntakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalorieIntake
        fields = ['id', 'food_item', 'calories', 'date', 'meal_type']

    def create(self, validated_data):
        calorie_intake = CalorieIntake.objects.create(**validated_data)
        return calorie_intake

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id','amount','description','category','date']

    def create(self,data):
        expense = Expense.objects.create(**data)
        return expense


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id','title','description','start_date','end_date','priority','status']

    def create(self,data):
        goal = Goal.objects.create(**data)
        return goal

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class Productivity(serializers.ModelSerializer):
    class Meta:
        model = ProductivityMode
        fields = ['id', 'start_time', 'end_time', 'selected_day']

    def create(self, data):
        productivity = ProductivityMode.objects.create(**data)
        return productivity

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'priority', 'status']

    def create(self, data):
        task = Task.objects.create(**data)
        return task

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance



