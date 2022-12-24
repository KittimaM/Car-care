import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import RegisterCustomer from "../Customer/RegisterCustomer";
import Home from "../Home";
import Login from "../Login";
import "./Index.css";

function Index() {
  return (
    <BrowserRouter>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? undefined : "nav-active")}
      >
        Home
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? undefined : "nav-active")}
      >
        Login
      </NavLink>
      <NavLink
        to="/register_customer"
        className={({ isActive }) => (isActive ? undefined : "nav-active")}
      >
        Register
      </NavLink>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register_customer" element={<RegisterCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Index;
