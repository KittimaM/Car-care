const Conn = require("../../db");
const date = require("date-and-time");
const schedule = require("node-schedule");
const now = new Date();
const day = date.format(now, "YYYY-MM-DD");
const time = date.format(now, "HH:mm:ss");

//service carsize and cuscar size must match

const Booking = (req, res, next) => {
  // Conn.execute(
  //   `INSERT INTO booking(service_id,cuscar_id,day,channel_id,situation) VALUES(?,?,?,?,?)`,
  //   []
  // );
};
