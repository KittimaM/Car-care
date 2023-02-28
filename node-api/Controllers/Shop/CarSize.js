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

exports.AddCarSize = AddCarSize;
