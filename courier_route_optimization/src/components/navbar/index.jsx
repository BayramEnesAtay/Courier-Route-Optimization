import React from "react";
import { NavbarContainer, CalculateBtn, Profile, ProfileIcon, ProfileName } from "./Styled.js";
import { useNavigate } from "react-router-dom";
const NavBar = ({collapsed}) => {

  const navigate=useNavigate();
  return(
    <NavbarContainer collapsed={collapsed}>
      <CalculateBtn onClick={()=>navigate('/app/route-optimization')}>Calculate Routes</CalculateBtn>
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