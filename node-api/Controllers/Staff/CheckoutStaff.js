const Conn = require("../../db");
const schedule = require("node-schedule");
const date = require("date-and-time");
const now = new Date();
const day = date.format(now, "YYYY-MM-DD");
const time = date.format(now, "HH:mm:ss");
const bcrypt = require("bcrypt");

const IsCheckOut = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(
    `SELECT staff_id FROM worktime WHERE (staff_id=? AND day=? AND end_time IS NOT NULL )`,
    [id, day],
    function (err, isCheckOut) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select checkcout", err });
      } else if (isCheckOut.length != 0) {
        res.json({ status: "Duplicated", msg: "This User Already CheckOut" });
      } else {
        next();
      }
    }
  );
};

const CheckOutStaff = (req, res, next) => {
  const { id, password } = req.body;

  Conn.execute(
    `SELECT id,staff_password FROM staff WHERE id = ? `,
    [id],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select staff", err });
      } else if (user.length == 0) {
        res.json({ status: "No User" });
      } else {
        bcrypt.compare(
          password,
          user[0].staff_password,
          function (err, IsRightPass) {
            if (err) {
              res.json({
                status: "ERROR",
                msg: "in compare pass checkout",
                err,
              });
            }
            if (!IsRightPass) {
              res.json({ status: "ERROR", msg: "wrong password" });
            } else {
              Conn.execute(
                `SELECT staff_id,start_time FROM worktime WHERE staff_id=? AND day=? AND end_time IS NULL AND hours IS NULL`,
                [id, day],
                function (err, IsLogout) {
                  if (err) {
                    res.json({
                      status: "ERROR",
                      msg: "in select form worktime",
                      err,
                    });
                  } else if (IsLogout.length == 0) {
                    res.json({
                      status: "No User",
                      msg: "This staff didn't login today!",
                    });
                  } else {
                    const time_1 = new Date();
                    const time_2 = new Date();
                    const start = IsLogout[0].start_time.split(":");
                    const end = time.split(":");
                    time_1.setHours(start[0], start[1], start[2]);
                    time_2.setHours(end[0], end[1], end[2]);
                    const hours = convertMsToTime(time_2 - time_1);

                    Conn.execute(
                      `UPDATE worktime SET end_time = ? ,hours = ? WHERE staff_id = ? AND day = ?`,
                      [time, hours, id, day],
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
            }
          }
        );
      }
    }
  );
};

const WorkHours = (req, res, next) => {
  schedule.scheduleJob("0 0 * * *", function () {
    Conn.execute(
      `UPDATE worktime SET hours=?,end_time=? WHERE end_time IS NULL `,
      [8, ""],
      () => {}
    );
  });
};

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  let result = Math.round((minutes / 60) * 100) / 100;

  return result;
}

exports.IsCheckOut = IsCheckOut;

exports.WorkHours = WorkHours;

exports.CheckOutStaff = CheckOutStaff;
