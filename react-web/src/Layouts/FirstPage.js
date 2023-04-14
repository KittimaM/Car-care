import React, { useState } from "react";
import { NavLink } from "react-router-dom";
function FirstPage() {
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setErrorMessage("Example error message!");
  };

  return (
    <div>
      <ul>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register_customer">Register</NavLink>
        </li>
      </ul>
      <button onClick={handleClick}>Show error message</button>
      {errorMessage && <div> {errorMessage} </div>}
    </div>
  );
}

export default FirstPage;
