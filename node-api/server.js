var express = require("express");
var cors = require("cors");
var app = express();

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "carcare",
  password: "carcare",
  port: 3307,
});

app.use(cors());

app.get("/", function (req, res, next) {
  connection.query("SELECT * FROM `menu` ", function (err, results, fields) {
    res.json(results); // results contains rows returned by server
  });
});

app.listen(5000, function () {
  console.log("CORS-enabled web server listening on port 5000");
});
