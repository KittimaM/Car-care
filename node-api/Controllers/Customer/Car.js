const Conn = require("../../db");

const AddCar = (req, res, next) => {
  const { car_size, phone, id } = req.body;
  //check if have cus
  Conn.execute(
    `SELECT phone FROM customer WHERE phone = ?`,
    [phone],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select user", err });
      } else if (user.length == 0) {
        res.json({ status: "No User" });
      } else {
        const phone = user[0].phone;
        //check if right size
        Conn.execute(
          `SELECT id FROM carsize WHERE car_size = ?`,
          [car_size],
          function (err, isHasCarSize) {
            if (err) {
              res.json({ status: "ERROR", msg: "in select carsize", err });
            } else if (isHasCarSize.length == 0) {
              res.json({ status: "No Size" });
            } else {
              const size = isHasCarSize[0].id;
              // check if new data is dup
              Conn.execute(
                `INSERT INTO cuscar(id,size_id,cus_phone)
                VALUES (?,?,?)`,
                [id, size, phone],
                function (err, result) {
                  if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                      res.json({ status: "Duplicated", msg: "Already exist" });
                    } else {
                      res.json({ status: "ERROR", msg: "in insert", err });
                    }
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
  //
};

const DeleteCar = (req, res, next) => {
  const { id } = req.body;
  //check if have data
  Conn.execute(
    `SELECT id FROM cuscar WHERE id = ?`,
    [id],
    function (err, isHasCarId) {
      if (err) {
        res.json({ status: "ERROR", msg: " in check car id", err });
      } else if (isHasCarId.length == 0) {
        res.json({ status: "No Car" });
      } else {
        const id = isHasCarId[0].id;
        Conn.execute(
          `DELETE FROM cuscar WHERE id = ?`,
          [id],
          function (err, result) {
            if (err) {
              res.json({ status: "ERROR", msg: "in del cus car", err });
            } else {
              res.json({ status: "OK" });
            }
          }
        );
      }
    }
  );
};

const UpdateCar = (req, res, next) => {
  const { old_id, id, phone, car_size } = req.body;
  Conn.execute(
    `SELECT id FROM cuscar WHERE id = ?`,
    [old_id],
    function (err, isHasCarId) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select old car", err });
      } else if (isHasCarId.length == 0) {
        res.json({ status: "No Car" });
      } else {
        Conn.execute(
          `UPDATE cuscar 
          SET id = ? ,
          cus_phone = (SELECT phone FROM customer WHERE phone = ?),
          size_id = (SELECT id FROM carsize WHERE car_size = ?) 
          WHERE id = ?`,
          [id, phone, car_size, old_id],
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
};

const SelectCar = (req, res, next) => {
  const { phone } = req.decoded;
  Conn.execute(
    `SELECT id 
    FROM cuscar 
    WHERE cus_phone =?`,
    [phone],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "select car", err });
      } else if (result.length === 0) {
        res.json({ status: "No Car" });
      } else {
        res.json({ status: "OK", result: result });
      }
    }
  );
};

exports.SelectCar = SelectCar;
exports.AddCar = AddCar;
exports.DeleteCar = DeleteCar;
exports.UpdateCar = UpdateCar;
