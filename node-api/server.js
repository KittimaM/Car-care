const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { RegisterCustomer } = require("./Controllers/Customer/RegisterCustomer");
const { Login } = require("./Controllers/Login");
const { RegisterStaff } = require("./Controllers/Staff/RegisterStaff");

app.use(cors());

app.post("/register_customer", jsonParser, RegisterCustomer);


app.post("/register_staff", jsonParser, RegisterStaff);

// app.get("/", function (req, res, next) {
//   connection.query("SELECT * FROM users ", function (err, results, fields) {
//     res.json(results); // results contains rows returned by server
//   });
//   const message = "U r in / path"
//   res.json(message)
// });

app.post("/login", jsonParser, Login);

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
