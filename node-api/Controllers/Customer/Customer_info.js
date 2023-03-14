const bcrypt = require("bcrypt");
const saltRounds = 10;
const Conn = require("../../db");

const RegisterCustomer = (req, res) => {
  const { phone, firstName, lastName, cus_password } = req.body;
  bcrypt.hash(cus_password, saltRounds, function (err, hash) {
    if (err) {
      res.json({ status: "ERROR in hash", msg: err });
    } else {
      Conn.execute(
        `INSERT INTO customer (phone,firstName,lastName,cus_password) VALUES (?,?,?,?)`,
        [phone, firstName, lastName, hash],
        function (err, result) {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              res.json({
                status: "Duplicated",
                msg: "This User Already Exist",
              });
            } else {
              res.json({ status: "ERROR", msg: "in insert", err });
            }
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
};

const DeleteCustomer = (req, res, next) => {
  const { phone } = req.body;
  Conn.execute(
    `DELETE FROM customer WHERE phone = ?`,
    [phone],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in del cus", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

const UpdateCustomer = (req, res, next) => {
  const { old_phone, phone, firstName, lastName, cus_password } = req.body;
  bcrypt.hash(cus_password, saltRounds, function (err, hash) {
    if (err) {
      res.json({ status: "ERROR", msg: "in hash", err });
    } else {
      Conn.execute(
        `UPDATE customer SET phone=?,firstName=?,lastName=?,cus_password=? WHERE phone = ?`,
        [phone, firstName, lastName, hash, old_phone],
        function (err, result) {
          if (err) {
            res.json({ status: "ERROR", msg: "in update", err });
          } else {
            res.json({ status: "OK" });
          }
        }
      );
    }
  });
};

const FindOneCus = (req, res, next) => {
  const { phone } = req.body;
  Conn.execute(
    `SELECT phone FROM customer WHERE phone = ?`,
    [phone],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select cus", err });
      } else if (user.length == 0) {
        res.json({ status: "No User" });
      } else {
        next();
      }
    }
  );
};

exports.FindOneCus = FindOneCus;
exports.RegisterCustomer = RegisterCustomer;
exports.UpdateCustomer = UpdateCustomer;
exports.DeleteCustomer = DeleteCustomer;
