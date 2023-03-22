//check if has permission
const Conn = require("../../db");

const AddService = (req, res, next) => {
  const { car_size, use_time, price, type } = req.body;
  Conn.execute(
    `INSERT INTO service (size_id,use_time,price,type_id) 
  VALUES ((SELECT id FROM carsize WHERE car_size = ?),?,?,(SELECT id FROM typeofservice WHERE type  = ?))`,
    [car_size, use_time, price, type],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in add service", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

const DeleteService = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(
    `DELETE FROM service WHERE id = ?`,
    [id],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in del service", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

const UpdateService = (req, res, next) => {
  const { car_size, type, use_time, id, price } = req.body;
  Conn.execute(
    `UPDATE service SET size_id =(SELECT id FROM carsize WHERE car_size = ?)
    ,use_time=?,price=?,
    type_id=(SELECT id FROM typeofservice WHERE type = ?) WHERE id = ? `,
    [car_size, use_time, price, type, id],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in update service", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

exports.UpdateService = UpdateService;
exports.DeleteService = DeleteService;
exports.AddService = AddService;
