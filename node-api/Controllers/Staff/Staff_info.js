const bcrypt = require("bcrypt");
const saltRounds = 10;
const Conn = require("../../db");

const RegisterStaff = (req, res, next) => {
  const { phone, firstName, lastName, staff_password, staff_id, role } =
    req.body;

  Conn.execute(
    "SELECT * FROM staff WHERE phone = ? OR (firstName = ? AND lastName = ?) OR staff_id = ? ",
    [phone, firstName, lastName, staff_id],
    function (err, user) {
      if (user.length === 0) {
        bcrypt.hash(staff_password, saltRounds, function (err, hash) {
          Conn.execute(
            `INSERT INTO staff (phone,firstName,lastName,staff_password,role_id,staff_id)
              VALUES (?,?,?,?,(SELECT id FROM role WHERE name = ?),?)
             `,
            [phone, firstName, lastName, hash, role, staff_id],
            function (err) {
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

//check if have or not
const DeleteStaff = (req, res, next) => {
  const { phone, firstName, lastName, staff_id } = req.body;
  Conn.execute(
    `DELETE FROM staff WHERE phone = ? OR ( firstName = ? AND lastName = ?)  OR staff_id = ?`,
    [phone, firstName, lastName, staff_id],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

//check if have it or not && check if old and new data is the same
const UpdateStaff = (req, res, next) => {
  const { new_role } = req.body;
  const {old_role} = req.body
  Conn.execute(
    `UPDATE staff SET role_id = (SELECT id FROM role WHERE name = ?) 
    WHERE role_id = (SELECT id FROM role WHERE name = ?)`,
    [new_role, old_role],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: err });
      } else {
        res.json(result);
      }
    }
  );
};

exports.RegisterStaff = RegisterStaff;
exports.DeleteStaff = DeleteStaff;
exports.UpdateStaff = UpdateStaff;
