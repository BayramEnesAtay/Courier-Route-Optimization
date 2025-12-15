import React from "react"
import { Outlet } from "react-router-dom";
import NavBar from "./navbar/index.jsx/";
import SideBar from "./sidebar/index.jsx/";
import { useState } from "react"; 
import styled from "styled-components";

const Layout = () => {
  
   const [collapsed, setCollapsed] = useState(false);

   const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: ${({ collapsed }) => (collapsed ? "80px" : "250px")};
    transition: margin-left 0.3s ease;
  `;

  return (
    <>
      <NavBar collapsed={collapsed}/>
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      <ContentWrapper collapsed={collapsed}>
        
        <Outlet />
      </ContentWrapper> 
    </>
  )
}
export default Layout;