from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import WaterConsumption, CalorieIntake, Expense, Goal, Task

User = get_user_model()

class InternalServicesTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123', 
                                            first_name="testfirstname", last_name="testsecondname")
        self.client.force_authenticate(user=self.user)

    def test_water_create(self):
        url = reverse('water')
        data = {'amount': 500, 'date': '2023-06-22'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(WaterConsumption.objects.count(), 1)

    def test_calorie_create(self):
        url = reverse('calorie')
        data = {'food_item': 'Apple', 'calories': 95, 'date': '2023-06-22', 'meal_type': 'snack'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CalorieIntake.objects.count(), 1)

    def test_expense_create(self):
        url = reverse('expense')
        data = {'amount': 50, 'description': 'Groceries', 'category': 'food', 'date': '2023-06-22'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Expense.objects.count(), 1)

    def test_analytics(self):
        url = reverse('home_plot')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('consumption_per_month', response.data)
        self.assertIn('calories_per_month', response.data)
        self.assertIn('expense_per_month', response.data)
