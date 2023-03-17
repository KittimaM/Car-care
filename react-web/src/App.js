//import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import RegisterCustomer from "./Layouts/Customer/RegisterCustomer";
// import Login from "./Layouts/Login";
// import FirstPage from "./Layouts/FirstPage";
// import RegisterStaff from "./Layouts/Staff/RegisterStaff";

import {Router, Route, Routes } from "react-router-dom";
import Index from "./Layouts/Navbar/Index";
import NavbarUser from "./Layouts/Navbar/NavbarUser";


function App() {
  return (
    <div className ="App">
        <NavbarUser/>

        <Index/>
        
        {/* <Routes> */}
          {/* <Route path="/register_staff" element={<RegisterStaff />} /> */}
          {/* <Route path="/" element={<FirstPage />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register_customer" element={<RegisterCustomer />} /> */}
          {/* <Route path="/Index" element={<Index />} /> */}

        {/* </Routes> */}
      
    </div>
  );
}

export default App;
