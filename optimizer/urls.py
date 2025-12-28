from django.urls import path
from .views import test_api, optimize_greedy, optimize_dijkstra, route_osm

urlpatterns = [
    path("test/", test_api),
    path("greedy/", optimize_greedy),
    path("dijkstra/", optimize_dijkstra),
    path("route/osm/", route_osm),
]