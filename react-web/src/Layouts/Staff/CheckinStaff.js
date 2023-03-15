import React from "react";
import NavStaff from "../Navbar/NavStaff";
import axios from "axios";
const CheckinStaff = () => {
  const checkinStaff = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const jsonData = {
      id: data.get("id"),
      password: data.get("password"),
    };
 
    const config = {
      headers: {
        "Content-Type": "application/json",
        
      },
    };

    axios
      .post("http://localhost:5000/checkin-staff", jsonData, config)
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
      CheckinStaff
      <form onSubmit={checkinStaff}>
        <div className="form-group">
          <label for="_id">Last Name</label>
          <input type="text" name="id" id="_id" placeholder="id" required />
        </div>
        <div className="form-group">
          <label for="_password">password</label>
          <input
            type="password"
            name="password"
            id="_password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CheckinStaff;
