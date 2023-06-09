import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import RegisterCustomer from "../Customer/RegisterCustomer";
import Login from "../Login";
import FirstPage from "../FirstPage";
import HomeCustomer from "../Customer/HomeCustomer";
import HomeStaff from "../Staff/HomeStaff";
import RegisterStaff from "../Staff/RegisterStaff";
import DelStaff from "../Staff/DelStaff";
import UpdateStaff from "../Staff/UpdateStaff";
import CheckinStaff from "../Staff/worktime/CheckinStaff";

import CheckoutStaff from "../Staff/worktime/CheckoutStaff";
import Booking from "../Customer/Booking/Booking";
import AccessConfig from "../Staff/AccessConfig";

function Index() {
  return (
    <div>
      <BrowserRouter>
   
        <NavLink to="/">HOME</NavLink>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register_customer" element={<RegisterCustomer />} />
          <Route path="/home_customer" element={<HomeCustomer />} />
          <Route path="/home_staff" element={<HomeStaff />} />
          <Route path="/register_staff" element={<RegisterStaff />} />
          <Route path="/del_staff" element={<DelStaff />} />
          <Route path="/update_staff" element={<UpdateStaff />} />
          <Route path="/checkin_staff" element={<CheckinStaff />} />
          <Route path="/checkout_staff" element={<CheckoutStaff />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/access_config" element={<AccessConfig/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Index;
