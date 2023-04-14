import React from "react";

const NavCus = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location = "/";
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default NavCus;
