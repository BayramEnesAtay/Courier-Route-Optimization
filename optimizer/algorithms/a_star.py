import heapq
import math

def heuristic(node_id, target_id, node_coords):
    """
    Manhattan veya Öklid mesafesi ile tahmini maliyet (Heuristic) hesaplar.
    node_coords: {'node_id': {'x': lng, 'y': lat}, ...}
    """
    if node_id not in node_coords or target_id not in node_coords:
        return 0
    
    x1, y1 = node_coords[node_id]['x'], node_coords[node_id]['y']
    x2, y2 = node_coords[target_id]['x'], node_coords[target_id]['y']
    
    # Öklid Mesafesi (Kuş uçuşu)
    return math.sqrt((x1 - x2)**2 + (y1 - y2)**2)

def a_star_path(graph, start, end, node_coords):
    """
    A* (A-Star) Yol Bulma Algoritması
    graph: {'u': {'v': weight}, ...}
    start: Başlangıç Node ID (str)
    end: Hedef Node ID (str)
    node_coords: Koordinat sözlüğü (Heuristic için gerekli)
    """
    # Öncelik Kuyruğu: (Tahmini Toplam Maliyet, O anki Maliyet, Düğüm)
    # f(n) = g(n) + h(n)
    queue = [(0, 0, start)]
    
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    previous_nodes = {node: None for node in graph}
    
    while queue:
        estimated_total, current_dist, current_node = heapq.heappop(queue)
        
        if current_node == end:
            break # Hedefe ulaştık
            
        if current_dist > distances[current_node]:
            continue
        
        for neighbor, weight in graph.get(current_node, {}).items():
            new_dist = current_dist + weight
            
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                previous_nodes[neighbor] = current_node
                
                # Heuristic eklenmiş maliyet (f = g + h)
                h_score = heuristic(neighbor, end, node_coords)
                priority = new_dist + h_score
                
                heapq.heappush(queue, (priority, new_dist, neighbor))
    
    # Yolu geriye doğru oluştur
    path = []
    current = end
    if distances[end] == float('inf'):
        return [], float('inf') # Yol bulunamadı
        
    while current is not None:
        path.append(current)
        current = previous_nodes[current]
        
    return path[::-1], distances[end]