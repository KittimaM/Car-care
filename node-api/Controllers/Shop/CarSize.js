//check if has permission
const Conn = require("../../db");

const AddCarSize = (req, res, next) => {
  const { car_size } = req.body;
  //check if dup
  Conn.execute(
    `SELECT id FROM carsize WHERE car_size = ?`,
    [car_size],
    function (err, isDuplicate) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select dup", err });
      }
      if (isDuplicate.length != 0) {
        res.json({
          status: "Duplicated",
          msg: "this car size already have in data",
        });
      } else {
        Conn.execute(
          `INSERT INTO carsize(car_size) VALUE (?) `,
          [car_size],
          function (err, result) {
            if (err) {
              res.json({ status: "ERROR", msg: "in insert", err });
            } else {
              res.json({ status: "OK" });
            }
          }
        );
      }
    }
  );
};

//can't delete cause foreign key
const DeleteCarSize = (req, res, next) => {
  const { car_size } = req.body;
  Conn.execute(
    `SELECT id FROM carsize WHERE car_size = ?`,
    [car_size],
    function (err, data) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select dup", err });
      } else if (data.length == 0) {
        res.json({ status: "NO CarSize" });
      } else {
        Conn.execute(
          `DELETE FROM carsize WHERE id = ? `,
          [data[0].id],
          function (err, result) {
            if (err) {
              res.json({ status: "ERROR", msg: "in delete carsize", err });
            } else {
              res.json({ status: "OK", msg: result });
            }
          }
        );
      }
    }
  );
};

const UpdateCarSize = (req, res, next) => {
  //check if dup
  const { old_car_size, new_car_size } = req.body;
  Conn.execute(
    `SELECT id FROM carsize WHERE car_size = ?`,
    [new_car_size],
    function (err, isDuplicated) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select dup", err });
      } else if (isDuplicated.length != 0) {
        res.json({ status: "Duplicated", msg: "This car size already have" });
      } else {
        // check if have
        Conn.execute(
          `SELECT id FROM carsize WHERE car_size = ?`,
          [old_car_size],
          function (err, data) {
            if (err) {
              res.json({ status: "ERROR", msg: "in select old carsize", err });
            } else if (data.length == 0) {
              res.json({ status: "NO CarSize" });
            } else {
              Conn.execute(
                `UPDATE carsize SET car_size = ? WHERE id = ?`,
                [new_car_size, data[0].id],
                function (err, result) {
                  if (err) {
                    res.json({
                      status: "ERROR",
                      msg: "in update carsize",
                      err,
                    });
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


const DisplayCarSize = (req,res,next) =>{
  Conn.execute(`SELECT car_size FROM carsize`,[],function(err,result){
    if(err){
      res.json({status: "ERROR",msg: " in display size",err})
    }else{
      res.json({status: "OK",result})
    }
  })
}

exports.DisplayCarSize = DisplayCarSize
exports.AddCarSize = AddCarSize;
exports.DeleteCarSize = DeleteCarSize;
exports.UpdateCarSize = UpdateCarSize;
