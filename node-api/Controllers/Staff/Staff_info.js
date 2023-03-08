const bcrypt = require("bcrypt");
const saltRounds = 10;
const Conn = require("../../db");

const RegisterStaff = (req, res, next) => {
  const { phone, firstName, lastName, staff_password, staff_id, role } =
    req.body;

  Conn.execute(
    `SELECT * FROM staff WHERE phone = ? OR (firstName = ? AND lastName = ? )OR staff_id = ?`,
    [phone, firstName, lastName, staff_id],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR in select from staff", msg: err });
      } else if (user.length != 0) {
        res.json({ status: "Duplicated", msg: "Already Have This Staff" });
      } else {
        bcrypt.hash(staff_password, saltRounds, function (err, hash) {
          if (err) {
            res.json({ status: "ERROR in hash password", msg: err });
          } else {
            Conn.execute(
              `INSERT INTO staff (phone,firstName,lastName,staff_password,staff_id,role_id) 
                            VALUES (?,?,?,?,?,(SELECT id FROM role WHERE name =?))`,
              [phone, firstName, lastName, hash, staff_id, role],
              function (err, result) {
                if (err) {
                  res.json({ status: "ERROR in insert", msg: err });
                } else {
                  res.json({ status: "OK", msg: "Register Staff Success !" });
                }
              }
            );
          }
        });
      }
    }
  );
};

//check role
const DeleteStaff = (req, res, next) => {
  res.json("in del");
  // const { phone, firstName, lastName, staff_id } = req.body;
  // Conn.execute(
  //   `SELECT phone FROM staff WHERE phone = ? OR ( firstName = ? AND lastName = ?)  OR staff_id = ?`,
  //   [phone, firstName, lastName, staff_id],
  //   function (err, user) {
  //     if (err) {
  //       res.json({ status: "ERROR in select", msg: err });
  //     } else if (user.length === 0) {
  //       res.json({ status: "NO USER" });
  //     } else {
  //       Conn.execute(
  //         `DELETE FROM staff WHERE phone = ? `,
  //         [user[0].phone],
  //         function (err, result) {
  //           if (err) {
  //             res.json({ status: "ERROR in del", msg: err });
  //           } else {
  //             res.json({ status: "OK", msg: "Delete Success!" });
  //           }
  //         }
  //       );
  //     }
  //   }
  // );
};

//check if have it or not && check if old and new data is the same
const UpdateStaff = (req, res, next) => {
  const {
    old_phone,
    phone,
    firstName,
    lastName,
    staff_password,
    staff_id,
    role,
  } = req.body;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    if (!decoded.role) {
      res.json({ status: "ERROR", msg: "Cus have login wrong place" });
    } else {
      Conn.execute(
        `SELECT * FROM staff WHERE phone = ?`,
        [old_phone],
        function (err, user) {
          if (err) {
            res.json({ status: "ERROR in select old_phone" });
          } else if (user.length == 0) {
            res.json({ status: "NO USER" });
          } else {
            Conn.execute(
              `SELECT * FROM staff WHERE phone=? OR (firstName=? AND lastName=?) OR staff_id=?`,
              [phone, firstName, lastName, staff_id],
              function (err, isDuplicated) {
                if (err) {
                  res.json({ status: "ERROR in select dup" });
                }
                if (isDuplicated.length != 0) {
                  res.json({
                    status: "Duplicated",
                    msg: "New data is duplicated with another record",
                  });
                } else {
                  bcrypt.hash(staff_password, saltRounds, function (err, hash) {
                    if (err) {
                      res.json({ status: "ERROR in hash" });
                    } else {
                      Conn.execute(
                        `UPDATE staff SET phone=?,firstName=?,lastName=?,staff_password=?,staff_id=?,role_id=(SELECT id FROM role WHERE name =?) 
                        WHERE phone = ?`,
                        [
                          phone,
                          firstName,
                          lastName,
                          hash,
                          staff_id,
                          role,
                          old_phone,
                        ],
                        function (err, result) {
                          if (err) {
                            res.json({ status: "ERROR in update", msg: err });
                          } else {
                            res.json({ status: "OK", msg: "Update Success!" });
                          }
                        }
                      );
                    }
                  });
                }
              }
            );
          }
        }
      );
    }
  } catch (err) {
    res.json({
      status: "ERROR in token",
      msg: "didn't have token or didn't pass value",
    });
  }
};

exports.RegisterStaff = RegisterStaff;
exports.DeleteStaff = DeleteStaff;
exports.UpdateStaff = UpdateStaff;
