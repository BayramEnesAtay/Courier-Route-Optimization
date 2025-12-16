import React from "react";
import SignIn from "./components/signin/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/index.jsx";
import SideBar from "./components/sidebar/index.jsx";
import NavBar from "./components/navbar/index.jsx";
import Layout from "./components/Layout.jsx";
import Dashboard from "./components/dashboard/index.jsx";
import Settings from "./components/settings/index.jsx";
import RouteOptimizationPage from "./components/route_optimization/index.jsx";
import DeliveryPoints from "./components/delivery_points/index.jsx";

const App=()=>{
  //the path for the sidebar will change.
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/> 
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/app" element={<Layout/>}>
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="settings" element={<Settings />}/>
          <Route path="route-optimization" element={<RouteOptimizationPage />}/>
          <Route path="delivery-points" element={<DeliveryPoints />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;