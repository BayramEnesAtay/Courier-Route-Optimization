import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  PageWrapper,
  PageHeading,
  PageSubheading,
  ContentWrapper,
  DeliveryManagementPanel,
  AddPointCard,
  AddPointHeading,
  FormGroup,
  FormLabel,
  FormInput,
  AddPointButton,
  PointsListCard,
  PointsListHeading,
  PointsList,
  PointListItem,
  PointNumber,
  PointInfo,
  PointName,
  PointAddress,
  PointActions,
  OptimizeRouteButton,
  MapAndLegendWrapper,
  MapArea,
} from "./Styled";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const RouteOptimizationPage = () => {
  const [pointName, setPointName] = useState("");
  const [pointAddress, setPointAddress] = useState("");

  const mapRef = useRef(null);
  const mapWrapperRef = useRef(null); // 🔥 EKLENDİ

  const courierPosition = [39.9667, 32.8167];

  const demoPoints = [
    { id: 1, name: "Main Warehouse", position: [39.9705, 32.8094] },
    { id: 2, name: "Delivery A", position: [39.9622, 32.8231] },
    { id: 3, name: "Delivery B", position: [39.9589, 32.8147] },
  ];

  const [points, setPoints] = useState([
    {
      id: 1,
      name: "Main Warehouse",
      address: "123 Industrial Ave, Downtown",
      type: "start",
    },
    {
      id: 2,
      name: "Store Location A",
      address: "456 Market St., Midtown",
      type: "delivery",
    },
    {
      id: 3,
      name: "Customer Pickup",
      address: "789 Park Ave, Uptown",
      type: "end",
    },
  ]);

  const handleAddPoint = () => {
    if (!pointName.trim() || !pointAddress.trim()) return;

    const newId = points.length + 1;
    setPoints([
      ...points,
      { id: newId, name: pointName, address: pointAddress, type: "delivery" },
    ]);

    setPointName("");
    setPointAddress("");
  };

  // 🔥 ASIL ÇÖZÜM BURASI
  useEffect(() => {
    if (!mapRef.current || !mapWrapperRef.current) return;

    const map = mapRef.current;
    const container = mapWrapperRef.current;

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    resizeObserver.observe(container);

    // ilk render güvenliği
    setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <PageWrapper>
      <PageHeading>Route Optimization</PageHeading>
      <PageSubheading>
        Add delivery points and optimize your route for maximum efficiency
      </PageSubheading>

      <ContentWrapper>
        {/* SOL PANEL */}
        <DeliveryManagementPanel>
          <AddPointCard>
            <AddPointHeading>Add Delivery Point</AddPointHeading>

            <FormGroup>
              <FormLabel>Point Name</FormLabel>
              <FormInput
                value={pointName}
                onChange={(e) => setPointName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Address</FormLabel>
              <FormInput
                value={pointAddress}
                onChange={(e) => setPointAddress(e.target.value)}
              />
            </FormGroup>

            <AddPointButton onClick={handleAddPoint}>
              <FaPlus /> Add Point
            </AddPointButton>
          </AddPointCard>

          <PointsListCard>
            <PointsListHeading>
              Delivery Points ({points.length})
            </PointsListHeading>

            <PointsList>
              {points.map((p, index) => (
                <PointListItem key={p.id}>
                  <PointNumber>{index + 1}.</PointNumber>
                  <PointInfo>
                    <PointName>{p.name}</PointName>
                    <PointAddress>{p.address}</PointAddress>
                  </PointInfo>
                  <PointActions>⋮</PointActions>
                </PointListItem>
              ))}
            </PointsList>

            <OptimizeRouteButton>Optimize Route</OptimizeRouteButton>
          </PointsListCard>
        </DeliveryManagementPanel>

        {/* HARİTA */}
        <MapAndLegendWrapper>
          <MapArea ref={mapWrapperRef}>
            <MapContainer
              center={courierPosition}
              zoom={13}
              style={{ width: "100%", height: "100%" }}
              whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
                updateWhenIdle={true}
              />

              <Marker position={courierPosition}>
                <Popup>Courier Location</Popup>
              </Marker>

              {demoPoints.map((p) => (
                <Marker key={p.id} position={p.position}>
                  <Popup>{p.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </MapArea>
        </MapAndLegendWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default RouteOptimizationPage;
