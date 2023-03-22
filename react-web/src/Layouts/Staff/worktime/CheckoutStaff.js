import React from "react";

import axios from "axios";
const CheckoutStaff = () => {
  const handlecheckout = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      id: data.get("checkout_id"),
      password: data.get("checkout_password"),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:5000/checkout-staff", jsonData, config)
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
      <h1> Check out </h1>
      <form onSubmit={handlecheckout}>
        <div className="form-group">
          <label>staff ID</label>
          <input type="text" name="checkout_id" placeholder="id" required />
        </div>
        <div className="form-group">
          <label>password</label>
          <input
            type="password"
            name="checkout_password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CheckoutStaff;
