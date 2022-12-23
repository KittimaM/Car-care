//หน้าแรก
import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Register from "./Layouts/Customer/Register";

function App() {
  return (
    <BrowserRouter>
      <NavLink to="/login_customer">Login</NavLink>
      <NavLink to="/register_customer">Register</NavLink>
      <Routes>
        <Route path="/register_customer" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
