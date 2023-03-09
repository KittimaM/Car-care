const Conn = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const date = require("date-and-time");
const secret = process.env.SECRET_WORD;
const schedule = require("node-schedule");

const now = new Date();
const day = date.format(now, "YYYY-MM-DD");
const time = date.format(now, "HH:mm:ss");

const LoginStaff = (req, res, next) => {
  const { phone, staff_password } = req.body;
  Conn.execute(
    `SELECT * FROM staff WHERE phone = ?`,
    [phone],
    function (err, user) {
      if (err) {
        res.json({ status: "ERROR", msg: "in select if have data", err });
      } else if (user.length == 0) {
        res.json({ status: "No User", msg: "This staff doesn't exist" });
      } else {
        bcrypt.compare(
          staff_password,
          user[0].staff_password,
          function (err, isLogin) {
            if (err) {
              res.json({ status: "ERROR", msg: "in compare password", err });
            }
            if (isLogin) {
              //check if already login
              Conn.execute(
                `SELECT phone FROM worktime WHERE phone = ? AND day = ?`,
                [phone, day],
                function (err, isDuplicated) {
                  if (err) {
                    res.json({
                      status: "ERROR",
                      msg: "in select check if already login or not",
                      err,
                    });
                  } else if (isDuplicated.length !== 0) {
                    res.json({ status: "Duplicated", msg: "Already Login" });
                  } else {
                    Conn.execute(
                      `INSERT INTO worktime (phone,day,start_time) VALUES ((SELECT phone FROM staff WHERE phone = ?),?,?)`,
                      [user[0].phone, day, time],
                      function (err, result) {
                        if (err) {
                          res.json({
                            status: "ERROR",
                            msg: "in insert worktime",
                            err,
                          });
                        } else {
                          const token = jwt.sign(
                            { phone: user[0].phone, role: user[0].role_id },
                            secret,
                            { expiresIn: "20h" }
                          );
                          res.json({
                            status: "OK",
                            msg: "Login success!",
                            token: token,
                          });
                        }
                      }
                    );
                  }
                }
              );
            } else {
              res.json({ status: "ERROR", msg: "password is incorrect" });
            }
          }
        );
      }
    }
  );
};

//check if login today // force to have note
const LogoutStaff = (req, res, next) => {
  const { phone, note } = req.body;
  //check if already log out
  Conn.execute(
    `SELECT phone FROM worktime WHERE (phone = ? AND end_time IS NOT NULL AND hours IS NOT NULL AND day=?)`,
    [phone, day],
    function (err, data) {
      if (err) {
        res.json({
          status: "ERROR",
          msg: "in select check if logout already",
          err,
        });
      } else if (data.length != 0) {
        res.json({ status: "Duplicated", msg: "This user already logout" });
      } else {
        Conn.execute(
          `SELECT phone,start_time FROM worktime WHERE phone=? AND day=? AND end_time IS NULL AND hours IS NULL`,
          [phone, day],
          function (err, user) {
            if (err) {
              res.json({
                status: "ERROR",
                msg: "in select check if login or not",
              });
            } else if (user.length == 0) {
              res.json({
                status: "No User",
                msg: "This staff didn't login today!",
              });
            } else {
              const phone = user[0].phone;
              const time_1 = new Date();
              const time_2 = new Date();
              const start = user[0].start_time.split(":");
              const end = time.split(":");
              time_1.setHours(start[0], start[1], start[2]);
              time_2.setHours(end[0], end[1], end[2]);
              const hours = convertMsToTime(time_2 - time_1);

              Conn.execute(
                `UPDATE worktime SET end_time = ?,note = ? ,hours = ? WHERE phone = ? AND day = ?`,
                [time, note, hours, phone, day],
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
};

const WorkHours = (req, res, next) => {
  schedule.scheduleJob("0 0 * * *", function () {
    Conn.execute(
      `UPDATE worktime SET hours=? WHERE end_time IS NULL `,
      [8],
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

exports.WorkHours = WorkHours;
exports.LogoutStaff = LogoutStaff;
exports.LoginStaff = LoginStaff;
