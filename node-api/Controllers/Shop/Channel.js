const Conn = require("../../db");
const date = require("date-and-time");
const schedule = require("node-schedule");
const now = new Date();
const day = date.format(now, "YYYY-MM-DD");
const time = date.format(now, "HH:mm:ss");

const AddChannel = (req, res, next) => {
  const { channel_id, period ,type} = req.body;
  Conn.execute(
    `INSERT INTO channel(id,period) VALUES (?,?)`,
    [channel_id, period],
    function (err, result) {
      res.json(result);
    }
  );
};

// upate del

exports.AddChannel = AddChannel;
