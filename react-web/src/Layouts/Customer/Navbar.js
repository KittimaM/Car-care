import React from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import Home from "./Home";

function Navbar() {
  return (
    <BrowserRouter>
      <NavLink to="/home_customer">HOME</NavLink>
      <Routes>
        <Route path="/home_customer" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navbar;
