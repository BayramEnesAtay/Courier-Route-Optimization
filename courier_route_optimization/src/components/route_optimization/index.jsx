import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const createNumberedIcon = (number, color = "#1a73e8") => {
  return L.divIcon({
    html: `<div style="background-color:${color};color:white;width:30px;height:30px;border-radius:50%;border:2px solid white;display:flex;align-items:center;justify-content:center;font-weight:bold;box-shadow:0 2px 5px rgba(0,0,0,0.3);">${number}</div>`,
    className: "custom-number-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coords, map]);
  return null;
}

const RouteOptimizationPage = () => {
  const [points, setPoints] = useState([
    { id: 1, name: "Depo (Başlangıç)", lat: 39.9667, lng: 32.8167 }
  ]);
  const [newPoint, setNewPoint] = useState({ name: "", lat: "", lng: "" });
  
  // Dropdown için State: 'dijkstra' veya 'astar'
  const [algorithm, setAlgorithm] = useState("dijkstra");
  
  const [routeLine, setRouteLine] = useState([]);
  const [stats, setStats] = useState({ dist: 0 });
  const [loading, setLoading] = useState(false);

  const addPoint = () => {
    if (!newPoint.name || !newPoint.lat || !newPoint.lng) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    const point = {
      id: Date.now(),
      name: newPoint.name,
      lat: parseFloat(newPoint.lat),
      lng: parseFloat(newPoint.lng)
    };
    setPoints([...points, point]);
    setNewPoint({ name: "", lat: "", lng: "" });
  };

  const handleOptimize = async () => {
    if (points.length < 2) return alert("En az 2 nokta eklemelisiniz.");
    
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/route/osm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          points: points,
          algorithm: algorithm // Seçilen yol bulma algoritmasını gönder
        }),
      });
      
      const data = await res.json();
      
      if (data.path) {
        const formattedPath = data.path.map(p => [p.lat, p.lng]);
        setRouteLine(formattedPath);
        setStats({ dist: data.total_distance });

        // Backend'in Greedy ile sıraladığı listeyi güncelle
        if (data.ordered_points) {
          setPoints(data.ordered_points);
        }
      } else {
        alert("Hata: " + (data.error || "Rota hesaplanamadı"));
      }
    } catch (err) {
      console.error("Fetch hatası:", err);
      alert("Backend sunucusuna bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* SOL PANEL */}
      <div style={{ width: "350px", padding: "20px", background: "#f4f4f4", overflowY: "auto" }}>
        <h2 style={{ color: "#1a73e8" }}>🚚 Kurye Rota</h2>
        
        <div style={cardStyle}>
          <h4>📍 Yeni Durak Ekle</h4>
          <input placeholder="Durak Adı" value={newPoint.name} onChange={e => setNewPoint({...newPoint, name: e.target.value})} style={inputStyle} />
          <input placeholder="Enlem (Lat)" type="number" value={newPoint.lat} onChange={e => setNewPoint({...newPoint, lat: e.target.value})} style={inputStyle} />
          <input placeholder="Boylam (Lng)" type="number" value={newPoint.lng} onChange={e => setNewPoint({...newPoint, lng: e.target.value})} style={inputStyle} />
          <button onClick={addPoint} style={btnStyle}>Listeye Ekle</button>
        </div>

        <div style={cardStyle}>
          <h4>Yol Hesaplama Yöntemi</h4>
          <p style={{fontSize: "12px", color: "#666", marginBottom: "8px"}}>
            (Durak sıralaması otomatik optimize edilir)
          </p>
          
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            style={{...inputStyle, cursor: "pointer", background: "white"}}
          >
            <option value="dijkstra">Dijkstra (Standart En Kısa Yol)</option>
            <option value="astar">A* (A-Star / Heuristic)</option>
          </select>

          <button onClick={handleOptimize} disabled={loading} style={{...btnStyle, background: loading ? "#ccc" : "#2ecc71"}}>
            {loading ? "Hesaplanıyor..." : "Rotayı Hesapla"}
          </button>
        </div>

        <div style={cardStyle}>
          <h4>Durak Sırası ({points.length})</h4>
          {points.map((p, idx) => (
            <div key={p.id} style={{ fontSize: "13px", borderBottom: "1px solid #ddd", padding: "8px 0" }}>
              <strong>{idx + 1}. {p.name}</strong> 
              <br/><span style={{color:"#777", fontSize:"11px"}}>({p.lat.toFixed(4)}, {p.lng.toFixed(4)})</span>
            </div>
          ))}
          {stats.dist > 0 && <p style={{marginTop: "10px"}}><strong>Toplam Mesafe:</strong> {(stats.dist/1000).toFixed(2)} km</p>}
        </div>
      </div>

      {/* HARİTA ALANI */}
      <div style={{ flex: 1 }}>
        <MapContainer center={[39.9667, 32.8167]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
          
          {points.map((p, idx) => (
            <Marker 
              key={p.id} 
              position={[p.lat, p.lng]}
              icon={createNumberedIcon(idx + 1, idx === 0 ? "#e74c3c" : "#1a73e8")}
            >
              <Popup><b>{idx + 1}. {p.name}</b></Popup>
            </Marker>
          ))}

          {routeLine.length > 0 && (
            <Polyline positions={routeLine} pathOptions={{ color: "blue", weight: 5 }} />
          )}
          
          <RecenterMap coords={routeLine} />
        </MapContainer>
      </div>
    </div>
  );
};

// Stiller
const cardStyle = { background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "15px", border: "1px solid #ddd" };
const inputStyle = { width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" };
const btnStyle = { width: "100%", padding: "10px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" };

export default RouteOptimizationPage;