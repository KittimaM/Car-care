const bcrypt = require("bcrypt");
const saltRounds = 10;
const Conn = require('../../db')

const RegisterStaff = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    Conn.execute(
      "INSERT INTO staff (phone,firstName,lastName,password,role) VALUES (?,?,?,?,?) ",
      [req.body.phone, req.body.firstName, req.body.lastName, hash,req.body.role],
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

exports.RegisterStaff = RegisterStaff;
