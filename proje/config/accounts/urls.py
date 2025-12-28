from django.urls import path
from .views import signup_view
# Token işlemleri için hazır kütüphaneyi çağırıyoruz
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = "accounts"

urlpatterns = [
    # React Login buraya istek atacak (Token verir)
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    
    # React Signup buraya istek atacak (Kullanıcı oluşturur)
    path("signup/", signup_view, name="signup"),
]