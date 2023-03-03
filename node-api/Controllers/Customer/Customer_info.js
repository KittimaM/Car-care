const bcrypt = require("bcrypt");
const saltRounds = 10;
const Conn = require("../../db");

const RegisterCustomer = (req, res) => {
  const { phone, firstName, lastName, cus_password } = req.body;
  Conn.execute(
    `SELECT * FROM customer WHERE phone = ? OR (firstName = ? AND lastName = ?)`,
    [phone, firstName, lastName],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR in select", msg: err });
      } else if (user.length != 0) {
        res.json({ status: "Duplicate", msg: "Already Have This User" });
      } else {
        bcrypt.hash(cus_password, saltRounds, function (err, hash) {
          if (err) {
            res.json({ status: "ERROR in hash", msg: err });
          } else {
            Conn.execute(
              `INSERT INTO customer (phone,firstName,lastName,cus_password) VALUES (?,?,?,?)`,
              [phone, firstName, lastName, hash],
              function (err, result) {
                if (err) {
                  res.json({ status: "ERROR in insert", msg: err });
                } else {
                  res.json({
                    status: "OK",
                    msg: " Register Customer Success!",
                  });
                }
              }
            );
          }
        });
      }
    }
  );
};

const UpdateCustomer = (req, res, next) => {
  res.json("in update cus");
};

exports.RegisterCustomer = RegisterCustomer;
exports.UpdateCustomer = UpdateCustomer;
