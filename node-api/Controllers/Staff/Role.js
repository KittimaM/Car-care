//check permission
const Conn = require("../../db");

const AddRoleStaff = (req, res, next) => {
  const { name } = req.body;
  Conn.execute("INSERT INTO role (name) VALUES (?)", [name], function (err) {
    if (err) {
      res.json({ status: "ERROR", msg: err });
      return;
    }
    res.json({ status: "OK" });
  });
};

const DeleteRoleStaff = (req, res, next) => {
  const { name } = req.body;
  Conn.execute(
    `DELETE FROM role WHERE name = ?`,
    [name],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

//check if duplicate
const UpdateRoleStaff = (req, res, next) => {
  const { old_name, new_name } = req.body;
  Conn.execute(
    `UPDATE role SET name = ? WHERE name = ?`,
    [new_name, old_name],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

exports.AddRoleStaff = AddRoleStaff;
exports.DeleteRoleStaff = DeleteRoleStaff;
exports.UpdateRoleStaff = UpdateRoleStaff
