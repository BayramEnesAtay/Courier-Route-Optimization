import heapq

def dijkstra(graph, start, end):
    """
    graph: {
        "0": {"1": 4, "2": 2},
        "1": {"2": 5, "3": 10},
        ...
    }
    start, end: string
    """

    # Güvenlik: start / end graph içinde yoksa
    if start not in graph or end not in graph:
        return [], float("inf")

    distances = {node: float("inf") for node in graph}
    previous = {node: None for node in graph}

    distances[start] = 0
    pq = [(0, start)]

    while pq:
        current_distance, current_node = heapq.heappop(pq)

        if current_node == end:
            break

        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight

            if distance < distances.get(neighbor, float("inf")):
                distances[neighbor] = distance
                previous[neighbor] = current_node
                heapq.heappush(pq, (distance, neighbor))

    # Eğer hedefe ulaşılamıyorsa
    if distances[end] == float("inf"):
        return [], float("inf")

    # Path oluşturma (sonsuz döngü KORUMALI)
    path = []
    node = end
    visited = set()

    while node is not None:
        if node in visited:
            break
        visited.add(node)
        path.insert(0, node)
        node = previous[node]

    return path, distances[end]
