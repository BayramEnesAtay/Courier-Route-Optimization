import React from "react";
import SignIn from "./components/signin/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/index.jsx";
import HeadlessDemo from "./components/sidebar/index.jsx";

const App=()=>{
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/> 
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/menu" element={<HeadlessDemo/>}/> 
      </Routes>
    </BrowserRouter>
  );
}
export default App;