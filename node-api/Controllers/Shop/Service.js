//check if has permission
const Conn = require("../../db");

const AddService = (req, res, next) => {
  const { car_size, use_time, price, type } = req.body;
  //check if dup
  Conn.execute(
    `SELECT id FROM service WHERE (SELECT id FROM carsize WHERE car_size = ?) AND type = ?`,
    [car_size, type],
    function (err, isDuplicated) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select dup service", err });
      } else if (isDuplicated.length != 0) {
        res.json({
          status: "Duplicated",
          msg: "This type of service with this car size already have",
        });
      } else {
        //check car size
        Conn.execute(
          `SELECT id FROM carsize WHERE car_size = ?`,
          [car_size],
          function (err, isHasCarSize) {
            if (err) {
              res.json({ status: "ERROR", msg: "in insert", err });
            } else if (isHasCarSize.length == 0) {
              res.json({ status: "ERROR", msg: "this car size didn't exist" });
            } else {
              Conn.execute(
                `INSERT INTO service (size_id,use_time,type,price) VALUES (?,?,?,?)`,
                [isHasCarSize[0].id, use_time, type, price],
                function (err, result) {
                  if (err) {
                    res.json({ status: "ERROR", msg: "in insert" });
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

const DeleteService = (req, res, next) => {
  const { service_id } = req.body;
  //check if have

  Conn.execute(
    `SELECT id FROM service WHERE id = ?`,
    [service_id],
    function (err, isHaveService) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select ", err });
      } else if (isHaveService.length == 0) {
        res.json({ status: "NO Serivce" });
      } else {
        Conn.execute(
          `DELETE FROM service WHERE id = ? `,
          [isHaveService[0].id],
          function (err, result) {
            if (err) {
              res.json({ status: "ERROR", msg: err });
            } else {
              res.json({ status: "OK" });
            }
          }
        );
      }
    }
  );
};

const UpdateService = (req, res, next) => {};

exports.UpdateService = UpdateService;
exports.DeleteService = DeleteService;
exports.AddService = AddService;
