import React from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import SignIn from "./pages/Signin";
import SignUp from './pages/Signup';
import Dashboard from './pages/dashboard'
import "./App.css";



function App() {
  return (
    <>
      //Routes
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
