const Conn = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.SECRET_WORD;

const LoginCus = (req, res) => {
  
  const { phone, password  } = req.body;
  // Conn.execute(
  //   `SELECT * FROM customer WHERE phone = ?`,
  //   [phone],
  //   function (err, user) {
  //     if (err) {
  //       res.json({ status: "ERROR in select", msg: err });
  //     } else if (user.length == 0) {
  //       res.json({ status: "No User" });
  //     } else {
  //       bcrypt.compare(
  //         cus_password,
  //         user[0].cus_password,
  //         function (err, isLogin) {
  //           if (err) {
  //             res.json({ status: "ERROR in compare", msg: err });
  //           }
  //           if (isLogin) {
  //             const token = jwt.sign({ phone: user[0].phone}, secret, {
  //               expiresIn: "1h",
  //             });
  //             res.json({status: "OK",msg: "Login success!",token: token})
  //           }else{
  //             res.json({status: "ERROR",msg: "password is incorrect"})
  //           }
  //         }
  //       );
  //     }
  //   }
  // );
};



exports.LoginCus = LoginCus;
