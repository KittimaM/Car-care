const Conn = require("../../db");
const schedule = require("node-schedule");
const date = require("date-and-time");
const now = new Date();
const day = date.format(now, "YYYY-MM-DD");
const time = date.format(now, "HH:mm:ss");
const bcrypt = require("bcrypt");

const CheckinStaff = (req, res, next) => {
  const { id, password } = req.body;
  Conn.execute(
    `SELECT id,staff_password FROM staff WHERE id=?`,
    [id],
    function (err, user) {
      if (err) {
        res.json({
          status: "ERROR",
          msg: "in select id pass checkinstaff",
          err,
        });
      } else {
        bcrypt.compare(
          password,
          user[0].staff_password,
          function (err, IsRightPass) {
            if (err) {
              res.json({ status: "ERROR", msg: "in compare pass", err });
            }
            if (!IsRightPass) {
              res.json({ status: "ERROR", msg: "wrong password" });
            } else {
              Conn.execute(
                `INSERT INTO worktime (staff_id,day,start_time) 
                VALUES (?,?,?)`,
                [user[0].id, day, time],
                function (err, result) {
                  if (err) {
                    res.json({ status: "ERROR", msg: "in insert ", err });
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

const IsCheckin = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(
    `SELECT staff_id FROM worktime WHERE staff_id=? AND day=? AND start_time IS NOT NULL`,
    [id, day],
    function (err, isCheckin) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select Ischeckin ", err });
      } else if (isCheckin.length != 0) {
        res.json({ status: "Duplicated", msg: "This User Already Checkin" });
      } else {
        next();
      }
    }
  );
};






exports.IsCheckin = IsCheckin;

exports.CheckinStaff = CheckinStaff;
