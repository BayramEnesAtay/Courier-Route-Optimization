import math

def distance(p1, p2):
    """
    İki nokta arasındaki Öklid mesafesi (Pisagor).
    p1 ve p2 sözlük formatındadır: {'lat': 39.9, 'lng': 32.8}
    """
   
    lat_diff = p1['lat'] - p2['lat']
    lng_diff = p1['lng'] - p2['lng']
    return math.sqrt(lat_diff**2 + lng_diff**2)

def greedy_route(start_point, other_points):
    """
    Greedy (En Yakın Komşu) Algoritması
    """
    # Orijinal listeyi bozmamak için kopyasını al
    remaining = other_points.copy()
    
    current_node = start_point
    sorted_route = []

    while remaining:
        # Mevcut konuma (current_node) en yakın olan noktayı bul
        nearest = min(
            remaining,
            key=lambda p: distance(current_node, p)
        )

        sorted_route.append(nearest)
        
        # Kurye artık burada, yeni merkez burası
        current_node = nearest
        
        # Gidilen noktayı listeden sil
        remaining.remove(nearest)

    return sorted_route