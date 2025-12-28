import networkx as nx
import osmnx as ox
from optimizer.algorithms.osm_graph import load_yenimahalle_graph


def dijkstra_osm(lat1, lng1, lat2, lng2):
    """
    Gerçek yol ağı üzerinde Dijkstra.
    Leaflet için GERÇEK lat/lng döner.
    """

    # WGS84 grafiği al
    G = load_yenimahalle_graph()

    # Metrik grafiğe çevir (hesap için)
    G_proj = ox.project_graph(G)

    #  En yakın NODE'ları bul (proj graf)
    start_node = ox.nearest_nodes(G_proj, lng1, lat1)
    end_node = ox.nearest_nodes(G_proj, lng2, lat2)

    if start_node == end_node:
        return {"error": "Start and end snapped to same node"}

    #  Dijkstra
    path = nx.shortest_path(
        G_proj,
        start_node,
        end_node,
        weight="length"
    )

    print("PATH LENGTH:", len(path))

    
    # Node ID'ler aynı → koordinatlar WGS84 grafikten alınır
    coordinates = [
        {
            "lat": G.nodes[n]["y"],
            "lng": G.nodes[n]["x"]
        }
        for n in path
    ]

    distance = nx.shortest_path_length(
        G_proj,
        start_node,
        end_node,
        weight="length"
    )

    return {
        "path": coordinates,
        "distance": distance
    }
