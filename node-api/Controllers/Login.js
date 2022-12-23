const Conn = require("../db");

const Login = (req, res) => {
  Conn.execute(
    "SELECT * FROM customer WHERE phone=?",
    [req.body.phone],
    function (err, user) {
      if (user.length == 0) {
        Conn.execute(
          "SELECT * FROM staff WHERE phone=?",
          [req.body.phone],
          function (err, staff) {
            if (err) {
              res.json({ status: "ERROR", msg: err });
            }
            if (staff.length == 0) {
              res.json({ status: "ERROR", msg: "Account not found" });
              return;
            } else {
              res.json({ status: "STAFF", role: staff[0].role });
            }
          }
        );
      } else {
        res.json({ status: "USER", data: user[0].firstName});
      }
      // if (err) {
      //   res.json({ status: "ERROR", msg: err });
      //   return;
      // }
      // if (user.length == 0) {
      //   res.json({ status: "ERROR", msg: "user not found" });
      //   return;
      // }
      // res.json("Login success!");
      // bcrypt.compare(
      //   req.body.password,
      //   user[0].password,
      //   function(err,isLogin){

      //   }
      // )
    }
  );
};

exports.Login = Login;
