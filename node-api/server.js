const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
require("dotenv").config();

const {
  RegisterCustomer,
  UpdateCustomer,
} = require("./Controllers/Customer/Customer_info");
const { LoginStaff, LogoutStaff } = require("./Controllers/Staff/Login_Staff");
const {
  RegisterStaff,
  DeleteStaff,
  UpdateStaff,
} = require("./Controllers/Staff/Staff_info");
const {
  AddRoleStaff,
  DeleteRoleStaff,
  UpdateRoleStaff,
} = require("./Controllers/Staff/Role");
const {
  AddCarSize,
  DeleteCarSize,
  UpdateCarSize,
} = require("./Controllers/Shop/CarSize");
const { LoginCus } = require("./Controllers/Customer/Login_Cus");
const { AuthStaff } = require("./Controllers/Auth");
const {
  AddService,
  DeleteService,
  UpdateService,
} = require("./Controllers/Shop/Service");

app.use(cors());

app.post("/login-cus", jsonParser, LoginCus);
app.post("/register_cus", jsonParser, RegisterCustomer);
app.post("/update-cus", jsonParser, UpdateCustomer);
//------------------------------------------
app.post("/login-staff", jsonParser, LoginStaff);
app.post("/logout-staff", jsonParser, LogoutStaff);
//------------------------------------------



// ****** need authstaff ****

app.post("/register_staff", jsonParser, AuthStaff, RegisterStaff);
app.post("/del-staff", jsonParser, AuthStaff, DeleteStaff);
app.post("/update-staff", jsonParser, AuthStaff, UpdateStaff);
//------------------------------------------
app.post("/add-role", jsonParser, AuthStaff, AddRoleStaff);
app.post("/del-role", jsonParser, AuthStaff, DeleteRoleStaff);
app.post("/update-role", jsonParser, AuthStaff, UpdateRoleStaff);
//---------------------------------------------
app.post("/add-car-size", jsonParser, AuthStaff, AddCarSize);
app.post("/del-car-size", jsonParser, AuthStaff, DeleteCarSize);
app.post("/update-car-size", jsonParser, AuthStaff, UpdateCarSize);
//------------------------------------------
app.post("/add-service", jsonParser, AuthStaff, AddService);
app.post("/del-service", jsonParser, AuthStaff, DeleteService);
app.post("/update-service", jsonParser, AuthStaff, UpdateService);

// ****** need authstaff ****

//for testing
// app.post("/auth-staff", jsonParser, AuthStaff);

// auth specific owner manager
app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
