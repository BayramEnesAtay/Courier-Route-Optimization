import React from "react"
import { Outlet } from "react-router-dom";
import NavBar from "./navbar/index.jsx/";
import SideBar from "./sidebar/index.jsx/";
import { useState } from "react"; 
const Layout = () => {
  
   const [collapsed, setCollapsed] = useState(false);

  return (
    <>
        <NavBar collapsed={collapsed}/>
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Outlet />
    </>
  )
}
export default Layout;