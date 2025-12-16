import React, { useState } from "react";
import {
  SettingsDiv,
  Title,
  Description,
  Card,
  Icon,
  SubTitle,
  SubDesc,
  ProfileDiv,
  DescDiv,
  FormGroup,
  Label,
  TextInput,
  PasswordInput,
  Button,
  NotificationContainer,
  NotificationItem,
  NotificationLabel,
  NotificationDesc,
  CheckBox,
  ThemeLanguageContainer,
  ThemeCard,
  LanguageCard,
  ThemeRow,
  ToggleSwitch,
  ToggleCircle,
  SelectContainer,
  SelectText
} from "./Styled.js";
import { CgProfile } from "react-icons/cg";
import {
  FiKey,
  FiBell,
  FiSun,
  FiGlobe,
  FiShield,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";

const Settings = () => {
  // bildirim ve tema durumları
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [lightMode, setLightMode] = useState(true);

  // kaydetme işlemi (şu an sadece konsola yazar)
  const handleSave = () => {
    console.log("Profile settings saved");
  };

  return (
    <SettingsDiv>
      <Title>Settings</Title>
      <Description>
        Manage your account preferences and application settings
      </Description>

      {/* Profile Information */}
      <Card>
        <ProfileDiv>
          <Icon bgColor="#E8F1FE">
            <CgProfile fontSize={"24px"} color="#1A73E8" />
          </Icon>
          <DescDiv>
            <SubTitle>Profile Information</SubTitle>
            <SubDesc>Update your personal details</SubDesc>
          </DescDiv>
        </ProfileDiv>

        <FormGroup>
          <Label>Full Name</Label>
          <TextInput type="text" defaultValue="John Doe" />
        </FormGroup>

        <FormGroup>
          <Label>Email Address</Label>
          <TextInput type="email" defaultValue="john.doe@kuryexx.com" />
        </FormGroup>

        <FormGroup>
          <Label>Phone Number</Label>
          <TextInput type="text" defaultValue="+1 (555) 123-4567" />
        </FormGroup>

        <FormGroup>
          <Label>Company</Label>
          <TextInput type="text" defaultValue="Kuryexx Logistics" />
        </FormGroup>

        <Button onClick={handleSave}>Save Changes</Button>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <ProfileDiv>
          <Icon bgColor="#FEF8E7">
            <FiBell fontSize={"24px"} color="#F59E0B" />
          </Icon>
          <DescDiv>
            <SubTitle>Notification Preferences</SubTitle>
            <SubDesc>Choose how you want to be notified</SubDesc>
          </DescDiv>
        </ProfileDiv>

        <NotificationContainer>
          <NotificationItem>
            <div>
              <NotificationLabel>Email Notifications</NotificationLabel>
              <NotificationDesc>Receive updates via email</NotificationDesc>
            </div>
            <CheckBox
              checked={emailNotif}
              onClick={() => setEmailNotif((prev) => !prev)}
            >
              {emailNotif && <FiCheck size={14} />}
            </CheckBox>
          </NotificationItem>

          <NotificationItem>
            <div>
              <NotificationLabel>Push Notifications</NotificationLabel>
              <NotificationDesc>
                Get real-time updates in your browser
              </NotificationDesc>
            </div>
         

              <CheckBox
              checked={pushNotif}
              onClick={() => setPushNotif((prev) => !prev)}
            >
              {pushNotif && <FiCheck size={14} />}
            </CheckBox>
          </NotificationItem>

          <NotificationItem>
            <div>
              <NotificationLabel>SMS Notifications</NotificationLabel>
              <NotificationDesc>
                Receive text messages for critical alerts
              </NotificationDesc>
            </div>
            <CheckBox
              checked={smsNotif}
              onClick={() => setSmsNotif((prev) => !prev)}
            >
              {smsNotif && <FiCheck size={14} />}
            </CheckBox>
          </NotificationItem>
        </NotificationContainer>
      </Card>

      {/* Theme & Language */}
      <ThemeLanguageContainer>
        <ThemeCard>
          <ProfileDiv>
            <Icon bgColor="#F3F4F6">
              <FiSun fontSize={"24px"} color="#6B7280" />
            </Icon>
            <DescDiv>
              <SubTitle>Theme</SubTitle>
              <SubDesc>Choose your appearance</SubDesc>
            </DescDiv>
          </ProfileDiv>

          <ThemeRow>
            <SubTitle style={{ fontSize: "14px" }}>Light Mode</SubTitle>
            <ToggleSwitch
              onClick={() => setLightMode((prev) => !prev)}
              style={{
                backgroundColor: lightMode ? "#E5E7EB" : "#4F46E5",
              }}
            >
              <ToggleCircle
                style={{ marginLeft: lightMode ? 0 : "20px" }}
              />
            </ToggleSwitch>
          </ThemeRow>
        </ThemeCard>

        <LanguageCard>
          <ProfileDiv>
            <Icon bgColor="#E9F9F4">
              <FiGlobe fontSize={"24px"} color="#10B981" />
            </Icon>
            <DescDiv>
              <SubTitle>Language</SubTitle>
              <SubDesc>Select your language</SubDesc>
            </DescDiv>
          </ProfileDiv>

          <SelectContainer>
            <SelectText>English</SelectText>
            <FiChevronDown color="#6B7280" />
          </SelectContainer>
        </LanguageCard>
      </ThemeLanguageContainer>

      {/* Security */}
      <Card>
        <ProfileDiv>
          <Icon bgColor="#FDF2F2">
            <FiShield fontSize={"24px"} color="#EF4444" />
          </Icon>
          <DescDiv>
            <SubTitle>Security</SubTitle>
            <SubDesc>
              Manage your password and security settings
            </SubDesc>
          </DescDiv>
        </ProfileDiv>

        <FormGroup>
          <Label>Current Password</Label>
          <PasswordInput placeholder="Enter current password" />
        </FormGroup>

        <FormGroup>
          <Label>New Password</Label>
          <PasswordInput placeholder="Enter new password" />
        </FormGroup>

        <FormGroup>
          <Label>Confirm New Password</Label>
          <PasswordInput placeholder="Confirm new password" />
        </FormGroup>

        <Button>Update Password</Button>
      </Card>
    </SettingsDiv>
  );
};

export default Settings;
