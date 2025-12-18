import styled from "styled-components";

/* Sayfa ana kapsayıcısı */
export const DeliveryPointsSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
  gap: 20px;
`;

/* Başlık ve açıklama */
export const PageHeader = styled.h1`
  color: #111827;
  font-size: 32px;
  margin: 0;
`;

export const SubHeader = styled.p`
  color: #7e72a1;
  font-size: 16px;
  margin: 0;
`;

/* Arama ve ekleme bölümü */
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const SearchFieldContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding-left: 12px;
`;

export const SearchIconWrapper = styled.div`
  color: #9ca3af;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 12px;
  font-size: 14px;
  color: #111827;
`;

export const SearchControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AddNewPointButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background-color: #1a73e8;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

/* İstatistikler paneli */
export const StatsPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const StatCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  flex: 1;
  min-width: 160px;
  padding: 16px 20px;
`;

export const StatTitle = styled.p`
  color: #7e72a1;
  font-size: 14px;
  margin: 0;
`;

export const StatValue = styled.h3`
  color: #111827;
  font-size: 24px;
  margin: 8px 0 0 0;
  display: flex;
  align-items: baseline;
`;

export const StatsUnit = styled.span`
  font-size: 14px;
  margin-left: 4px;
`;

/* Tablo */
export const TableSection = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const TableHeaderRow = styled.div`
  display: flex;
  padding: 16px 20px;
  background-color: #f3f4f6;
  color: #6b7280;
  font-weight: 600;
  font-size: 14px;
`;

export const TableRow = styled.div`
  display: flex;
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f9fafb;
  }
`;

export const NameCell = styled.div`
  flex: 2;
  color: #111827;
  font-weight: 500;
`;

export const AddressCell = styled.div`
  flex: 2.5;
  display: flex;
  flex-direction: column;
`;

export const AddressLine1 = styled.span`
  color: #111827;
  font-size: 14px;
`;

export const AddressLine2 = styled.span`
  color: #6b7280;
  font-size: 12px;
`;

export const CoordinatesCell = styled.div`
  flex: 2;
  color: #111827;
  font-size: 14px;
`;

export const CreatedCell = styled.div`
  flex: 1;
  color: #111827;
  font-size: 14px;
`;

export const ActionsCell = styled.div`
  flex: 1;
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  align-items: center;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${({ color }) => color || "#6b7280"};
  cursor: pointer;
`;

/* Modal bileşenleri */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  position: relative;
`;

export const ModalHeader = styled.div`
  color: #111827;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ModalLabel = styled.label`
  font-size: 14px;
  color: #111827;
`;

export const ModalInput = styled.input`
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  outline: none;
`;

export const ModalButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #1a73e8;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
`;
