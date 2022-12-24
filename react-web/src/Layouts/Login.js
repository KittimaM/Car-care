import React from "react";

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      phone: data.get("phone"),
      password: data.get("password"),
    };
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          alert("login success");
          localStorage.setItem("token", data.token);
          if (data.role) {
            alert("staff");
          } else {
            alert("customer");
            window.location="/home_customer"
          }
        } else if (data.status === "FAILED" || data.status === "ERROR") {
          alert(data.msg);
        } else {
          alert("Login Failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form onSubmit={handleLogin}>
      <input type="tel" name="phone" pattern="[0-9]{10}" required />
      <input type="password" name="password" required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
