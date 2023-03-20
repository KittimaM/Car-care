import React from "react";
import "./Login.css";

function Login() {
  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      user: data.get("user"),
      password: data.get("password"),
    };
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "OK") {
          alert("login success");
          localStorage.setItem("token", data.token);
          console.log(localStorage);
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
      

    
      <div className="center">
      
      <h1 className="form-title" id="signup">Log in</h1>
      
      <form onSubmit={handleLogin}>
          <div className="txt_field">
            <input type="tel" name="user" required />
            <label>Username</label>
          </div>

          <div className="txt_field">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>

          <a className="pass" href = "/"> Forgot Password?</a>
          
          <button type="submit" className="submit-btn" > Submit</button>

          <div className="signup-link">
            <a href="/">Sign Up</a>
          </div>

      </form>
     
    </div>
    
  );

}

export default Login;
