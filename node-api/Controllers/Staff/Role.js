//check permission
const Conn = require("../../db");

const AddRoleStaff = (req, res, next) => {
  const name = req.body.name;
  Conn.execute("INSERT INTO role (name) VALUES (?)", [name], function (err) {
    if (err) {
      res.json({ status: "ERROR", msg: err });
      return;
    }
    res.json({ status: "OK" });
  });
};

exports.AddRoleStaff = AddRoleStaff;
