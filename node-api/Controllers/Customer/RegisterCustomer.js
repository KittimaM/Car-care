const bcrypt = require("bcrypt");
const saltRounds = 10;
const Conn = require('../../db')

const RegisterCustomer = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    Conn.execute(
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
};

exports.RegisterCustomer = RegisterCustomer;
