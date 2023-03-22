const Conn = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const date = require("date-and-time");
const secret = process.env.SECRET_WORD;

const schedule = require("node-schedule");
const now = new Date();
const day = date.format(now, "YYYY-MM-DD");
const time = date.format(now, "HH:mm:ss");

const sql_cus = `SELECT * FROM customer WHERE phone = ? `;
const sql_staff = `SELECT * FROM staff WHERE id = ? `;

const Login = (req, res, next) => {
  const { user, password } = req.body;
  Conn.execute(sql_cus, [user], function (err, cus) {
    if (err) {
      res.json({ status: "ERROR", msg: "in sql cus", err });
    } else if (cus.length != 0) {
      bcrypt.compare(password, cus[0].cus_password, function (err, isLoginCus) {
        if (err) {
          res.json({ status: "ERROR", msg: "compare cus", err });
        }
        if (!isLoginCus) {
          res.json({ status: "ERROR", msg: "password incorrect" });
        } else {
          const token = jwt.sign({ phone: cus[0].phone }, secret, {
            expiresIn: "1h",
          });
          res.json({ status: "OK", token });
        }
      });
    } else {
      Conn.execute(sql_staff, [user], function (err, staff) {
        if (err) {
          res.json({ status: "ERROR", msg: "in sql staff", err });
        } else if (staff.length == 0) {
          res.json({ status: "No User" });
        } else {
          bcrypt.compare(
            password,
            staff[0].staff_password,
            function (err, isLoginStaff) {
              if (err) {
                res.json({ status: "ERROR", msg: "compare staff", err });
              }
              if (!isLoginStaff) {
                res.json({ status: "ERROR", msg: "password incorrect" });
              } else {
                const token = jwt.sign(
                  { id: staff[0].id, role: staff[0].role_id },
                  secret,
                  { expiresIn: "20h" }
                );
                res.json({
                  status: "OK",
                  role: staff[0].role_id,
                  token,
                });
              }
            }
          );
        }
      });
    }
  });
};

exports.Login = Login;
