import React from "react";
import NavStaff from "../Navbar/NavStaff";
import axios from "axios";

const DelStaff = () => {
  const handledelstaff = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      id: data.get("id")
    }
    // console.log(jsonData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:5000/del-staff", jsonData, config)
      .then((res) => {
        const data = res.data;
        alert(data.status);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <NavStaff />
      in del staff
      <form onSubmit={handledelstaff}>
        <label>id</label>
        <input type="text" name="id" placeholder="id" required/>
        <button type="submmit">Del Staff</button>
      </form>
    </div>
  );
};

export default DelStaff;
