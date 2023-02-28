//check if has permission
const Conn = require("../../db");

const AddCarSize = (req, res, next) => {
  const { car_size } = req.body;

  Conn.execute(
    `INSERT INTO carsize(car_size) VALUE (?) `,
    [car_size],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: err });
      } else {
        res.json({ status: "OK", msg: result });
      }
    }
  );
};

const DeleteCarSize = (req, res, next) => {
  const { car_size } = req.body;
  Conn.execute(
    `DELETE FROM carsize WHERE car_size = ? `,
    [car_size],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: err });
      } else {
        res.json({ status: "OK", msg: result });
      }
    }
  );
};

const UpdateCarSize = (req, res, next) => {
  const { old_car_size, new_car_size } = req.body;
  Conn.execute(
    `UPDATE carsize SET car_size = ? WHERE car_size = ?`,
    [new_car_size, old_car_size],
    function (err, result) {
      if(err){
        res.json({status: "ERROR" , msg: err})
      }else{
        res.json({status: "OK" , msg: result})
      }
    }
  );
};

exports.AddCarSize = AddCarSize;
exports.DeleteCarSize = DeleteCarSize;
exports.UpdateCarSize = UpdateCarSize
