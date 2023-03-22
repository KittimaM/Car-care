import axios from "axios";
import React, { useState } from "react";
import NavStaff from "../Navbar/NavStaff";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const UpdateStaff = () => {
  const [staff_id, setStaff_id] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [id_number, setID_number] = useState(null);
  const [role, setRole] = useState(null);

  const handleSelectStaff = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      id: data.get("id"),
    };

    axios
      .post("http://localhost:5000/select-staff", jsonData, config)
      .then((res) => {
        const data = res.data;

        if (data.status == "OK") {
          const user = data.user;
          const role = data.role;
          setStaff_id(user.id);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPhone(user.phone);
          setID_number(user.id_number);
          setRole(role.name);
        } else {
          alert(data.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const handleUpdateStaff = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      id: staff_id,
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      phone: data.get("phone"),
      id_number: data.get("id_number"),
      role: data.get("role"),
      staff_password: data.get("staff_password"),
    };


    axios
      .post("http://localhost:5000/update-staff", jsonData, config)
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
      UpdateStaff
      <form onSubmit={handleSelectStaff}>
        <label>select id</label>
        <input type="text" name="id" placeholder="id" required />
        <button type="submit">select staff</button>
      </form>
      {!staff_id ? (
        ""
      ) : (
        <form onSubmit={handleUpdateStaff}>
          <label>fistName</label>
          <input
            type="text"
            name="firstName"
            defaultValue={firstName}
            placeholder={firstName}
          />
          <label>lastName</label>
          <input
            type="text"
            name="lastName"
            defaultValue={lastName}
            placeholder={lastName}
          />
          <label>phone</label>
          <input
            type="text"
            name="phone"
            defaultValue={phone}
            placeholder={phone}
          />
          <label>id number</label>
          <input
            type="text"
            name="id_number"
            defaultValue={id_number}
            placeholder={id_number}
          />
          <label>role</label>
          <input
            type="text"
            name="role"
            defaultValue={role}
            placeholder={role}
          />
          <label>password</label>
          <input type="password" name="staff_password" required />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default UpdateStaff;
