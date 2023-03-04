const Conn = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const date = require("date-and-time");
const secret = process.env.SECRET_WORD;

const LoginStaff = (req, res, next) => {
  const now = new Date();
  const day = date.format(now, "YYYY-MM-DD");
  const time = date.format(now, "HH:mm:ss");
  const { phone, staff_password } = req.body;
  Conn.execute(
    `SELECT * FROM staff WHERE phone = ?`,
    [phone],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR in select", msg: err });
      } else if (user.length == 0) {
        res.json({ status: "NO USER" });
      } else {
        bcrypt.compare(
          staff_password,
          user[0].staff_password,
          function (err, isLogin) {
            if (err) {
              res.json({ status: "ERROR in compare", msg: err });
            }
            if (isLogin) {
              //save login to db
              Conn.execute(
                `INSERT INTO worktime (phone,day,start_time) VALUES ((SELECT phone FROM staff WHERE phone = ?),?,?)`,
                [user[0].phone, day, time],
                function (err, result) {
                  if (err) {
                    res.json({ status: "ERROR in insert worktime", msg: err });
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
            } else {
              res.json({ status: "ERROR", msg: "password is incorrect" });
            }
          }
        );
      }
    }
  );
};


exports.LoginStaff = LoginStaff;
