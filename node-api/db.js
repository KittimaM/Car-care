const mysql = require("mysql2");


const Conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "carcare",
  password: "carcare",
  port: 3307,
});

module.exports = Conn