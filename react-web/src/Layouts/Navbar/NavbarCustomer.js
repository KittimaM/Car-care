import React from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";
import Home from "../Customer/Home";

function NavbarCustomer() {
  return (
    <BrowserRouter>
      <NavLink to="/home_customer">HOME</NavLink>
      <Routes>
        <Route path="/home_customer" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default NavbarCustomer;
