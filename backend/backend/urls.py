from django.urls import path
from .views import SignupView, LoginView,UserProfileView,UserProfileEditView,CombinedView
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.contrib import admin


urlpatterns = [
    path('api/user/login', LoginView.as_view(), name='login'),
    path('api/user/signup', SignupView.as_view(), name='signup'),
    path('api/user/profile/<str:email>', UserProfileView.as_view(), name='profile'),
    path('api/user/profile/edit/<str:email>', UserProfileEditView.as_view(), name='profile_edit'),
    path('api/combined/<str:email>/<str:product_name>', CombinedView.as_view(), name='combined_view'),
  
]
