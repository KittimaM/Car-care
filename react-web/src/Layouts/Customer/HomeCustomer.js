import React from "react";

import { NavLink } from "react-router-dom";

function HomeCustomer() {
  return (
    <div>
      HomeCustomer
      <ul>
        <li>
          <NavLink to="/booking">Booking</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default HomeCustomer;
