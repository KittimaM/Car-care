const bcrypt = require("bcrypt");
const saltRounds = 10;
const Conn = require("../../db");

const RegisterStaff = (req, res, next) => {
  const { phone, firstName, lastName, staff_password, staff_id, role } =
    req.body;

  Conn.execute(
    "SELECT * FROM staff WHERE phone = ? OR (firstName = ? AND lastName = ?) OR staff_id = ? ",
    [phone, firstName, lastName, staff_id],
    function (err, user)  {
      if (user.length === 0) {
        bcrypt.hash(staff_password, saltRounds, function (err, hash) {
          Conn.execute(
            `INSERT INTO staff (phone,firstName,lastName,staff_password,role_id,staff_id)
              VALUES (?,?,?,?,(SELECT id FROM role WHERE name = ?),?)
             `,
            [phone, firstName, lastName, hash, role, staff_id],
            function(err) {
              if (err) {
                res.json({ status: "ERROR", msg: err });
                return;
              }
              res.json({ status: "OK" });
            }
          );
        });
      } else {
        res.json({ status: "ERROR", msg: "old staff" });
      }
    }
  );
};

// Conn.execute(
//   "SELECT * FROM test1 WHERE name = ? and fkey = (SELECT id FROM test2 WHERE name = ?)",
//   [firstName, role],
//   (err, result) => {
//     if (err) res.json(err);
//     res.json(result);
//   }
// );

// Conn.execute(
//   "INSERT INTO test1 (name,fkey) VALUES (?, (SELECT id FROM test2 WHERE name = ?)) ",
//   [firstName, role],
//   (err, result) => {
//     if (err) res.json(err);
//     res.json(result);
//   }
// );

exports.RegisterStaff = RegisterStaff;
