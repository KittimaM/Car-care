import React from "react";
import { NavLink } from "react-router-dom";

const NavStaff = () => {
  const role = localStorage.getItem("role");
  console.log(role);

  return (
    <div>
      <ul>
        <li>
          <NavLink to="/home_staff"> STAFF</NavLink>
        </li>
        <li>
          <NavLink to="/register_staff">Register</NavLink>
        </li>
        {role === "1" ? (
          <li>
            <NavLink to="/access_config">Setting Staff</NavLink>
          </li>
        ) : (
          ""
        )}
        <li>
          <NavLink to="/del_staff">Delete Staff</NavLink>
        </li>
        <li>
          <NavLink to="/update_staff">Update Staff</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavStaff;
