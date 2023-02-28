import React from "react";
import"./Staff.css";

function RegisterStaff() {
  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      phone: data.get("phone"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      password: data.get("password"),
    };

    fetch("http://localhost:5000/register_customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    alert("Register Success");
  };
  return (
    <form onSubmit={handleSignUp}>
      <div className="form-group">
        <label for="_phone">Phone Number</label>
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
        <label for="_fname">First Name</label>
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
        <label for="_lname">Last Name</label>
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
        <label for="_password">password</label>
        <input
          type="password"
          name="password"
          id="_password"
          placeholder="Password"
          required
        />
      </div>
      {/* role
      id_number */}

      <button type="submit">Submit</button>
    </form>
  );
}

export default RegisterStaff;
