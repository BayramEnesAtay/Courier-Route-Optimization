import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  FiPlus,
  FiMinus,
  FiUser,
  FiMoreVertical,
  FiHelpCircle,
} from "react-icons/fi";
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
  RouteMarkerWrapper,
  RouteMarkerCircle,
  CourierMarkerWrapper,
  CourierOuterCircle,
  CourierInnerCircle,
  ZoomControls,
  ZoomButton,
  LegendCard,
  LegendItem,
  LegendIcon,
  LegendLabel,
} from "./Styled";

const RouteOptimizationPage = () => {
  const [pointName, setPointName] = useState("");
  const [pointAddress, setPointAddress] = useState("");
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
  const [markers, setMarkers] = useState([
    { id: 1, top: "50%", left: "30%" },
    { id: 2, top: "60%", left: "45%" },
    { id: 3, top: "40%", left: "65%" },
  ]);

  // Add delivery point
  const handleAddPoint = () => {
    if (!pointName.trim() || !pointAddress.trim()) return;
    const newId = points.length + 1;
    setPoints([
      ...points,
      { id: newId, name: pointName, address: pointAddress, type: "delivery" },
    ]);
    // assign random marker position within map area
    const randomTop = `${Math.floor(Math.random() * 60) + 20}%`;
    const randomLeft = `${Math.floor(Math.random() * 60) + 20}%`;
    setMarkers([...markers, { id: newId, top: randomTop, left: randomLeft }]);
    setPointName("");
    setPointAddress("");
  };

  return (
    <PageWrapper>
      <PageHeading>Route Optimization</PageHeading>
      <PageSubheading>
        Add delivery points and optimize your route for maximum efficiency
      </PageSubheading>
      <ContentWrapper>
        {/* Delivery point management */}
        <DeliveryManagementPanel>
          <AddPointCard>
            <AddPointHeading>Add Delivery Point</AddPointHeading>
            <FormGroup>
              <FormLabel>Point Name</FormLabel>
              <FormInput
                placeholder="e.g., Customer Location"
                value={pointName}
                onChange={(e) => setPointName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Address</FormLabel>
              <FormInput
                placeholder="Enter full address"
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
                    <PointActions>
                      <FiMoreVertical />
                    </PointActions>
                </PointListItem>
              ))}
            </PointsList>
            <OptimizeRouteButton>Optimize Route</OptimizeRouteButton>
          </PointsListCard>
        </DeliveryManagementPanel>

        {/* Map and legend */}
        <MapAndLegendWrapper>
          <MapArea>
            {/* Courier location */}
            <CourierMarkerWrapper top="55%" left="50%">
              <CourierOuterCircle />
              <CourierInnerCircle>
                <FiUser size={20} color="#ffffff" />
              </CourierInnerCircle>
            </CourierMarkerWrapper>

            {/* Route markers */}
            {points.map((p, idx) => {
              const pos = markers[idx] || { top: "50%", left: "50%" };
              return (
                <RouteMarkerWrapper
                  key={p.id}
                  top={pos.top}
                  left={pos.left}
                >
                  <RouteMarkerCircle pointType={p.type}>
                    {idx + 1}
                  </RouteMarkerCircle>
                </RouteMarkerWrapper>
              );
            })}

            {/* Zoom controls */}
            <ZoomControls>
              <ZoomButton>
                <FiPlus />
              </ZoomButton>
              <ZoomButton>
                <FiMinus />
              </ZoomButton>
            </ZoomControls>
          </MapArea>

          {/* Legend */}
          <LegendCard>
            <LegendItem>
              <LegendIcon bgColor="#FACC15" />
              <LegendLabel>Courier Location</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendIcon bgColor="#22C55E" />
              <LegendLabel>Start Point</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendIcon bgColor="#3B82F6" />
              <LegendLabel>Delivery Point</LegendLabel>
            </LegendItem>
            <LegendItem>
              <LegendIcon bgColor="#EF4444" />
              <LegendLabel>End Point</LegendLabel>
            </LegendItem>
          </LegendCard>
        </MapAndLegendWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default RouteOptimizationPage;