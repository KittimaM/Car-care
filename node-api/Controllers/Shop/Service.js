//check if has permission
const Conn = require("../../db");

const AddService = (req, res, next) => {
  const { car_size, use_time, price, type } = req.body;
  //check car_size exist
  Conn.execute(
    `SELECT id FROM carsize WHERE car_size = ?`,
    [car_size],
    function (err, isHasCarSize) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select size", err });
      } else if (isHasCarSize.length == 0) {
        res.json({ status: "No Size" });
      } else {
        // check if size && type is dup
        const size_id = isHasCarSize[0].id;
        Conn.execute(
          `SELECT id FROM service WHERE (size_id = ? AND type = ?)`,
          [size_id, type],
          function (err, isDuplicated) {
            if (err) {
              res.json({ status: "ERROR", msg: "in select dup", err });
            } else if (isDuplicated.length != 0) {
              res.json({
                status: "Duplicated",
                msg: "This service already exist",
              });
            } else {
              //add service
              Conn.execute(
                `INSERT INTO service (size_id,type,price,use_time) VALUES (?,?,?,?)`,
                [size_id, type, price, use_time],
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
    function (err, isHasService) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select ", err });
      } else if (isHasService.length == 0) {
        res.json({ status: "NO Serivce" });
      } else {
        const id = isHasService[0].id;
        Conn.execute(
          `DELETE FROM service WHERE id = ? `,
          [id],
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

const UpdateService = (req, res, next) => {
  const { car_size, type, use_time, service_id, price } = req.body;

  //check if service exist
  Conn.execute(
    `SELECT id FROM service WHERE id = ?`,
    [service_id],
    function (err, isHasService) {
      if (err) {
        res.json({
          status: "ERROR",
          msg: "in select service",
          err,
        });
      } else if (isHasService.length == 0) {
        res.json({ status: "No Service" });
      } else {
        const service_id = isHasService[0].id;
        //check if car size exist
        Conn.execute(
          `SELECT id FROM carsize WHERE car_size = ?`,
          [car_size],
          function (err, isHasCarSize) {
            if (err) {
              res.json({ status: "ERROR", msg: "in select size", err });
            } else if (isHasCarSize.length == 0) {
              res.json({ status: "No Size" });
            } else {
              //check if dup
              const size_id = isHasCarSize[0].id;
              Conn.execute(
                `SELECT id FROM service WHERE (size_id = ? AND type = ? AND price = ? AND use_time =?)`,
                [size_id, type, price, use_time],
                function (err, isDuplicated) {
                  if (err) {
                    res.json({ status: "ERROR", msg: "in select dup", err });
                  } else if (isDuplicated.length != 0) {
                    res.json({
                      status: "Duplicated",
                      msg: "This service already exist",
                    });
                  } else {
                    Conn.execute(
                      `UPDATE service SET size_id = ?,type = ?,use_time =?,price = ? WHERE id = ? `,
                      [size_id, type, use_time, price, service_id],
                      function (err, result) {
                        if (err) {
                          res.json({ status: "ERROR", msg: "in update", err });
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
      }
    }
  );
};

exports.UpdateService = UpdateService;
exports.DeleteService = DeleteService;
exports.AddService = AddService;
