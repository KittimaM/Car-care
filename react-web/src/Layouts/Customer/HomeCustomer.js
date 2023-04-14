import React from "react";

import { NavLink } from "react-router-dom";
import NavCus from "../Navbar/NavCus";

function HomeCustomer() {


  return (
    <div>
      HomeCustomer
      <NavCus/>
      <ul>
        <li>
          <NavLink to="/booking">Booking</NavLink>
        </li>
      </ul>
     
    </div>
  );
}

export default HomeCustomer;
