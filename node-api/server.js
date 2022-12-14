const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const { RegisterCustomer } = require("./Controllers/Customer/RegisterCustomer");
const { Login } = require("./Controllers/Login");
const { RegisterStaff } = require("./Controllers/Staff/RegisterStaff");
const { Auth } = require("./Controllers/Auth");

app.use(cors());

app.post("/register_customer", jsonParser, RegisterCustomer);

app.post("/register_staff", jsonParser, RegisterStaff);

app.post("/login", jsonParser, Login);

app.post("/auth",jsonParser,Auth)

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
