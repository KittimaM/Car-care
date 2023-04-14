const Conn = require("../../db");

const SelectService = (req, res, next) => {
  // console.log(
  //   "+-+------------------------------------------+++++++++++++-----------"
  // );
  // console.log("req ", req.body);
  const { size } = req.body;
  Conn.execute(
    `SELECT id,use_time,price,
      (SELECT car_size FROM carsize WHERE service.size_id = carsize.id)AS size ,
       (SELECT type FROM typeofservice WHERE type_id = typeofservice.id) AS type
       FROM service
       WHERE size_id = (SELECT id FROM carsize WHERE car_size = ?);`,
    [size],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "select service", err });
      } else if (result.length === 0) {
        res.json({ status: "NO SERVICE" });
      } else {
        res.json({ status: "OK", result });
      }
    }
  );
};

exports.SelectService = SelectService;
