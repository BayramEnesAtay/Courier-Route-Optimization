import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
<<<<<<< Updated upstream

=======
import { FiList, FiPlus, FiX, FiCheck } from "react-icons/fi"; 

// --- APIS ---
const DB_API_URL = "http://127.0.0.1:8000/api/delivery-points/"; 
const ROUTE_API_URL = "http://127.0.0.1:8001/api/route/osm/";

// İkon Ayarları
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
  // --- STATE'LER ---
>>>>>>> Stashed changes
  const [points, setPoints] = useState([
    { id: 1, name: "Depo (Başlangıç)", lat: 39.9667, lng: 32.8167 }
  ]);
  const [newPoint, setNewPoint] = useState({ name: "", lat: "", lng: "" });
<<<<<<< Updated upstream
  
  // Dropdown için State: 'dijkstra' veya 'astar'
  const [algorithm, setAlgorithm] = useState("dijkstra");
  
=======
  const [algorithm, setAlgorithm] = useState("dijkstra");
>>>>>>> Stashed changes
  const [routeLine, setRouteLine] = useState([]);
  const [stats, setStats] = useState({ dist: 0 });
  const [loading, setLoading] = useState(false);

<<<<<<< Updated upstream
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
=======
  const [dbPoints, setDbPoints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Veritabanından verileri çek
  useEffect(() => {
    const fetchDbPoints = async () => {
        try {
            const res = await fetch(DB_API_URL);
            if (res.ok) {
                const data = await res.json();
                setDbPoints(data);
            }
        } catch (error) {
            console.error("Veritabanına bağlanılamadı:", error);
        }
    };
    fetchDbPoints();
  }, []);
>>>>>>> Stashed changes

  const addFromDb = (dbPoint) => {
    let lat = 0, lng = 0;
    if (typeof dbPoint.coordinates === 'string' && dbPoint.coordinates.includes(',')) {
        const parts = dbPoint.coordinates.split(',');
        lat = parseFloat(parts[0]);
        lng = parseFloat(parts[1]);
    } else {
        lat = dbPoint.latitude || 0;
        lng = dbPoint.longitude || 0;
    }

    if (lat === 0 && lng === 0) {
        alert("Bu müşterinin koordinatları eksik!");
        return;
    }

    const point = {
        id: Date.now() + Math.random(),
        name: dbPoint.name,
        lat: lat,
        lng: lng
    };

    setPoints([...points, point]);
    alert(`${dbPoint.name} rotaya eklendi.`);
  };

  // --- BURASI GÜNCELLENDİ: Hem Haritaya Hem Veritabanına Ekleme ---
  const addManualPoint = async () => {
    // 1. Validasyon
    if (!newPoint.name || !newPoint.lat || !newPoint.lng) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    // 2. Backend'e gönderilecek veri objesi
    // Manuel eklemede Adres ve Şehir kutusu olmadığı için otomatik dolduruyoruz.
    const pointDataForBackend = {
        name: newPoint.name,
        street: "Haritadan Eklendi", // Placeholder adres
        city: "Ankara",              // Placeholder şehir
        coordinates: `${newPoint.lat}, ${newPoint.lng}` // Format: "Enlem, Boylam"
    };

    try {
        // 3. Backend'e POST isteği at
        const res = await fetch(DB_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pointDataForBackend)
        });

        if (res.ok) {
            const savedPoint = await res.json(); // Backend'den kaydedilen veriyi (ID dahil) al
            
            // 4. Haritaya (Local State) Ekle
            const pointForMap = {
                id: savedPoint.id, // Veritabanındaki gerçek ID'yi kullanıyoruz
                name: newPoint.name,
                lat: parseFloat(newPoint.lat),
                lng: parseFloat(newPoint.lng)
            };
            setPoints([...points, pointForMap]);

            // 5. Modal Listesini (dbPoints) Güncelle (Sayfayı yenilemeden listede görünsün)
            // Backend'den gelen veri yapısını frontend listesine uyarlıyoruz
            setDbPoints(prev => [savedPoint, ...prev]);

            // 6. Formu Temizle
            setNewPoint({ name: "", lat: "", lng: "" });
            alert("Nokta başarıyla kaydedildi ve rotaya eklendi!");
        } else {
            alert("Veritabanına kaydedilirken bir hata oluştu.");
        }
    } catch (error) {
        console.error("Kayıt hatası:", error);
        alert("Sunucuya bağlanılamadı.");
    }
  };
  // -----------------------------------------------------------

  const handleOptimize = async () => {
    if (points.length < 2) return alert("En az 2 nokta eklemelisiniz.");
    const token = localStorage.getItem("access_token") || ""; 

    setLoading(true);
    try {
      const res = await fetch(ROUTE_API_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          points: points,
          algorithm: algorithm 
        }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.path) { 
        const formattedPath = data.path.map(p => [p.lat, p.lng]);
        setRouteLine(formattedPath);
        setStats({ dist: data.total_distance });

        if (data.ordered_points) {
          setPoints(data.ordered_points);
        }
      } else {
        alert("Hata: " + (data.error || "Rota hesaplanamadı."));
      }
    } catch (err) {
      console.error("Fetch hatası:", err);
      alert("Rota servisine (8001) bağlanılamadı.");
    } finally {
      setLoading(false);
    }
  };

  const removePoint = (id) => {
      setPoints(points.filter(p => p.id !== id));
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* SOL PANEL */}
<<<<<<< Updated upstream
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

