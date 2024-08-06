from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views
urlpatterns=[
    path('login',views.login),
    path('logout',views.logout),
    path('signup',views.signup),
    path('verify',views.verify_otp),
    path('token/refresh', jwt_views.TokenRefreshView.as_view()),
    path('token/verify', jwt_views.TokenVerifyView.as_view()),
    path('user',views.get_user),
]