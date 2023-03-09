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

const DeleteCustomer = (req, res, next) => {
  const { phone } = req.body;
  //check if have
  Conn.execute(
    `SELECT phone FROM customer WHERE phone = ?`,
    [phone],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select cus", err });
      } else if (user.length == 0) {
        res.json({ status: "No User" });
      } else {
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
      }
    }
  );
};

const UpdateCustomer = (req, res, next) => {
  //check if have cus
  const { old_phone, phone, firstName, lastName, cus_password } = req.body;
  Conn.execute(
    `SELECT phone FROM customer WHERE phone = ? `,
    [old_phone],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select cus", err });
      } else if (user.length == 0) {
        res.json({ status: "No User" });
      } else {
        //check if new data is dup
        Conn.execute(
          `SELECT phone FROM customer WHERE phone = ? AND firstName = ? AND lastName = ?`,
          [phone, firstName, lastName],
          function (err, isDuplicated) {
            if (err) {
              res.json({ status: "ERROR", msg: " in select dup", err });
            } else if (isDuplicated.length != 0) {
              res.json({
                status: "Duplicated",
                msg: "This User already exist",
              });
            } else {
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
            }
          }
        );
      }
    }
  );
};

exports.RegisterCustomer = RegisterCustomer;
exports.UpdateCustomer = UpdateCustomer;
exports.DeleteCustomer = DeleteCustomer;
