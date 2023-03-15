const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
require("dotenv").config();

const {
  RegisterCustomer,
  UpdateCustomer,
  DeleteCustomer,
  FindOneCus,
} = require("./Controllers/Customer/Customer_info");
const {
  LoginStaff,
  LogoutStaff,
  WorkHours,
} = require("./Controllers/Staff/Login_Staff");
const {
  RegisterStaff,
  DeleteStaff,
  UpdateStaff,
  FindOneStaff,
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
const {
  AddService,
  DeleteService,
  UpdateService,
} = require("./Controllers/Shop/Service");
const { AddChannel } = require("./Controllers/Shop/Channel");
const { AddCar, DeleteCar, UpdateCar } = require("./Controllers/Customer/Car");
const { AddIncome, AddExpenses } = require("./Controllers/Shop/Accounting");
const { Login } = require("./Controllers/Login");
const { CheckinStaff, IsCheckin } = require("./Controllers/Staff/CheckinStaff");
const { Auth } = require("./Controllers/Auth");
const { SelectStaff } = require("./Controllers/SelectStaff");

app.use(cors());

//--Manage who didn't logout-----------------
WorkHours();
//--Manage who didn't logout-----------------

app.post('/',jsonParser,SelectStaff)

app.post("/login", jsonParser, Login);
app.post("/auth",jsonParser,Auth)

// app.post("/login-cus", jsonParser, LoginCus);
app.post("/register_cus", jsonParser, RegisterCustomer);
app.post("/update-cus", jsonParser, FindOneCus, UpdateCustomer);
app.post("/del-cus", jsonParser, FindOneCus, DeleteCustomer);
//---
app.post("/add-car-cus", jsonParser, AddCar);
app.post("/del-car-cus", jsonParser, DeleteCar);
app.post("/update-car-cus", jsonParser, UpdateCar);
//---

//------------------------------------------
// app.post("/login-staff", jsonParser, LoginStaff);
app.post("/checkin-staff",jsonParser,FindOneStaff,IsCheckin,CheckinStaff)
app.post("/logout-staff", jsonParser, LogoutStaff);
//------------------------------------------

// ****** need authstaff ****

app.post("/register_staff", jsonParser, RegisterStaff);
app.post("/del-staff", jsonParser, FindOneStaff, DeleteStaff);
app.post("/update-staff", jsonParser, FindOneStaff, UpdateStaff);
//------------------------------------------
app.post("/add-role", jsonParser, AddRoleStaff);
app.post("/del-role", jsonParser, DeleteRoleStaff);
app.post("/update-role", jsonParser, UpdateRoleStaff);
//---------------------------------------------
app.post("/add-car-size", jsonParser, AddCarSize);
app.post("/del-car-size", jsonParser, DeleteCarSize);
app.post("/update-car-size", jsonParser, UpdateCarSize);
//------------------------------------------
app.post("/add-service", jsonParser, AddService);
app.post("/del-service", jsonParser, DeleteService);
app.post("/update-service", jsonParser, UpdateService);
//------------------------------------------
app.post("/add-income", jsonParser, AddIncome);
app.post("/add-expenses", jsonParser, AddExpenses);

// ****** need authstaff ******

//------------------- booking ----------------------------
app.post("/add-channel", jsonParser, AddChannel);
//------------------- booking ----------------------------
app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
