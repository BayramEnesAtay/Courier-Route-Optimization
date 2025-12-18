import React, { useState } from "react";
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

// Yardımcı fonksiyon: rastgele koordinat üretir
const generateRandomCoordinates = () => {
  const lat = (40 + Math.random()).toFixed(4);
  const lon = (-74 + Math.random()).toFixed(4);
  return `${lat}, ${lon}`;
};

// Yardımcı fonksiyon: tarih formatı (dd.MM.yyyy)
const formatDate = (dateObj) => {
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
};

const initialPoints = [
  {
    id: 1,
    name: "Main Warehouse",
    street: "123 Industrial Ave",
    city: "Downtown",
    coordinates: "40.7128, -74.0060",
    created: "05.01.2025",
  },
  {
    id: 2,
    name: "Store Location A",
    street: "456 Market St",
    city: "Midtown",
    coordinates: "40.7580, -73.9855",
    created: "08.01.2025",
  },
  {
    id: 3,
    name: "Customer Pickup Point",
    street: "789 Park Ave",
    city: "Uptown",
    coordinates: "40.7789, -73.9750",
    created: "10.01.2025",
  },
  {
    id: 4,
    name: "Distribution Center",
    street: "321 Commerce Blvd",
    city: "West Side",
    coordinates: "40.7490, -73.9680",
    created: "12.01.2025",
  },
  {
    id: 5,
    name: "Retail Partner Hub",
    street: "654 Broadway",
    city: "East Side",
    coordinates: "40.7260, -73.9820",
    created: "15.01.2025",
  },
];

const DeliveryPoints = () => {
  const [points, setPoints] = useState(initialPoints);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formState, setFormState] = useState({
    id: null,
    name: "",
    street: "",
    city: "",
  });

  // Stat değerleri
  const totalPoints = points.length;
  const activeRoutes = 12;
  const weeklyAdditions = 8;
  const coverageArea = 45;

  // Arama filtreli liste
  const filteredPoints = points.filter((p) => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.street.toLowerCase().includes(query) ||
      p.city.toLowerCase().includes(query)
    );
    });

  // Yeni veya düzenlenen noktayı ekle/kaydet
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.street.trim() || !formState.city.trim()) {
      return;
    }
    if (isEditMode) {
      // düzenleme
      setPoints((prev) =>
        prev.map((p) =>
          p.id === formState.id
            ? {
                ...p,
                name: formState.name,
                street: formState.street,
                city: formState.city,
                coordinates: p.coordinates,
                created: p.created,
              }
            : p
        )
      );
    } else {
      // ekleme
      const newPoint = {
        id: points.length ? Math.max(...points.map((p) => p.id)) + 1 : 1,
        name: formState.name,
        street: formState.street,
        city: formState.city,
        coordinates: generateRandomCoordinates(),
        created: formatDate(new Date()),
      };
      setPoints([...points, newPoint]);
    }
    setIsModalOpen(false);
    setIsEditMode(false);
    setFormState({ id: null, name: "", street: "", city: "" });
  };

  // Düzenleme formunu açar
  const handleEdit = (point) => {
    setIsEditMode(true);
    setFormState({
      id: point.id,
      name: point.name,
      street: point.street,
      city: point.city,
    });
    setIsModalOpen(true);
  };

  // Silme işlemi
  const handleDelete = (id) => {
    setPoints((prev) => prev.filter((p) => p.id !== id));
  };

  // Modalı kapat
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setFormState({ id: null, name: "", street: "", city: "" });
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
          {/* Burada export butonu tasarımda görünüyor fakat talimat gereği oluşturulmuyor */}
          <AddNewPointButton onClick={() => setIsModalOpen(true)}>
            <FiPlus size={14} />
            Add New Point
          </AddNewPointButton>
        </SearchControls>
      </TopBar>

      <StatsPanel>
        <StatCard>
          <StatTitle>Total Points</StatTitle>
          <StatValue>{totalPoints}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Active Routes</StatTitle>
          <StatValue>{activeRoutes}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>This Week</StatTitle>
          <StatValue>+{weeklyAdditions}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Coverage Area</StatTitle>
          <StatValue>
            {coverageArea} <StatsUnit>km²</StatsUnit>
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
        {filteredPoints.map((point) => (
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
        ))}
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
