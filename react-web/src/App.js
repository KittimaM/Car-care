// import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


import Index from "./Layouts/Navbar/Index";
import NavbarUser from "./Layouts/Navbar/NavbarUser";


function App() {
  return (
    <div className ="App">
        <Index/>
        <NavbarUser/>

        
      
        {/* <BrowserRouter>
        <NavLink to="/">HOME</NavLink>
          <Routes>
            <Route path="/" element={<NavbarUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register_customer" element={<RegisterCustomer />} />
            <Route path="/home_customer" element={<HomeCustomer />} />
            <Route path="/home_staff" element={<HomeStaff />} />
            <Route path="/register_staff" element={<RegisterStaff />} />
            <Route path="/del_staff" element={<DelStaff />} />
            <Route path="/update_staff" element={<UpdateStaff />} />
            <Route path="/checkin_staff" element={<CheckinStaff />} />
          </Routes>
          <NavbarUser/>
      </BrowserRouter>
       */}
    </div>
  );
}

export default App;
