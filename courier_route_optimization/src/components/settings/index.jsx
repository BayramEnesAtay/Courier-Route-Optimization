import React from "react";
import {SettingsDiv,Title,Description,Card,ProfileDiv,DescDiv,SubTitle,SubDesc,Icon} from './Styled.js';
import { CgProfile } from "react-icons/cg";

const Settings=()=>{


  return(
    <SettingsDiv>
      <Title>Settings</Title>
      <Description>Manage your account preferences and application settings</Description>
      <Card>
        <ProfileDiv>
          <Icon><CgProfile fontSize={"30px"} color="#1A73E8"/></Icon>
          <DescDiv>
            <SubTitle>Profile Information</SubTitle>
            <SubDesc>Update your personal details</SubDesc>
          </DescDiv>
        </ProfileDiv>
      </Card>
    </SettingsDiv>
  );
}
export default Settings;