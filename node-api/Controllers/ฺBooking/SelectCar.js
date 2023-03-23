const Conn = require("../../db");

const SelectCar = (req, res, next) => {

    const { phone } = req.decoded;
    Conn.execute(
      `SELECT * 
      FROM cuscar 
      WHERE cus_phone =?`,
      [phone],
      function (err, result) {
        if (err) {
          res.json({ status: "ERROR", msg: "select car", err });
        } else if (result.length === 0) {
          res.json({ status: "No Car" });
        } else {
          req.car = result
          next()
        }
      }
    );
  };
  
  exports.SelectCar = SelectCar;