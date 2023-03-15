import React from "react";
import NavStaff from "../Navbar/NavStaff";
import axios from "axios";

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
      <NavStaff />
      Home STAFF
    </div>
  );
}

export default HomeStaff;
