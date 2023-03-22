import React, { useState } from "react";
import axios from "axios";
import Select_car from "./Booking/Select_car";

function HomeCustomer() {
  const [phone, setPhone] = useState(null);

  const token = localStorage.getItem("token");

  console.log("token in home cus ", token);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .post("http://localhost:5000/select-car", {}, config)
    .then((res) => {
      const data = res.data;
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // delete axios.defaults.headers.common["Authorization"];
    // window.location = "/";
  };

  return (
    <div>
      HomeCustomer<button onClick={handleLogout}>Logout</button>
      {/* {user.map((item) => (
        <div key={item.phone}>
          <h2>{item.phone}</h2>
          <p>{item.description}</p>
        </div>
      ))} */}
      {/* <Select_car/> */}
    </div>
  );
}

export default HomeCustomer;
