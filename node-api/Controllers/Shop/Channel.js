const Conn = require("../../db");
const date = require("date-and-time");
const schedule = require("node-schedule");
const now = new Date();
const day = date.format(now, "YYYY-MM-DD");
const time = date.format(now, "HH:mm:ss");

const AddChannel = (req, res, next) => {
  const { type } = req.body;
  Conn.execute(
    `INSERT INTO channel(type) VALUES (?)`,
    [type],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in insert channel", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

const DelChannel = (req, res, next) => {
  const { channel_id } = req.body;
  Conn.execute(
    `DELETE FROM channel WHERE channel_id = ? `,
    [channel_id],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in del channel", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

const UpdateChannel = (req, res, next) => {
  const { channel_id, type } = req.body;
  Conn.execute(
    `UPDATE channel SET type = ? WHERE channel_id = ?`,
    [type, channel_id],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in update channel", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

exports.AddChannel = AddChannel;
exports.DelChannel = DelChannel;
exports.UpdateChannel = UpdateChannel