const Conn = require("../../db");

const SelectOneStaff = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(`SELECT * FROM staff WHERE id = ?`, [id], function (err, user) {
    if (err) {
      res.json({ status: "ERROR", msg: "in selectonestaff", err });
    } else if (user.length == 0) {
      res.json({ status: "No User" });
    } else {
      Conn.execute(`SELECT name FROM role WHERE id = ?`,[user[0].role_id],function(err,role){
        if(err){
          res.json({status: "ERROR",msg: "in selectrole",err})
        }else if(role.length == 0){
          res.json({status: "No Role"})
        }else{
          res.json({status: "OK",user: user[0],role: role[0]})
        }
      })
    }
  });
};

exports.SelectOneStaff = SelectOneStaff;
