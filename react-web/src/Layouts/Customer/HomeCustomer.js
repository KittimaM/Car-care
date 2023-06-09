import React, { useState } from "react";
import axios from 'axios'
import NavbarUser from "../Navbar/NavbarUser";

function HomeCustomer() {
  const [user, setUser] = useState([]);

  const token = localStorage.getItem("token");

  console.log("token is ", token);
  // http://localhost:5000/auth
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
  };

  axios
    .post("http://localhost:5000/auth", config)
    .then((res) => {
      const data = res.data;
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

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
