import React from "react";
import { NavbarContainer, CalculateBtn, Profile, ProfileIcon, ProfileName } from "./Styled.js";
const NavBar = ({collapsed}) => {


  return(
    <NavbarContainer collapsed={collapsed}>
      <CalculateBtn>Calculate Routes</CalculateBtn>
      <Profile>
        <ProfileIcon>
          <i className="pi pi-user" style={{fontSize:"20px"}}></i>
        </ProfileIcon>
        <ProfileName>John Doe</ProfileName>
      </Profile>
    </NavbarContainer>
  );
}
export default NavBar;