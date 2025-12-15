import React from "react";
import SignIn from "./components/signin/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/index.jsx";
import SideBar from "./components/sidebar/index.jsx";
import NavBar from "./components/navbar/index.jsx";
import Layout from "./components/Layout.jsx";
import Dashboard from "./components/dashboard/index.jsx";

const App=()=>{
  //the path for the sidebar will change.
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/> 
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/app" element={<Layout/>}>
          <Route path="dashboard" element={<Dashboard />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;