=======
      <div style={{ width: "350px", padding: "20px", background: "#f4f4f4", overflowY: "auto", display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 style={{ color: "#1a73e8", margin: 0 }}>🚚 Kurye Rota</h2>
        
        <div style={{...cardStyle, borderLeft: "5px solid #1a73e8"}}>
            <h4 style={{marginTop:0}}>📋 Hızlı Ekle</h4>
            <button 
                onClick={() => setIsModalOpen(true)}
                style={{...btnStyle, background: "#8e44ad", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}
            >
                <FiList /> Kayıtlı Müşterilerden Seç
            </button>
        </div>

        <div style={cardStyle}>
          <h4 style={{marginTop:0}}>📍 Manuel Durak Ekle</h4>
          <p style={{fontSize:'11px', color:'#666', marginBottom:'5px'}}>Eklediğiniz durak veritabanına da kaydedilir.</p>
          <input placeholder="Durak Adı" value={newPoint.name} onChange={e => setNewPoint({...newPoint, name: e.target.value})} style={inputStyle} />
          <div style={{display:'flex', gap:'5px'}}>
            <input placeholder="Enlem (Lat)" type="number" value={newPoint.lat} onChange={e => setNewPoint({...newPoint, lat: e.target.value})} style={inputStyle} />
            <input placeholder="Boylam (Lng)" type="number" value={newPoint.lng} onChange={e => setNewPoint({...newPoint, lng: e.target.value})} style={inputStyle} />
          </div>
          {/* addManualPoint fonksiyonu artık async çalışıyor */}
          <button onClick={addManualPoint} style={{...btnStyle, display:'flex', alignItems:'center', justifyContent:'center', gap:'5px'}}>
            <FiPlus /> Listeye ve DB'ye Ekle
          </button>
        </div>

        <div style={cardStyle}>
          <h4 style={{marginTop:0}}>⚙️ Ayarlar</h4>
          <p style={{fontSize: "12px", color: "#666", marginBottom: "8px"}}>
            (Durak sıralaması optimize edilir)
          </p>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            style={{...inputStyle, cursor: "pointer", background: "white"}}
          >
            <option value="dijkstra">Dijkstra (Standart)</option>
            <option value="astar">A* (Heuristic - Hızlı)</option>
          </select>
          <button onClick={handleOptimize} disabled={loading} style={{...btnStyle, background: loading ? "#ccc" : "#2ecc71"}}>
            {loading ? "Hesaplanıyor..." : "Rotayı Hesapla"}
          </button>
        </div>

        <div style={cardStyle}>
          <h4 style={{marginTop:0}}>Durak Sırası ({points.length})</h4>
          {points.map((p, idx) => (
            <div key={p.id} style={{ fontSize: "13px", borderBottom: "1px solid #ddd", padding: "8px 0", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                  <strong>{idx + 1}. {p.name}</strong> 
                  <br/><span style={{color:"#777", fontSize:"11px"}}>({p.lat.toFixed(4)}, {p.lng.toFixed(4)})</span>
              </div>
              {idx !== 0 && (
                  <button onClick={() => removePoint(p.id)} style={{background:'none', border:'none', color:'#e74c3c', cursor:'pointer'}}>
                      <FiX />
                  </button>
              )}
            </div>
          ))}
          {stats.dist > 0 && <p style={{marginTop: "10px", fontWeight: 'bold', color: '#27ae60'}}>Toplam Mesafe: {(stats.dist/1000).toFixed(2)} km</p>}
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

>>>>>>> Stashed changes
          {routeLine.length > 0 && (
            <Polyline positions={routeLine} pathOptions={{ color: "blue", weight: 5 }} />
          )}
          
          <RecenterMap coords={routeLine} />
        </MapContainer>
      </div>
<<<<<<< Updated upstream
=======

      {/* MODAL */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
                    <h3 style={{margin:0}}>Müşteri Seçin</h3>
                    <button onClick={() => setIsModalOpen(false)} style={{background:'none', border:'none', fontSize:'20px', cursor:'pointer'}}>
                        <FiX />
                    </button>
                </div>
                <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                    {dbPoints.length === 0 ? (
                        <p style={{color:'#666', textAlign:'center'}}>Kayıtlı müşteri bulunamadı.</p>
                    ) : (
                        <table style={{width:'100%', borderCollapse:'collapse'}}>
                            <thead>
                                <tr style={{background:'#f9f9f9', textAlign:'left'}}>
                                    <th style={{padding:'8px', borderBottom:'1px solid #ddd'}}>İsim</th>
                                    <th style={{padding:'8px', borderBottom:'1px solid #ddd'}}>Şehir</th>
                                    <th style={{padding:'8px', borderBottom:'1px solid #ddd'}}>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dbPoints.map(item => (
                                    <tr key={item.id} style={{borderBottom:'1px solid #eee'}}>
                                        <td style={{padding:'8px'}}>{item.name}</td>
                                        <td style={{padding:'8px', fontSize:'12px', color:'#555'}}>{item.city}</td>
                                        <td style={{padding:'8px'}}>
                                            <button 
                                                onClick={() => addFromDb(item)}
                                                style={{...btnStyle, padding:'5px 10px', fontSize:'12px', background: '#3498db'}}
                                            >
                                                Ekle
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <button onClick={() => setIsModalOpen(false)} style={{...btnStyle, background:'#7f8c8d', marginTop:'15px'}}>
                    Kapat
                </button>
            </div>
        </div>
      )}
>>>>>>> Stashed changes
    </div>
  );
};

// Stiller
<<<<<<< Updated upstream
const cardStyle = { background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "15px", border: "1px solid #ddd" };
const inputStyle = { width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" };
const btnStyle = { width: "100%", padding: "10px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" };
=======
const cardStyle = { background: "#fff", padding: "15px", borderRadius: "8px", border: "1px solid #ddd", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" };
const inputStyle = { width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" };
const btnStyle = { width: "100%", padding: "10px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", transition: "0.2s" };

const modalOverlayStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
    display: 'flex', justifyContent: 'center', alignItems: 'center'
};
const modalContentStyle = {
    background: 'white', padding: '20px', borderRadius: '8px',
    width: '90%', maxWidth: '500px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
};
>>>>>>> Stashed changes

export default RouteOptimizationPage;