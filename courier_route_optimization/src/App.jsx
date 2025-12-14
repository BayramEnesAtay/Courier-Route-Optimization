import React from "react";
import SignIn from "./components/signin/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/index.jsx";
import SideBar from "./components/sidebar/index.jsx";

const App=()=>{
  //the path for the sidebar will change.
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/> 
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/menu" element={<SideBar/>}/> 
      </Routes>
    </BrowserRouter>
  );
}
export default App;