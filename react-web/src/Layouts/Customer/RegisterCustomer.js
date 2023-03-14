import React from "react";


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


    <form onSubmit={handleSignUp}>
{/* pattern="[0-9]{10}" */}
      <input type="tel" name="phone"  required />
      <input type="text" name="firstName" pattern="[A-Za-z]+" required />
      <input type="text" name="lastName" pattern="[A-Za-z]+" required />
      <input type="password" name="password" required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegisterCustomer;
