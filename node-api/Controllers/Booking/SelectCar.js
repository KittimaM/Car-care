const Conn = require("../../db");

const SelectCar = (req, res, next) => {
  const { phone } = req.decoded;
  Conn.execute(
    `SELECT id,cus_phone,
    (SELECT car_size FROM carsize WHERE cuscar.size_id = carsize.id)
    AS size 
    FROM cuscar WHERE cus_phone = ?`,
    [phone],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "select car", err });
      } else if (result.length === 0) {
        res.json({ status: "No Car" });
      } else {
      
        res.json({ status: "OK", result });
      }
    }
  );
};

exports.SelectCar = SelectCar;
