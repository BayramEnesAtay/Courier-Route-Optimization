import React from "react";
import SignIn from "./components/signin/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App=()=>{
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>}/> 

      </Routes>
    </BrowserRouter>
  );
}
export default App;