import styled from "styled-components";

// Ana kapsayıcı
export const SettingsDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #F5F7FA;
  min-height: 100vh;
  row-gap: 20px;
`;

// Başlık
export const Title = styled.h2`
  color: #111827;
  margin-bottom: 0px;
`;

// Açıklama metni
export const Description = styled.p`
  color: #7E72A1;
  margin-top: 0px;
`;

// Kart yapısı, diğer bölümler için de kullanılır
export const Card = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

// Simgeler için arka plan rengi parametre ile gelecek
export const Icon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ bgColor }) => bgColor || "#E8F1FE"};
`;

// Başlık alt başlık
export const SubTitle = styled.h4`
  color: #111827;
  margin: 0px;
  font-size: 18px;
`;

export const SubDesc = styled.p`
  color: #7E72A1;
  margin: 0px;
  margin-top: 5px;
  font-size: 14px;
`;

// Üst kısımda ikon ve açıklama yan yana
export const ProfileDiv = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`;

export const DescDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// Form grupları
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #111827;
`;

// Metin alanı
export const TextInput = styled.input`
  padding: 12px 14px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background-color: #FFFFFF;
  font-size: 14px;
  color: #111827;
  width: 100%;
  box-sizing: border-box;
`;

// Şifre alanı
export const PasswordInput = styled(TextInput).attrs({ type: "password" })``;

// Genel buton
export const Button = styled.button`
  align-self: flex-start;
  padding: 12px 20px;
  background-color: #1A73E8;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;


// Bildirimler için kap
export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

// Her bildirim satırı
export const NotificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #F8FAFC;
  border-radius: 8px;
`;

export const NotificationLabel = styled.span`
  font-size: 16px;
  color: #111827;
`;

export const NotificationDesc = styled.span`
  font-size: 14px;
  color: #7E72A1;
  margin-left:10px;
`;

// İşaret kutusu
export const CheckBox = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: ${({ checked }) => (checked ? "#A855F7" : "#374151")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 14px;
`;

// Tema ve dil kartlarının tutucu
export const ThemeLanguageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
`;

// Tema kartı
export const ThemeCard = styled(Card)`
  flex: 1;
  min-width: 280px;
`;

// Dil kartı
export const LanguageCard = styled(Card)`
  flex: 1;
  min-width: 280px;
`;

// Tema satırı (mod adı + anahtar)
export const ThemeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Aç/kapa anahtarının gövdesi
export const ToggleSwitch = styled.div`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background-color: #E5E7EB;
  position: relative;
  padding: 4px;
  display: flex;
  align-items: center;
`;

// Anahtarın yuvarlak kısmı
export const ToggleCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #FFFFFF;
`;

// Dil seçim kap
export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 12px 14px;
  margin-top: 10px;
`;

export const SelectText = styled.span`
  font-size: 14px;
  color: #111827;
`;
