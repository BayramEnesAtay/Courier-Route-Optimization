from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from .models import DeliveryPoint
from django.utils import timezone
from datetime import timedelta
from django.db.models import Min, Max
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import math



@login_required
def dashboard(request):
    return render(request, "core/dashboard.html")

@login_required
def routeopt(request):
    return render(request, "core/routeopt.html")

@login_required
def deliverypoints(request):
    
    return render(request, "core/deliverypoints.html")

@login_required
def settings(request):
    return render(request, "core/settings.html")




@csrf_exempt
def delivery_points_api(request):
    """
    GET: Tüm noktaları listele
    POST: Yeni nokta ekle
    """
    if request.method == "GET":
        points = DeliveryPoint.objects.all().order_by("-created_at")
        data = []
        for p in points:
        
            coord_str = f"{p.latitude}, {p.longitude}"
            
            data.append({
                "id": p.id,
                "name": p.name,
                "street": p.address,  
                "city": p.city,
                "coordinates": coord_str,
                "created": p.created_at.strftime("%d.%m.%Y") if p.created_at else "",
            })
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            
            # Koordinatları ayır (React "lat, lon" stringi gönderiyor)
            lat = 0.0
            lon = 0.0
            if "coordinates" in data:
                try:
                    parts = data["coordinates"].split(",")
                    lat = float(parts[0].strip())
                    lon = float(parts[1].strip())
                except:
                    pass # Hata olursa 0,0 kalsın veya random üretilsin

            new_point = DeliveryPoint.objects.create(
                name=data.get("name"),
                address=data.get("street"), # React'ten 'street' geliyor
                city=data.get("city"),
                latitude=lat,
                longitude=lon
            )
            
            return JsonResponse({"status": "success", "id": new_point.id}, status=201)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def delivery_point_detail_api(request, pk):
    """
    PUT: Noktayı güncelle
    DELETE: Noktayı sil
    """
    try:
        point = DeliveryPoint.objects.get(pk=pk)
    except DeliveryPoint.DoesNotExist:
        return JsonResponse({"error": "Point not found"}, status=404)

    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            point.name = data.get("name", point.name)
            point.address = data.get("street", point.address)
            point.city = data.get("city", point.city)
            
            # Koordinat değiştiyse güncelle
            if "coordinates" in data:
                 try:
                    parts = data["coordinates"].split(",")
                    point.latitude = float(parts[0].strip())
                    point.longitude = float(parts[1].strip())
                 except:
                    pass
            
            point.save()
            return JsonResponse({"status": "success"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    elif request.method == "DELETE":
        point.delete()
        return JsonResponse({"status": "deleted"}, status=200)

    return JsonResponse({"error": "Method not allowed"}, status=405)


def calculate_distance(coord1, coord2):
    R = 6371  # Dünya yarıçapı (km)
    lat1, lon1 = math.radians(coord1[0]), math.radians(coord1[1])
    lat2, lon2 = math.radians(coord2[0]), math.radians(coord2[1])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def solve_tsp_algorithm(points):
    # points: [{'lat': x, 'lng': y, 'id': 1}, ...]
    if not points:
        return []

    current_point = points[0]
    unvisited = points[1:]
    path = [current_point]

    while unvisited:
        nearest_point = None
        min_dist = float("inf")

        for point in unvisited:
            dist = calculate_distance(
                (current_point["lat"], current_point["lng"]),
                (point["lat"], point["lng"]),
            )
            if dist < min_dist:
                min_dist = dist
                nearest_point = point

        if nearest_point:
            path.append(nearest_point)
            unvisited.remove(nearest_point)
            current_point = nearest_point

    return path

@csrf_exempt
def api_calculate_route(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            points = data.get("points", [])
            sorted_points = solve_tsp_algorithm(points)
            return JsonResponse({"status": "success", "sorted_points": sorted_points})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    return JsonResponse({"status": "error"}, status=400)