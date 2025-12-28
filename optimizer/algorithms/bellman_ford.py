def bellman_ford(graph, start, end):
    """
    Bellman-Ford Algoritması
    Mantığı: Tüm kenarları (V-1) kez gezerek gevşetme (relaxation) yapar.
    Karmaşıklık: O(V * E) -> Bu yüzden Dijkstra'dan çok daha yavaştır.
    """
    
    # 1. Başlangıç (Initialization)
    # Mesafe tablosunu sonsuz yap
    distances = {node: float('inf') for node in graph}
    predecessors = {node: None for node in graph}
    distances[start] = 0

    # Graf üzerindeki düğüm listesi
    nodes = list(graph.keys())
    
    # 2. Gevşetme (Relaxation)
    # Düğüm sayısı kadar döngü kurar (Çok maliyetli kısım burası)
    for _ in range(len(nodes) - 1):
        changed = False
        for u in nodes:
            # Eğer u düğümüne henüz ulaşılamadıysa atla
            if distances[u] == float('inf'):
                continue
            
            # Komşuları kontrol et
            for v, weight in graph[u].items():
                if distances[u] + weight < distances[v]:
                    distances[v] = distances[u] + weight
                    predecessors[v] = u
                    changed = True
        
        # Optimizasyon: Eğer bir tur boyunca hiçbir mesafe kısalmadıysa, erken bitir.
        if not changed:
            break

    # 3. Rotayı Geri Çizme (Path Reconstruction)
    path = []
    
    # Eğer hedefe ulaşılamadıysa
    if distances[end] == float('inf'):
        return [], float('inf')

    # Sondan başa doğru gel
    current = end
    while current is not None:
        path.insert(0, current)
        current = predecessors[current]
        
        # Sonsuz döngü koruması (Start'a ulaştıysak dur)
        if current == end: 
            break 
            
    return path, distances[end]