import osmnx as ox

GRAPH = None

def load_yenimahalle_graph():
    global GRAPH

    if GRAPH is None:
        print("Loading Yenimahalle OSM graph (WGS84)...")
        GRAPH = ox.graph_from_place(
            "Yenimahalle, Ankara, Turkey",
            network_type="drive",
            simplify=True
        )

    return GRAPH
