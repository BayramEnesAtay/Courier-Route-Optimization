from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    # --- HTML SAYFALARI (React Uygulamasının Görüntülendiği Yerler) ---
    path("", views.dashboard, name="dashboard"),
    path("routeopt/", views.routeopt, name="routeopt"),
    path("deliverypoints/", views.deliverypoints, name="deliverypoints"),
    path("settings/", views.settings, name="settings"),
    
    # --- API ENDPOINTS (React'in Veri Çekip Gönderdiği Yerler) ---
    
    # GET (Listeleme) ve POST (Ekleme) için:
    path("api/delivery-points/", views.delivery_points_api, name="api_delivery_points"),

    # PUT (Güncelleme) ve DELETE (Silme) için (ID gerektirir):
    path("api/delivery-points/<int:pk>/", views.delivery_point_detail_api, name="api_delivery_point_detail"),

    # Rota Hesaplama Algoritması için:
    path("api/calculate-route/", views.api_calculate_route, name="api_calculate_route"),
]