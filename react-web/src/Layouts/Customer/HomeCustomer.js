import React, { useState } from "react";
import axios from 'axios'
import NavbarUser from "../Navbar/NavbarUser";

import { NavLink } from "react-router-dom";
import NavCus from "../Navbar/NavCus";

function HomeCustomer() {

  return (
    <div>
      HomeCustomer
      <NavbarUser/>
      {/* {user.map((item) => (
        <div key={item.phone}>
          <h2>{item.phone}</h2>
          <p>{item.description}</p>
        </div>
      ))} */}
    </div>
  );
}

export default HomeCustomer;
