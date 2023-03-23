const Conn = require("../db");

const ServerT = (req, res, next) => {
  const { phone } = req.decoded;
  Conn.execute(
    `SELECT id FROM cuscar WHERE cus_phone = ?`,
    [phone],
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
};

exports.ServerT = ServerT;
