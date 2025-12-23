import React, { useState, useEffect } from "react";
import {
  DeliveryPointsSectionContainer,
  PageHeader,
  SubHeader,
  TopBar,
  SearchFieldContainer,
  SearchIconWrapper,
  SearchInput,
  SearchControls,
  StatsPanel,
  StatCard,
  StatTitle,
  StatValue,
  StatsUnit,
  TableSection,
  TableHeaderRow,
  TableRow,
  NameCell,
  AddressCell,
  AddressLine1,
  AddressLine2,
  CoordinatesCell,
  CreatedCell,
  ActionsCell,
  ActionButton,
  AddNewPointButton,
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ModalForm,
  ModalFormGroup,
  ModalLabel,
  ModalInput,
  ModalButtonsRow,
  CancelButton,
  SubmitButton,
} from "./Styled";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";

const API_URL = "http://localhost:8000/api/delivery-points/";

const formatDate = (dateObj) => {
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

const DeliveryPoints = () => {
  const [points, setPoints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- İSTATİSTİK STATE'LERİ (YENİ) ---
  const [stats, setStats] = useState({
    totalPoints: 0,
    activeRoutes: 0,
    weeklyAdditions: 0,
    coverageArea: 0,
  });

  const [formState, setFormState] = useState({
    id: null,
    name: "",
    street: "",
    city: "",
    lat: "",
    lng: "",
  });

  const fetchPoints = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setPoints(data);
      } else {
        console.error("Veriler çekilemedi");
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  // --- HESAPLAMA MANTIĞI (YENİ) ---
  // points dizisi her değiştiğinde bu çalışır ve istatistikleri günceller.
  useEffect(() => {
    if (points.length === 0) {
        setStats({ totalPoints: 0, activeRoutes: 0, weeklyAdditions: 0, coverageArea: 0 });
        return;
    }

    // 1. Total Points (Toplam Nokta)
    const total = points.length;

    // 2. This Week (Bu Hafta Eklenenler)
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 gün öncesi
    
    const weeklyCount = points.filter(p => {
        // Backend tarihi "dd.MM.yyyy" formatında geliyor, bunu Date objesine çevirmemiz lazım
        if (!p.created) return false;
        const parts = p.created.split('.'); // ["05", "01", "2025"]
        if (parts.length !== 3) return false;
        const pointDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // yyyy-mm-dd formatı
        return pointDate >= oneWeekAgo;
    }).length;

    // 3. Coverage Area (Kapsama Alanı Hesaplama - Basit Dikdörtgen Alanı)
    let area = 0;
    // Sadece geçerli koordinatları (0,0 olmayanları) al
    const validCoords = points
        .map(p => {
            if (!p.coordinates || !p.coordinates.includes(',')) return null;
            const [lat, lng] = p.coordinates.split(',').map(Number);
            return { lat, lng };
        })
        .filter(c => c !== null && c.lat !== 0 && c.lng !== 0);

    if (validCoords.length > 1) {
        const minLat = Math.min(...validCoords.map(c => c.lat));
        const maxLat = Math.max(...validCoords.map(c => c.lat));
        const minLng = Math.min(...validCoords.map(c => c.lng));
        const maxLng = Math.max(...validCoords.map(c => c.lng));

        // Enlem farkı (1 derece enlem ≈ 111 km)
        const heightKm = (maxLat - minLat) * 111;
        // Boylam farkı (Enleme göre değişir, ortalama enlemi alıyoruz)
        const avgLatRad = ((minLat + maxLat) / 2) * (Math.PI / 180);
        const widthKm = (maxLng - minLng) * 111 * Math.cos(avgLatRad);

        area = (heightKm * widthKm).toFixed(2); // Virgülden sonra 2 hane
    }

    // 4. Active Routes (Tahmini)
    // Şu an backend'de "Aktif Rota" tablosu olmadığı için;
    // Her 10 durak için 1 kurye rotası gerektiğini varsayıyoruz.
    const estimatedRoutes = Math.ceil(total / 10);

    setStats({
        totalPoints: total,
        activeRoutes: estimatedRoutes, // Veya backend destekleyene kadar 0 yapabilirsin
        weeklyAdditions: weeklyCount,
        coverageArea: area
    });

  }, [points]); // points değişince tekrar hesapla

  const filteredPoints = points.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.street.toLowerCase().includes(query) ||
      p.city.toLowerCase().includes(query)
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.street.trim() || !formState.city.trim()) {
      alert("Lütfen İsim, Adres ve Şehir alanlarını doldurun.");
      return;
    }

    const latValue = formState.lat ? formState.lat : "0.0";
    const lngValue = formState.lng ? formState.lng : "0.0";
    const combinedCoordinates = `${latValue}, ${lngValue}`;

    try {
      if (isEditMode) {
        const updateData = {
          name: formState.name,
          street: formState.street,
          city: formState.city,
          coordinates: combinedCoordinates,
        };

        const response = await fetch(`${API_URL}${formState.id}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        });

        if (response.ok) {
           fetchPoints(); 
        }

      } else {
        const newPoint = {
          name: formState.name,
          street: formState.street,
          city: formState.city,
          coordinates: combinedCoordinates,
          created: formatDate(new Date()),
        };

        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPoint),
        });

        if (response.ok) {
           fetchPoints(); 
        }
      }
      closeModal();
    } catch (error) {
      console.error("İşlem sırasında hata oluştu:", error);
    }
  };

  const handleEdit = (point) => {
    setIsEditMode(true);
    let currentLat = "";
    let currentLng = "";
    if (point.coordinates && point.coordinates.includes(",")) {
        const parts = point.coordinates.split(",");
        currentLat = parts[0].trim();
        currentLng = parts[1].trim();
    }

    setFormState({
      id: point.id,
      name: point.name,
      street: point.street,
      city: point.city,
      lat: currentLat,
      lng: currentLng,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu noktayı silmek istediğinize emin misiniz?")) return;
    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPoints((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Silme işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setFormState({ id: null, name: "", street: "", city: "", lat: "", lng: "" });
  };

  return (
    <DeliveryPointsSectionContainer>
      <PageHeader>Delivery Points</PageHeader>
      <SubHeader>Manage all your delivery locations and pickup points</SubHeader>

      <TopBar>
        <SearchFieldContainer>
          <SearchIconWrapper>
            <FiSearch size={16} />
          </SearchIconWrapper>
          <SearchInput
            placeholder="Search by name, address, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchFieldContainer>

        <SearchControls>
          <AddNewPointButton onClick={() => setIsModalOpen(true)}>
            <FiPlus size={14} />
            Add New Point
          </AddNewPointButton>
        </SearchControls>
      </TopBar>

      <StatsPanel>
        <StatCard>
          <StatTitle>Total Points</StatTitle>
          {/* STATS DEĞERLERİ BURADA GÜNCELLENDİ */}
          <StatValue>{stats.totalPoints}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Estimated Routes</StatTitle>
          <StatValue>{stats.activeRoutes}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>This Week</StatTitle>
          <StatValue>+{stats.weeklyAdditions}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Coverage Area</StatTitle>
          <StatValue>
            {stats.coverageArea} <StatsUnit>km²</StatsUnit>
          </StatValue>
        </StatCard>
      </StatsPanel>

      <TableSection>
        <TableHeaderRow>
          <NameCell>Name</NameCell>
          <AddressCell>Address</AddressCell>
          <CoordinatesCell>Coordinates</CoordinatesCell>
          <CreatedCell>Created</CreatedCell>
          <ActionsCell>Actions</ActionsCell>
        </TableHeaderRow>
        
        {isLoading ? (
            <TableRow><NameCell>Yükleniyor...</NameCell></TableRow>
        ) : filteredPoints.length === 0 ? (
            <TableRow><NameCell>Kayıt bulunamadı.</NameCell></TableRow>
        ) : (
            filteredPoints.map((point) => (
            <TableRow key={point.id}>
                <NameCell>{point.name}</NameCell>
                <AddressCell>
                <AddressLine1>{point.street}</AddressLine1>
                <AddressLine2>{point.city}</AddressLine2>
                </AddressCell>
                <CoordinatesCell>{point.coordinates}</CoordinatesCell>
                <CreatedCell>{point.created}</CreatedCell>
                <ActionsCell>
                <ActionButton
                    color="#1a73e8"
                    onClick={() => handleEdit(point)}
                    aria-label="Edit"
                >
                    <FiEdit2 size={16} />
                </ActionButton>
                <ActionButton
                    color="#ef4444"
                    onClick={() => handleDelete(point.id)}
                    aria-label="Delete"
                >
                    <FiTrash2 size={16} />
                </ActionButton>
                </ActionsCell>
            </TableRow>
            ))
        )}
      </TableSection>

      {/* Modal */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              {isEditMode ? "Edit Delivery Point" : "Add New Delivery Point"}
              <CloseButton onClick={closeModal}>
                <FiX size={20} />
              </CloseButton>
            </ModalHeader>
            <ModalForm onSubmit={handleSubmit}>
              <ModalFormGroup>
                <ModalLabel>Point Name</ModalLabel>
                <ModalInput
                  type="text"
                  value={formState.name}
                  placeholder="e.g., Customer Location"
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />
              </ModalFormGroup>
              <ModalFormGroup>
                <ModalLabel>Address</ModalLabel>
                <ModalInput
                  type="text"
                  value={formState.street}
                  placeholder="Street address"
                  onChange={(e) =>
                    setFormState({ ...formState, street: e.target.value })
                  }
                />
              </ModalFormGroup>
              <ModalFormGroup>
                <ModalLabel>City</ModalLabel>
                <ModalInput
                  type="text"
                  value={formState.city}
                  placeholder="City name"
                  onChange={(e) =>
                    setFormState({ ...formState, city: e.target.value })
                  }
                />
              </ModalFormGroup>

              <div style={{ display: "flex", gap: "10px" }}>
                <ModalFormGroup style={{ flex: 1 }}>
                  <ModalLabel>Latitude (Enlem)</ModalLabel>
                  <ModalInput
                    type="number"
                    step="any"
                    value={formState.lat}
                    placeholder="e.g. 39.9207"
                    onChange={(e) =>
                      setFormState({ ...formState, lat: e.target.value })
                    }
                  />
                </ModalFormGroup>
                <ModalFormGroup style={{ flex: 1 }}>
                  <ModalLabel>Longitude (Boylam)</ModalLabel>
                  <ModalInput
                    type="number"
                    step="any"
                    value={formState.lng}
                    placeholder="e.g. 32.8541"
                    onChange={(e) =>
                      setFormState({ ...formState, lng: e.target.value })
                    }
                  />
                </ModalFormGroup>
              </div>

              <ModalButtonsRow>
                <CancelButton type="button" onClick={closeModal}>
                  Cancel
                </CancelButton>
                <SubmitButton type="submit">
                  {isEditMode ? "Save Changes" : "Add Point"}
                </SubmitButton>
              </ModalButtonsRow>
            </ModalForm>
          </ModalContainer>
        </ModalOverlay>
      )}
    </DeliveryPointsSectionContainer>
  );
};

export default DeliveryPoints;