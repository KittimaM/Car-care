const Conn = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = "carcarecabuki";

const LoginStaff = (req, res) => {
  const { phone, staff_password  } = req.body;
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
              const token = jwt.sign({ phone: user[0].phone ,role: user[0].role_id}, secret, {
                expiresIn: "1H",
              });
              res.json({status: "OK",msg: "Login success!",token: token})
            }else{
              res.json({status: "ERROR",msg: "password is incorrect"})
            }
          }
        );
      }
    }
  );
};

exports.LoginStaff = LoginStaff;
