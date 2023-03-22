import React from "react";
import NavStaff from "../Navbar/NavStaff";
import axios from "axios";

function RegisterStaff() {
  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      phone: data.get("phone"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      staff_password: data.get("password"),
      id_number: data.get("idnumber"),
      role: data.get("role"),
    };

    

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:5000/register_staff", jsonData, config)
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
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="_phone"
            pattern="[0-9]{10}"
            required
            placeholder="Phone Number"
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            id="_fname"
            pattern="[A-Za-z]+"
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            id="_lname"
            pattern="[A-Za-z]+"
            placeholder="Last Name"
            required
          />
        </div>

        <div className="form-group">
          <label>password</label>
          <input
            type="password"
            name="password"
            id="_password"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <label>id number</label>
          <input
            type="text"
            name="idnumber"
            id="_idnumber"
            placeholder="id number"
            required
          />
        </div>
        <div className="form-group">
          <label>role</label>
          <input
            type="text"
            name="role"
            id="_role"
            placeholder="role"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterStaff;
