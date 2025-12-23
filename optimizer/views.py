from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import networkx as nx
import osmnx as ox

# Algoritmalar
from .algorithms.dijkstra import dijkstra 
from .algorithms.greedy import greedy_route
from .algorithms.a_star import a_star_path # <-- Yeni Pathfinding A* importu
from .algorithms.osm_graph import load_yenimahalle_graph

@csrf_exempt
def route_osm(request):
    """
    Sıralama: DAİMA GREEDY (Arka planda)
    Yol Çizme: Kullanıcı seçimine göre DIJKSTRA veya A*
    """
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    try:
        data = json.loads(request.body)
        points = data.get("points", [])
        # Dropdown'dan gelen seçim: "dijkstra" veya "astar"
        algo_choice = data.get("algorithm", "dijkstra") 

        if not points or len(points) < 2:
            return JsonResponse({"error": "En az 2 nokta gerekli"}, status=400)

        G = load_yenimahalle_graph()

        # 1. Adaptör: OSM Graph -> Senin Sözlük Yapın
        custom_graph_dict = {}
        # 2. A* İçin Koordinat Sözlüğü Hazırla (Heuristic hesabı için lazım)
        node_coords = {} 
        
        # Graph verilerini hazırla
        for u, data in G.nodes(data=True):
            node_coords[str(u)] = {'x': data['x'], 'y': data['y']}

        for u, v, edge_data in G.edges(data=True):
            u_str, v_str = str(u), str(v)
            length = edge_data.get("length", 1)
            
            if u_str not in custom_graph_dict: custom_graph_dict[u_str] = {}
            if v_str not in custom_graph_dict: custom_graph_dict[v_str] = {}
            
            custom_graph_dict[u_str][v_str] = length

        # Noktaları temizle
        clean_points = [
            {"id": p.get("id"), "lat": float(p["lat"]), "lng": float(p["lng"]), "name": p.get("name")} 
            for p in points
        ]

        # -----------------------------------------------------------
        # ADIM 1: DURAK SIRALAMA (DAİMA GREEDY)
        # -----------------------------------------------------------
        try:
            # Arka planda hep Greedy çalışır ve en mantıklı sırayı bulur
            sorted_stops = greedy_route(clean_points[0], clean_points[1:])
            ordered_points = [clean_points[0]] + sorted_stops
            if not sorted_stops: ordered_points = clean_points
        except Exception as e:
            print(f"Sıralama Hatası: {e}")
            ordered_points = clean_points

        # -----------------------------------------------------------
        # ADIM 2: YOL ÇİZME (PATHFINDING - SEÇİMLİ)
        # -----------------------------------------------------------
        full_path_coords = []
        total_distance = 0

        for i in range(len(ordered_points) - 1):
            n1 = ox.nearest_nodes(G, float(ordered_points[i]["lng"]), float(ordered_points[i]["lat"]))
            n2 = ox.nearest_nodes(G, float(ordered_points[i+1]["lng"]), float(ordered_points[i+1]["lat"]))
            
            if n1 == n2: continue

            # Kullanıcı ne seçtiyse o algoritmayı çalıştır
            if algo_choice == "astar":
                # A* Algoritması (Koordinatları da gönderiyoruz)
                path_ids, segment_dist = a_star_path(custom_graph_dict, str(n1), str(n2), node_coords)
            else:
                # Dijkstra Algoritması (Varsayılan)
                path_ids, segment_dist = dijkstra(custom_graph_dict, str(n1), str(n2))

            if not path_ids or segment_dist == float("inf"): continue

            for node_id_str in path_ids:
                nid = int(node_id_str)
                full_path_coords.append({
                    "lat": G.nodes[nid]["y"],
                    "lng": G.nodes[nid]["x"]
                })
            total_distance += segment_dist

        return JsonResponse({
            "status": "success",
            "path": full_path_coords,
            "total_distance": round(total_distance, 2),
            "ordered_points": ordered_points,
            "used_algorithm": algo_choice # Bilgi amaçlı geri dönüyoruz
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def optimize_greedy(request): return route_osm(request)
@csrf_exempt
def optimize_dijkstra(request): return route_osm(request)
def test_api(request): return JsonResponse({"status": "OK"})