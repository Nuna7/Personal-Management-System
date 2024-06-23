from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, LoginSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserCreateView(generics.CreateAPIView):
    """
    View to handle user registration.
    """
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            username = request.data.get('username')
            if User.objects.filter(username=username).exists():
                return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)
            
            user = serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    """
    View to handle user login.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)

            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            return Response({
                "access": str(access),
                "refresh": str(refresh)
            }, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)