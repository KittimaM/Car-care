const bcrypt = require("bcrypt");
const saltRounds = 10;
const Conn = require("../../db");

//check if have role
const RegisterStaff = (req, res, next) => {
  const { phone, firstName, lastName, staff_password, id_number, role } =
    req.body;

  bcrypt.hash(staff_password, saltRounds, function (err, hash) {
    if (err) {
      res.json({ status: "ERROR", msg: "in hash" });
    } else {
      Conn.execute(
        `INSERT INTO staff(firstName,lastName,phone,id_number,role_id,staff_password) 
      VALUES (?,?,?,?,(SELECT id FROM role WHERE name = ?),?)`,
        [firstName, lastName, phone, id_number, role, hash],
        function (err, result) {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              res.json({
                status: "Duplicated",
                msg: "This User Already Exist",
              });
            } else {
              res.json({ status: "ERROR", msg: "in insert", err });
            }
          } else {
            res.json({ status: "OK" });
          }
        }
      );
    }
  });
};

//check role
const DeleteStaff = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(`DELETE FROM staff WHERE id = ?`, [id], function (err, result) {
    if (err) {
      res.json({ status: "ERROR", msg: "in del staff", err });
    } else {
      res.json({ status: "OK" });
    }
  });
};

//check if have it or not && check if old and new data is the same
const UpdateStaff = (req, res, next) => {
 
  const { id, phone, firstName, lastName, id_number, role, staff_password } =
    req.body;
  bcrypt.hash(staff_password, saltRounds, function (err, hash) {
    if (err) {
      res.json({ status: "ERROR", msg: "in hash", err });
    } else {
      Conn.execute(
        `UPDATE staff SET phone=?,firstName=?,lastName=?,id_number=?,staff_password=?,role_id=(SELECT id FROM role WHERE name = ?) WHERE id = ?`,
        [phone, firstName, lastName, id_number, hash, role,id],
        function (err, result) {
          if (err) {
            res.json({ status: "ERROR", msg: "in update", err });
          } else {
            res.json({ status: "OK" });
          }
        }
      );
    }
  });
};

const FindOneStaff = (req, res, next) => {
  // console.log(req.body);
  const { id } = req.body;
  Conn.execute(`SELECT id FROM staff WHERE id = ?`, [id], function (err, user) {
    if (err) {
      res.json({ status: "ERROR", msg: "in select", err });
    } else if (user.length == 0) {
      res.json({ status: "No User" });
    } else {
      next();
    }
  });
};

exports.FindOneStaff = FindOneStaff
exports.RegisterStaff = RegisterStaff;
exports.DeleteStaff = DeleteStaff;
exports.UpdateStaff = UpdateStaff;
