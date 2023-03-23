import React from "react";
import axios from "axios";
import Queue from "./Queue";
import NavStaff from "../Navbar/NavStaff";

function HomeStaff() {
  const token = localStorage.getItem("token");

  console.log("token is ", token);

  // fetch("http://localhost:5000/auth", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${token}`
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json"
      
    }
  };

  axios.post("http://localhost:5000/auth", config).then((res) => {
    console.log(res);
  });

  return (
    <div>
      <NavStaff/>
      <Queue/>
      
    </div>
  );
}

export default HomeStaff;
