import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import RegisterCustomer from "../Customer/RegisterCustomer";
import Home from "../FirstPage";
import Login from "../Login";

function Index() {
  return (
   <div>
     <BrowserRouter>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register_customer">Register</NavLink>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register_customer" element={<RegisterCustomer />} />
      </Routes>
    </BrowserRouter>
    
   </div>
  );
}

export default Index;

