from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient,APITestCase
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch

User = get_user_model()

class ExternalServicesTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass123',
                                            first_name="testfirstname", last_name="testsecondname")
        self.client.force_authenticate(user=self.user)

    @patch('external_services.views.requests.get')
    def test_quote(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.text = '[{"quote": "Test Quote", "author": "Test Author"}]'

        url = reverse('quote')  # Ensure this matches the correct URL pattern
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('quote', response.data)
        self.assertIn('author', response.data)
