import React from "react";

function RegisterCustomer() {
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
    alert("Register Success")
    
  };
  return (
    <form onSubmit={handleSignUp}>
      <input type="tel" name="phone" pattern="[0-9]{10}" required />
      <input type="text" name="firstName" pattern="[A-Za-z]+" required />
      <input type="text" name="lastName" pattern="[A-Za-z]+" required />
      <input type="password" name="password" required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegisterCustomer;
