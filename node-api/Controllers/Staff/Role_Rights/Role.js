//check permission
const Conn = require("../../../db");

const RoleStaff = (req, res, next) => {
  Conn.execute(`SELECT * FROM role`, function (err, result) {
    res.json(result)
  })
}

const AddRoleStaff = (req, res, next) => {
  const { name, salary_perH } = req.body;
  Conn.execute(
    `SELECT id FROM role WHERE name = ?`,
    [name],
    function (err, isDuplicated) {
      if (err) {
        res.json({ status: "ERROR", msg: "in check dup", err });
      } else if (isDuplicated.length != 0) {
        res.json({ status: "Duplicated", msg: "This role already exist" });
      } else {
        Conn.execute(
          `INSERT INTO role (name,salary_perH) VALUES (?,?)`,
          [name, salary_perH],
          function (err, result) {
            if (err) {
              res.json({ status: "ERROR", msg: "in insert role", err });
            } else {
              res.json({ status: "OK" });
            }
          }
        );
      }
    }
  );
};

const DeleteRoleStaff = (req, res, next) => {
  const { name } = req.body;
  //check if have
  Conn.execute(
    `SELECT id FROM role WHERE name = ?`,
    [name],
    function (err, isHasRole) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select role", err });
      } else if (isHasRole.length == 0) {
        res.json({ status: "No Role" });
      } else {
        Conn.execute(
          `DELETE FROM role WHERE name = ?`,
          [name],
          function (err, result) {
            if (err) {
              res.json({ status: "ERROR", msg: "in del role", err });
            } else {
              res.json({ status: "OK" });
            }
          }
        );
      }
    }
  );
};

const UpdateRoleStaff = (req, res, next) => {
  const { old_name, name, salary_rate } = req.body;
  //check if new data is dup
  Conn.execute(
    `SELECT id FROM role WHERE name = ? AND salary_rate = ?`,
    [name, salary_rate],
    function (err, isDuplicated) {
      if (err) {
        res.json({ status: "ERROR", msg: "in check dup", err });
      } else if (isDuplicated.length != 0) {
        res.json({ status: "Duplicated", msg: "This role already exist" });
      } else {
        //check if this role exist
        Conn.execute(
          `SELECT id FROM role WHERE name = ? `,
          [old_name],
          function (err, role) {
            if (err) {
              res.json({ status: "ERROR", msg: "in select role", err });
            } else if (role.length == 0) {
              res.json({ status: "No Role" });
            } else {
              const id = role[0].id;
              Conn.execute(
                `UPDATE role SET name = ?,salary_rate = ?  WHERE id = ?`,
                [name, salary_rate, id],
                function (err, result) {
                  if (err) {
                    res.json({ status: "ERROR", msg: "in update role", err });
                  } else {
                    res.json({ status: "OK" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

// const SelectRole = (req,res,next)=>{
//   console.log(req.body);
//   // const {id} = req.body
//   // Conn.execute(`SELECT name FROM role WHERE id = ?`,[id],function(err,result){
//   //   if(err){
//   //     res.json({status: "ERROR",msg: 'in select role',err})
//   //   }else if(result.length == 0 ){
//   //     res.json({status: "No Role"})
//   //   }else{
//   //     res.json({status: "OK" , result : result[0]})
//   //   }
//   // })
// }

// exports.SelectRole = SelectRole
exports.RoleStaff = RoleStaff;
exports.AddRoleStaff = AddRoleStaff;
exports.DeleteRoleStaff = DeleteRoleStaff;
exports.UpdateRoleStaff = UpdateRoleStaff;
