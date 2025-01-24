
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer,UserProfileSerializer
from django.contrib.auth.hashers import check_password 
from .models import User
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from bson.objectid import ObjectId
from pymongo import MongoClient
import json 
from django.core.serializers import serialize
from django.contrib.auth.hashers import check_password


class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
         serializer.save()
         return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print(password)
        user = authenticate(request, username=email, password=password)
        print(user)

        if user is not None:
            serializer = UserSerializer(user)

            return JsonResponse({
                'message': 'Login successful',
                'email': user.email  
            }, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserProfileView(APIView):
    def get(self, request, email):
        try:
            user = User.objects.get(email=email)
            return JsonResponse({
                'status': 'success',
                'message': f'Profile found for {email}',
                'data': {
                    'username': user.username,
                    'email': user.email,
                    'phone_number': user.phone_number,
                    'age': user.age,
                    'city': user.city,
                    'gender': user.gender,
                    'allergies': user.allergies,
                    'diseases': user.diseases,
                    'height': user.height,
                    'weight': user.weight
                }
            })
        except User.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User not found.'})

class UserProfileEditView(APIView):
    def patch(self, request, email):
        try:
            user = User.objects.get(email=email)
            serializer = UserProfileSerializer(user, data=request.data, partial=True)  
            if serializer.is_valid():
                serializer.save()  
                return JsonResponse({
                    'status': 'success',
                    'message': 'Profile updated successfully.',
                    'data': serializer.data
                })
            return JsonResponse({'status': 'error', 'message': 'Invalid data.', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        except User.DoesNotExist:
            raise NotFound(detail="User not found.", code=status.HTTP_404_NOT_FOUND) 
        

