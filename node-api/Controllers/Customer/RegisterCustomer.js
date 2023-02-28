const bcrypt = require("bcrypt");
const saltRounds = 10;
const Conn = require("../../db");

const RegisterCustomer = (req, res) => {
  const { phone, firstName, lastName, password, role } = req.body;
  Conn.execute(
    "SELECT * FROM customer WHERE phone = ? OR (firstName = ? AND lastName = ?) ",
    [phone, firstName, lastName],
    (err, user) => {
      if (user.length === 0) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          Conn.execute(
            "INSERT INTO customer (phone,firstName,lastName,password) VALUES (?,?,?,?) ",
            [phone, firstName, lastName, hash],
            function (err) {
              if (err) {
                res.json({ status: "ERROR", msg: err });
                return;
              }
              res.json({ status: "OK" });
            }
          );
        });
      } else {
        res.json({ status: "ERROR", msg: "you are already have an account" });
      }
    }
  );
};

exports.RegisterCustomer = RegisterCustomer;
