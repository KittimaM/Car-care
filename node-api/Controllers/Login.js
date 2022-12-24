const Conn = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = "carcarecabuki";

const Login = (req, res) => {
  Conn.execute(
    "SELECT * FROM customer WHERE phone=?",
    [req.body.phone],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR", msg: err });
      }
      if (user.length == 0) {
        Conn.execute(
          "SELECT * FROM staff WHERE phone=?",
          [req.body.phone],
          function (err, staff) {
            if (err) {
              res.json({ status: "ERROR", msg: err });
            }
            if (staff.length == 0) {
              res.json({ status: "ERROR", msg: "account not found" });
            } else {
              bcrypt.compare(
                req.body.password,
                staff[0].password,
                function (err, isLogin) {
                  if (err) {
                    res.jon({ status: "ERROR", msg: err });
                  }
                  if (isLogin) {
                    const token = jwt.sign({ phone: staff[0].phone }, secret, {
                      expiresIn: "1d",
                    });
                    res.json({
                      status: "OK",
                      msg: "login success",
                      token,
                      role: staff[0].role
                    });
                  } else {
                    res.json({
                      status: "FAILED",
                      msg: "password is incorrect",
                    });
                  }
                }
              );
            }
          }
        );
      } else {
        bcrypt.compare(
          req.body.password,
          user[0].password,
          function (err, isLogin) {
            if (err) {
              res.jon({ status: "ERROR", msg: err });
            }
            if (isLogin) {
              const token = jwt.sign({ phone: user[0].phone }, secret, {
                expiresIn: "1h",
              });
              res.json({ status: "OK", msg: "login success", token});
            } else {
              res.json({ status: "FAILED", msg: "password is incorrect" });
            }
          }
        );
      }
    }
  );
  // Conn.execute(
  //   "SELECT * FROM customer WHERE phone=?",
  //   [req.body.phone],
  //   function (err, user) {
  //     if (user.length == 0) {
  //       Conn.execute(
  //         "SELECT * FROM staff WHERE phone=?",
  //         [req.body.phone],
  //         function (err, staff) {
  //           if (err) {
  //             res.json({ status: "ERROR", msg: err });
  //           }
  //           if (staff.length == 0) {
  //             res.json({ status: "ERROR", msg: "Account not found" });
  //             return;
  //           } else {
  //             bcrypt.compare(
  //               req.body.password,
  //               staff[0].password,
  //               function (isLogin) {
  //                 if (isLogin) {
  //                   res.json({ status: "password correct!" });
  //                 } else {
  //                   res.json({ status: "failed" });
  //                 }
  //               }
  //             );
  //           }
  //         }
  //       );
  //     } else {
  //       bcrypt.compare(req.body.password, user[0].password, function (isLogin) {
  //         if (isLogin) {
  //           res.json({ status: "password correct!" });
  //         } else {
  //           res.json({ status: "failed" });
  //         }
  //       });
  //     }
  //     if (err) {
  //       res.json({ status: "ERROR", msg: err });
  //       return;
  //     }
  //     if (user.length == 0) {
  //       res.json({ status: "ERROR", msg: "user not found" });
  //       return;
  //     }
  //     res.json("Login success!");
  //   }
  // );
};

exports.Login = Login;
