import React from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { SidebarContainer, LogoSection, LogoIcon, LogoText, MenuSection, MenuItem, SidebarFooter,MenuText } from "./Styled.js";
import { useNavigate } from "react-router-dom";


const SideBar = ({collapsed,setCollapsed}) => {
  
 
  const navigate=useNavigate();

  return (
    <Sidebar
      visible={true}
      modal={false}
      dismissable={false}
      showCloseIcon={false}
      style={{ width:collapsed? "80px":"250px" ,transition:"width 0.3s ease"}}
    >
      <SidebarContainer>
        <LogoSection>
          <LogoIcon>
            <i className="pi pi-send" />
          </LogoIcon>
          <LogoText collapsed={collapsed}>Kuryexx</LogoText>
        </LogoSection>

        
        <MenuSection >
          <MenuItem active onClick={()=>{navigate("/app/dashboard")}}>
            <i className="pi pi-th-large" />
            <MenuText collapsed={collapsed}>Dashboard</MenuText>
          </MenuItem>

          <MenuItem active onClick={()=>{navigate("/app/route-optimization")}}>
            <i className="pi pi-sliders-h" />
            <MenuText collapsed={collapsed}> Route Optimization</MenuText>
          </MenuItem>

          <MenuItem active onClick={()=>{navigate("/app/delivery-points")}}>
            <i className="pi pi-map-marker" />
            <MenuText collapsed={collapsed}> Delivery Points</MenuText>
          </MenuItem>

          <MenuItem onClick={()=>{navigate("/app/settings")}} active>
            <i className="pi pi-cog" />
            <MenuText collapsed={collapsed}> Settings</MenuText>
          </MenuItem>
        </MenuSection>

        
        <SidebarFooter>
          <Button icon={collapsed? "pi pi-angle-right" : "pi pi-angle-left"} onClick={()=>setCollapsed(!collapsed)} />
        </SidebarFooter>
      </SidebarContainer>
    </Sidebar>
  );
};

export default SideBar;
