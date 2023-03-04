const Conn = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const date = require("date-and-time");
const secret = process.env.SECRET_WORD;


const now = new Date();
const day = date.format(now, "YYYY-MM-DD");
const time = date.format(now, "HH:mm:ss");

const LoginStaff = (req, res, next) => {
  const { phone, staff_password } = req.body;
  Conn.execute(
    `SELECT * FROM staff WHERE phone = ?`,
    [phone],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select if have data", err });
      } else if (user.length == 0) {
        res.json({ status: "NO USER", msg: "This staff doesn't exist" });
      } else {
        bcrypt.compare(
          staff_password,
          user[0].staff_password,
          function (err, isLogin) {
            if (err) {
              res.json({ status: "ERROR", msg: "in compare password", err });
            }
            if (isLogin) {
              //check if already login
              Conn.execute(
                `SELECT phone FROM worktime WHERE phone = ? AND day = ?`,
                [phone, day],
                function (err, isDuplicated) {
                  if (err) {
                    res.json({
                      status: "ERROR",
                      msg: "in select check if already login or not",
                      err,
                    });
                  } else if (isDuplicated.length !== 0) {
                    res.json({ status: "Duplicated", msg: "Already Login" });
                  } else {
                    Conn.execute(
                      `INSERT INTO worktime (phone,day,start_time) VALUES ((SELECT phone FROM staff WHERE phone = ?),?,?)`,
                      [user[0].phone, day, time],
                      function (err, result) {
                        if (err) {
                          res.json({
                            status: "ERROR",
                            msg: "in insert worktime",
                            err,
                          });
                        } else {
                          const token = jwt.sign(
                            { phone: user[0].phone, role: user[0].role_id },
                            secret,
                            { expiresIn: "1d" }
                          );
                          res.json({
                            status: "OK",
                            msg: "Login success!",
                            token: token,
                          });
                        }
                      }
                    );
                  }
                }
              );
            } else {
              res.json({ status: "ERROR", msg: "password is incorrect" });
            }
          }
        );
      }
    }
  );
};

//check if login today
const LogoutStaff = (req, res, next) => {
  const { phone, note } = req.body;
  Conn.execute(
    `SELECT phone FROM worktime WHERE phone=? AND day=?`,
    [phone, day],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select check if login or not" });
      } else if (user.length == 0) {
        res.json({ status: "NO USER", msg: "This staff didn't login today!" });
      } else {
        if (!note) {
          Conn.execute(
            `UPDATE worktime SET end_time = ? WHERE phone = ? AND day = ?`,
            [time, phone, day],
            function (err, result) {
              if (err) {
                res.json({
                  status: "ERROR",
                  msg: "in update without note",
                  err,
                });
              } else {
                res.json({ status: "OK", msg: "Logout Success!" });
              }
            }
          );
        } else {
          Conn.execute(
            `UPDATE worktime SET end_time = ?,note =? WHERE phone = ? AND day = ?`,
            [time, note, phone, day],
            function (err, result) {
              if (err) {
                res.json({ status: "ERROR", msg: "in update with note", err });
              } else {
                res.json({ status: "OK", msg: "Logout Success!" });
              }
            }
          );
        }
      }
    }
  );
};

exports.LogoutStaff = LogoutStaff;
exports.LoginStaff = LoginStaff;
