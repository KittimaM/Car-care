import React, { useState } from "react";
import axios from "axios";
import Select_car from "./Booking/Select_car";

function HomeCustomer() {
  const [car, setCar] = useState([]);

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
      setCar(data.result);
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
      {/* <select defaultValue={car.id}>
        {car.map((item) => {
          <option value={item.id}>{item.id}</option>;
        })}
      </select>
      <Select_car/> */}
    </div>
  );
}

export default HomeCustomer;
