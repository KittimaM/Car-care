const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "carcare",
  password: "carcare",
  port: 3307,
});

app.use(cors());

app.post("/login_customer", jsonParser, function (req, res) {
  res.json(req.body);
});

app.post("/register_customer", jsonParser, function (req, res) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      "INSERT INTO customer (phone,firstName,lastName,password) VALUES (?,?,?,?) ",
      [req.body.phone, req.body.firstName, req.body.lastName, hash],
      function (err) {
        if (err) {
          res.json({ status: "ERROR", msg: err });
          return;
        }
        res.json({ status: "OK" });
      }
    );
  });
});

app.post("/login", jsonParser, function (req, res) {
  connection.execute(
    "SELECT * FROM customer WHERE phone=?",
    [req.body.phone],
    function (err, user, fields) {
      if (err) {
        res.json({ status: "ERROR", msg: err });
        return;
      }
      if (user.length == 0) {
        res.json({ status: "ERROR", msg: "user not found" });
        return;
      }
      bcrypt.compare(
        req.body.password,
        user[0].password,
        function(err,isLogin){
          if(isLogin){
            const token = 
          }
        }
      )
    }
  );
});

// app.get("/", function (req, res, next) {
//   connection.query("SELECT * FROM users ", function (err, results, fields) {
//     res.json(results); // results contains rows returned by server
//   });
//   const message = "U r in / path"
//   res.json(message)
// });

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
