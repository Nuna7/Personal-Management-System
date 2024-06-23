from django.db import models
from api.models import User
from django.contrib.postgres.fields import ArrayField

def get_meal_type():
    return [(i, i) for i in ['breakfast', 'dinner', 'lunch', 'snack']]

class WaterConsumption(models.Model):
    """
    Represents a water consumption record.

    Fields:
    - amount: Integer field for the amount of water consumed
    - date: Date field for when the water was consumed
    """
    amount = models.IntegerField(db_column='amount')
    date = models.DateField(db_column='date')

    class Meta:
        db_table = 'WATERCONSUMPTION'

    def __str__(self):
        return self.amount + " at " + self.date


class WaterUser(models.Model):
    """
    Links a user to their water consumption records.

    Fields:
    - user_id: ForeignKey to User model
    - waterconsumption_id: ForeignKey to WaterConsumption model
    """
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id', related_name='water_users')
    waterconsumption_id = models.ForeignKey(WaterConsumption, on_delete=models.CASCADE, db_column='waterconsumption_id', related_name='water_users')

    class Meta:
        db_table = 'USER_WATER'


class CalorieIntake(models.Model):
    """
    Represents a calorie consumption record.

    Fields:
    - food_item: Character field for the food consumed
    - date: Date field for when the calorie was consumed
    - calories: Integer field for the amount of calorie consumed
    - meal_type: Character field for the meal type.
    """
    food_item = models.CharField(max_length=40, db_column='food_item')
    calories = models.IntegerField(db_column='calories')
    date = models.DateField(db_column='date')
    meal_type = models.CharField(max_length=10, choices=get_meal_type(),db_column='meal_type')

    class Meta:
        db_table = 'CALORIEINTAKE'
    
    def __str__(self):
        return self.food_item + " " + self.calories + " " + self.date + " " + self.meal_type

class CalorieUser(models.Model):
    """
    Links a user to their caloire consumption records.

    Fields:
    - user_id: ForeignKey to User model
    - calorieintake_id: ForeignKey to CalorieIntake model
    """
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,db_column='user_id')
    calorieintake_id = models.ForeignKey(CalorieIntake, on_delete=models.CASCADE, db_column='calorieintake_id')

    class Meta:
        db_table = 'USER_CALORIE'

class Expense(models.Model):
    """
    Represents a expense consumption record.

    Fields:
    - amount: Integer field for the amount of expense consumed
    - date: Date field for when the expense was consumed
    - description: Text field for the description of the expense consumed
    - category: Character field for the type of expense
    """
    amount = models.IntegerField(db_column='amount')
    description = models.TextField(db_column='description')
    category = models.CharField(max_length=30,db_column='category')
    date = models.DateField(db_column='date')

    class Meta:
        db_table = 'EXPENSE'
    
    def __str__(self):
        return self.amount + " " + self.description + " " + self.category + " " + self.date

class ExpenseUser(models.Model):
    """
    Links a user to their expense records.

    Fields:
    - user_id: ForeignKey to User model
    - expense_id: ForeignKey to Expense model
    """
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    expense_id = models.ForeignKey(Expense, on_delete=models.CASCADE, db_column='expense_id')

    class Meta:
        db_table = 'USER_EXPENSE'


class Goal(models.Model):
    """
    Represents a goal consumption record.

    Fields:
    - title: Character field for the title of the goal
    - description: Text field for the description of the goal
    - start_date: Date field for the starting date of the goal
    - end_date: Date field for the estimated ending date of the goal
    - priority: Character field to express the urgency of the goal
    - status: Character field for the current status of the goal
    """
    title = models.CharField(max_length=50, db_column='title')
    description = models.TextField(db_column='description')
    start_date = models.DateField(db_column='start_date')
    end_date = models.DateField(db_column='end_date')
    priority = models.CharField(max_length=15, db_column='priority')
    status = models.CharField(max_length=15, db_column='status')

    class Meta:
        db_table = 'GOAL'

class GoalUser(models.Model):
    """
    Links a user to their goal records.

    Fields:
    - user_id: ForeignKey to User model
    - goal_id: ForeignKey to Goal model
    """
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    goal_id = models.ForeignKey(Goal, on_delete=models.CASCADE, db_column='goal_id')

    class Meta:
        db_table = 'USER_GOAL'

class ProductivityMode(models.Model):
    """
    Represents a productivity consumption record.

    Fields:
    - start_time: Date field for the starting time of the productivity
    - end_time: Date field for the ending time of the productivity
    - selected_day: Character field for the selected day for the productivity
    """
    start_time = models.TimeField(db_column='start_time')
    end_time = models.TimeField(db_column='end_time')
    selected_day = models.CharField(db_column="selected_day")

    class Meta:
        db_table = 'PRODUCTIVITY_MODE'

class ProductivityModeUser(models.Model):
    """
    Links a user to their Productivity records.

    Fields:
    - user_id: ForeignKey to User model
    - productivity_id: ForeignKey to Productivity model
    """
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    productivity_id = models.ForeignKey(ProductivityMode, on_delete=models.CASCADE, db_column='productivity_id')

    class Meta:
        db_table = 'USER_PRODUCTIVITY'


class Task(models.Model):
    """
    Represents a user task.

    Fields:
    - title: CharField for the task title
    - description: TextField for task description
    - priority: CharField for task priority
    - status: CharField for task status
    """
    title = models.CharField(max_length=50, db_column='title')
    description = models.TextField(db_column='description')
    priority = models.CharField(max_length=15, db_column='priority')
    status = models.CharField(max_length=15, db_column='status')

    class Meta:
        db_table = "TASK"

class TaskUser(models.Model):
    """
    Links a user to their tasks.

    Fields:
    - user_id: ForeignKey to User model
    - task_id: ForeignKey to Task model
    """
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, db_column='user_id')
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE, db_column='task_id')

    class Meta:
        db_table = 'USER_TASK'    

