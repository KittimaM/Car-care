const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const { RegisterCustomer } = require("./Controllers/Customer/RegisterCustomer");
const { Login } = require("./Controllers/Login");
const {
  RegisterStaff,
  DeleteStaff,
  UpdateStaff,
} = require("./Controllers/Staff/Staff_info");
const { Auth } = require("./Controllers/Auth");
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

app.use(cors());

app.post("/register_customer", jsonParser, RegisterCustomer);
//------------------------------------------
app.post("/register_staff", jsonParser, RegisterStaff);
app.post("/del-staff", jsonParser, DeleteStaff);
app.post("/update-staff",jsonParser,UpdateStaff)
//------------------------------------------
app.post("/add-role", jsonParser, AddRoleStaff);
app.post("/del-role", jsonParser, DeleteRoleStaff);
app.post("/update-role", jsonParser, UpdateRoleStaff);
//---------------------------------------------
app.post("/add-car-size", jsonParser, AddCarSize);
app.post("/del-car-size", jsonParser, DeleteCarSize);
app.post("/update-car-size", jsonParser, UpdateCarSize);
//------------------------------------------
app.post("/login", jsonParser, Login);
app.post("/auth", jsonParser, Auth);

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
