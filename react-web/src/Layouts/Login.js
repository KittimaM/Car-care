import React from "react";
import { NavLink } from "react-router-dom";
import "./Login.css";
import NavbarUser from "./Navbar/NavbarUser";

import axios from "axios";

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      user: data.get("user"),
      password: data.get("password"),
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    axios
      .post("http://localhost:5000/login", jsonData, config)
      .then((res) => {
        const data = res.data
        if (data.status === "OK") {
          localStorage.setItem("token",data.token)
          console.log("token is : ",data.token);
          alert("login success");
          if (data.role) {
            alert("staff");
            // window.location = "/home_staff";
          } else {
            alert("customer");
            window.location = "/home_customer";
          }
        } else if (data.status === "FAILED" || data.status === "ERROR") {
          // alert(data.msg);
          console.log(data.msg);
        } else {
          // alert("Login Failed");
          console.log("login failed");
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
      
    
    <div>
      <NavbarUser/> 

    
      <div className="center">
        
      
      <h1 className="form-title" >Log in</h1>
      
      <form onSubmit={handleLogin}>
          <div className="txt_field">
            <input type="tel" name="user"  required />
            <label>Username</label>
          </div>

          <div className="txt_field">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>

          <a className="pass" href = "/"> Forgot Password?</a>
          
          <button type="submit" className="submit-btn" > Submit</button>

          <div className="signup-link">
            {/* <a href="/">Sign Up</a> */}
            <NavLink to="/register_customer">Sign Up</NavLink>
          </div>

      </form>
     
    </div>
    </div>
    
  );

}

export default Login;
