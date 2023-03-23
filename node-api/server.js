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
  RegisterStaff,
  DeleteStaff,
  UpdateStaff,
  FindOneStaff,
} = require("./Controllers/Staff/Staff_info");
const {
  AddRoleStaff,
  DeleteRoleStaff,
  UpdateRoleStaff,
  // SelectRole,
} = require("./Controllers/Staff/Role_Rights/Role");
const {
  AddCarSize,
  DeleteCarSize,
  UpdateCarSize,
  DisplayCarSize,
} = require("./Controllers/Shop/CarSize");
const {
  AddService,
  DeleteService,
  UpdateService,
} = require("./Controllers/Shop/Service");
const {
  AddChannel,
  DelChannel,
  UpdateChannel,
} = require("./Controllers/Shop/Channel");
const { AddCar, DeleteCar, UpdateCar } = require("./Controllers/Customer/Car");
const { AddIncome, AddExpenses } = require("./Controllers/Shop/Accounting");
const { Login } = require("./Controllers/Login");
const { CheckinStaff, IsCheckin } = require("./Controllers/Staff/CheckinStaff");
const { Auth } = require("./Controllers/Auth");
const {
  AddRights,
  DelRights,
  UpdateRights,
} = require("./Controllers/Staff/Role_Rights/Rights");
const { AddBranch } = require("./Controllers/Shop/Branch");
const { AddtypeService, DeltypeService, UpdatetypeService } = require("./Controllers/Shop/Typeofservice");
const { IsCheckOut, CheckOutStaff, WorkHours } = require("./Controllers/Staff/CheckoutStaff");
const { SelectOneStaff } = require("./Controllers/Staff/SelectOneStaff");
const { ServerT } = require("./Controllers/serverT");
const { SelectCar } = require("./Controllers/ฺBooking/SelectCar");
const { SelectService } = require("./Controllers/ฺBooking/SelectService");

app.use(cors());

// //--Manage who didn't logout-----------------
WorkHours()
// //--Manage who didn't logout-----------------

app.post("/login", jsonParser, Login);
app.post("/auth", jsonParser, Auth);




app.post("/booking",jsonParser,Auth,SelectCar,SelectService)


app.post("/register_cus", jsonParser, RegisterCustomer);
app.post("/update-cus", jsonParser, FindOneCus, UpdateCustomer);
app.post("/del-cus", jsonParser, FindOneCus, DeleteCustomer);
// //---
app.post("/add-car-cus", jsonParser,Auth, AddCar);
app.post("/del-car-cus", jsonParser, DeleteCar);
app.post("/update-car-cus", jsonParser, UpdateCar);

// //---

// //------------------------------------------

app.post("/checkin-staff", jsonParser, FindOneStaff, IsCheckin, CheckinStaff);
app.post("/checkout-staff",jsonParser,IsCheckOut,CheckOutStaff)
// //------------------------------------------

// ****** need authstaff ****

app.post("/register_staff", jsonParser, RegisterStaff);
app.post("/del-staff", jsonParser, FindOneStaff, DeleteStaff);
app.post("/update-staff", jsonParser, UpdateStaff); //FindOneStarr
app.post("/select-staff",jsonParser,SelectOneStaff)
//------------------------------------------

app.post("/add-role", jsonParser, AddRoleStaff);
app.post("/del-role", jsonParser, DeleteRoleStaff);
app.post("/update-role", jsonParser, UpdateRoleStaff);
// app.post("/select-role",jsonParser,SelectRole)

app.post("/add-rights",jsonParser,AddRights)
app.post("/del-rights",jsonParser,DelRights)
app.post("/update-rights",jsonParser,UpdateRights)

//---------------------------------------------
app.post("/add-car-size", jsonParser, AddCarSize);
app.post("/del-car-size", jsonParser, DeleteCarSize);
app.post("/update-car-size", jsonParser, UpdateCarSize);
app.post("/show-car-size",jsonParser,DisplayCarSize)
//------------------------------------------
app.post("/add-service", jsonParser, AddService);
app.post("/del-service", jsonParser, DeleteService);
app.post("/update-service", jsonParser, UpdateService);
//------------------------------------------
app.post("/add-income", jsonParser, AddIncome);
app.post("/add-expenses", jsonParser, AddExpenses);

app.post('/add-branch',jsonParser,AddBranch)
// ****** need authstaff ******

//--------------typeofservice--------------------
app.post("/add-type-service", jsonParser, AddtypeService);
app.post("/del-type-service",jsonParser,DeltypeService)
app.post("/update-type-service",jsonParser,UpdatetypeService)
//--------------typeofservice--------------------

// //------------------- channel ----------------------------
app.post("/add-channel", jsonParser, AddChannel);
app.post("/del-channel", jsonParser, DelChannel);
app.post("/update-channel", jsonParser, UpdateChannel);
// //------------------- channel ----------------------------




app.post('/servert',jsonParser,Auth,ServerT)

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
