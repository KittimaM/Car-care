import React from "react";
import NavStaff from "../Navbar/NavStaff";
import axios from "axios";
import { NavLink } from "react-router-dom";
import CheckoutStaff from "./worktime/CheckoutStaff";
import CheckinStaff from "./worktime/CheckinStaff";

function HomeStaff() {
  const token = localStorage.getItem("token");

  // fetch("http://localhost:5000/auth", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${token}`
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  // };

  // axios.post("http://localhost:5000/auth", config).then((res) => {
  //   console.log(res);
  // });

  return (
    <div>
      <NavStaff />
      Home STAFF
      <CheckinStaff />
      <CheckoutStaff />
    </div>
  );
}

export default HomeStaff;
