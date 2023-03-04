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
const { LoginStaff } = require("./Controllers/Staff/Login_Staff");
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
const { AuthStaff } = require("./Controllers/Staff/Auth_Staff");

app.use(cors());

app.post("/login-cus", jsonParser, LoginCus);
app.post("/register_cus", jsonParser, RegisterCustomer);
app.post("/update-cus", jsonParser, UpdateCustomer);
//------------------------------------------
app.post("/login-staff", jsonParser, LoginStaff);
app.post("/register_staff", jsonParser, RegisterStaff);
app.post("/del-staff", jsonParser, DeleteStaff);
app.post("/update-staff", jsonParser, UpdateStaff);
//------------------------------------------
app.post("/add-role", jsonParser, AddRoleStaff);
app.post("/del-role", jsonParser, DeleteRoleStaff);
app.post("/update-role", jsonParser, UpdateRoleStaff);
//---------------------------------------------
app.post("/add-car-size", jsonParser, AddCarSize);
app.post("/del-car-size", jsonParser, DeleteCarSize);
app.post("/update-car-size", jsonParser, UpdateCarSize);
//------------------------------------------

//for testing
app.post("/auth-staff", jsonParser, AuthStaff);

// auth specific owner manager
app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
