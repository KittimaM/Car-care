import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";



import RegisterCustomer from "../Customer/RegisterCustomer";
import Login from "../Login";
import FirstPage from "../FirstPage";
import HomeCustomer from "../Customer/HomeCustomer";
import HomeStaff from "../Staff/HomeStaff";
import RegisterStaff from "../Staff/RegisterStaff";
import DelStaff from "../Staff/DelStaff";
import UpdateStaff from "../Staff/UpdateStaff";
import CheckinStaff from "../Staff/CheckinStaff";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Index;

