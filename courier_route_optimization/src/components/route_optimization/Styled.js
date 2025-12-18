import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f5f7fa;
  height: 100vh;
  position: relative;
`;

export const PageHeading = styled.h1`
  color: #111827;
  font-size: 32px;
  margin-bottom: 8px;
`;

export const PageSubheading = styled.p`
  color: #7e72a1;
  font-size: 16px;
  margin-bottom: 24px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex: 1;
  min-height: 0;
`;

export const DeliveryManagementPanel = styled.div`
  flex: 0 0 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
`;


export const AddPointCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AddPointHeading = styled.h2`
  color: #111827;
  font-size: 20px;
  margin: 0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.label`
  color: #111827;
  font-size: 14px;
`;

export const FormInput = styled.input`
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 14px;
  color: #111827;
  outline: none;
`;

export const AddPointButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background-color: #1a73e8;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

export const PointsListCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

export const PointsListHeading = styled.h2`
  color: #111827;
  font-size: 20px;
  margin: 0;
`;

export const PointsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PointListItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 12px;
  gap: 12px;
`;

export const PointNumber = styled.div`
  font-weight: bold;
  color: #111827;
`;

export const PointInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

export const PointName = styled.span`
  color: #111827;
  font-size: 14px;
  font-weight: 500;
`;

export const PointAddress = styled.span`
  color: #7e72a1;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const PointActions = styled.div`
  color: #9ca3af;
  cursor: pointer;
`;

export const OptimizeRouteButton = styled.button`
  background-color: #22c55e;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  cursor: pointer;
`;

export const MapAndLegendWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;  /* taşmaları engeller */
  min-height: 0;
`;
export const MapArea = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;          /* ❗ kritik */
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
`;
  
