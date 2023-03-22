import React from "react";
import config from "./Config";
import axios from "axios";

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      user: data.get("user"),
      password: data.get("password"),
    };
    axios
      .post("http://localhost:5000/login", jsonData, config)
      .then((res) => {
        const data = res.data
        if (data.status === "OK") {
          localStorage.setItem("token",data.token)
          alert("login success");
          if (data.role) {
            alert("staff");
            window.location = "/home_staff";
          } else {
            alert("customer");
            window.location = "/home_customer";
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
    // <div className="container">
    //   <h1 className="text-center mb-5 text-uppercase text-muted">Login</h1>
    // </div> pattern="[0-9]{10}"
    <form onSubmit={handleLogin}>
      <input type="tel" name="user" required />
      <input type="password" name="password" required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
