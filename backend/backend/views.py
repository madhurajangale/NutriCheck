
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
from django.http import JsonResponse
from django.views import View
import requests

from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json

def get_bmi_category(bmi):
    if bmi < 18.5:
        return "Underweight"
    elif 18.5 <= bmi < 25:
        return "Normal weight"
    elif 25 <= bmi < 30:
        return "Overweight"
    else:
        return "Obese"

def evaluate_product_suitability(bmi_category, nutrients):
    if not nutrients:
        return "No nutrient data available"
    if bmi_category == "Underweight":
        if nutrients.get("energy-kcal_100g", 0) > 200:
            return "Suitable"
        return "Not suitable"
    elif bmi_category in ["Overweight", "Obese"]:
        if nutrients.get("fat_100g", 0) < 3 and nutrients.get("sugars_100g", 0) < 5:
            return "Suitable"
        return "Not suitable"
    else:
        return "Neutral"

def search_product_by_name(product_name):
    import requests
    url = f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={product_name}&search_simple=1&action=process&json=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data.get("products"):
            return data["products"]
    return None

class CombinedView(View):
    def get(self, request, email, product_name="Nutella"):
        try:
            if not email:
                return JsonResponse({"status": "error", "message": "Email is required."}, status=400)
            try:

                print(email)
                user = User.objects.get(email=email)
                print(user)
            except User.DoesNotExist:
                return JsonResponse({"status": "error", "message": "User not found."}, status=404)

            user_data = {
                'username': user.username,
                'email': user.email,
                'phone_number': user.phone_number,
                'age': user.age,
                'city': user.city,
                'gender': user.gender,
                'allergies': user.allergies,
                'diseases': user.diseases,
                'height': user.height,
                'weight': user.weight,
            }
            height = user.height  
            weight = user.weight 
            bmi = weight / ((height / 100) ** 2)
            bmi_category = get_bmi_category(bmi)

            products = search_product_by_name(product_name)
            if not products:
                return JsonResponse({"status": "error", "message": "No product found for the given name."}, status=404)

            product = products[0]
            nutrients = product.get("nutriments", {})
            suitability = evaluate_product_suitability(bmi_category, nutrients)

            return JsonResponse({
                "status": "success",
                "user_profile": {
                    **user_data,
                    "bmi": round(bmi, 2),
                    "bmi_category": bmi_category,
                },
                "product_info": {
                    "product_name": product.get("product_name", "N/A"),
                    "brand": product.get("brands", "N/A"),
                    "nutri_score": product.get("nutriscore_grade", "N/A").upper(),
                    "suitability": suitability,
                },
            })

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

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
            print(User.objects.get(email=email))
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
        

