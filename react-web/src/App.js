import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterCustomer from "./Layouts/Customer/RegisterCustomer";
import Login from "./Layouts/Login";
import FirstPage from "./Layouts/FirstPage";
import RegisterStaff from "./Layouts/Staff/RegisterStaff";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register_customer">Register</NavLink>
        <NavLink to="/register_staff">RegisterStaff</NavLink>
        <Routes>
          <Route path="/register_staff" element={<RegisterStaff />} />
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register_customer" element={<RegisterCustomer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
