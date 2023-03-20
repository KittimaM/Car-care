import React from "react";
import "./RegisterCustomer.css"


function RegisterCustomer() {
  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      phone: data.get("phone"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      cus_password: data.get("password"),
    };

    fetch("http://localhost:5000/register_cus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.status === "OK"){
        alert(data.msg)
      }else if(data.status === 'Duplicated'){
        alert(data.msg)
      }else{
        console.log(data);
      }
    })
  };
  return (

    <div className="center">
      <h1 className="form-title" id="signup">Sign Up</h1>

      <form onSubmit={handleSignUp}>
{/* pattern="[0-9]{10}" */}
      <div className="txt_field">
        <input type="tel" name="phone"  required />
        <label>Phone Number</label>
      </div>

      <div className="txt_field">
        <input type="text" name="firstName" pattern="[A-Za-z]+" required />
        <label>Firstname</label>
      </div>

      <div className="txt_field">
      <input type="text" name="lastName" pattern="[A-Za-z]+" required />
        <label>Lastname</label>
      </div>

      <div className="txt_field">
        <input type="password" name="password" required />
        <label>Password</label>
      </div>

      <button type="submit"  className="submit-btn" >Submit</button>
    </form>

    </div>
    
  );
}

export default RegisterCustomer;
