const Conn = require("../../db");
const date = require("date-and-time");
const schedule = require("node-schedule");
const now = new Date();
const day = date.format(now, "YYYY-MM-DD");
const time = date.format(now, "HH:mm:ss");

//add income
const AddIncome = (req, res, next) => {
  const { label, staff_phone, income } = req.body;
  Conn.execute(
    `INSERT INTO accounting (label,income,day,at_time,staff_phone,proof) VALUES (?,?,?,?,(SELECT phone FROM staff WHERE phone = ?),?)`,
    [label, income, day, time, staff_phone, ""],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in insert", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

const AddExpenses = (req, res, next) => {
  const { label, staff_phone, expenses } = req.body;
  Conn.execute(
    `INSERT INTO accounting (label,expenses,day,at_time,staff_phone,proof) VALUES (?,?,?,?,(SELECT phone FROM staff WHERE phone = ?),?)`,
    [label, expenses, day, time, staff_phone, ""],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in insert", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

exports.AddIncome = AddIncome;
exports.AddExpenses = AddExpenses;
