const Conn = require("../../db");

const AddtypeService = (req, res, next) => {
  const { type } = req.body;
  Conn.execute(
    `INSERT INTO typeofservice(type) VALUES (?)`,
    [type],
    function (err, result) {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.json({ status: "Duplicated" });
        } else {
          res.json({ status: "ERROR", msg: "in add typeofservice", err });
        }
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

const DeltypeService = (req, res, next) => {
  const { id } = req.body;
  Conn.execute(
    `DELETE FROM typeofservice WHERE id = ?`,
    [id],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in del typeofservice", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

const UpdatetypeService = (req, res, next) => {
  const { id, type } = req.body;
  Conn.execute(
    `UPDATE typeofservice SET type = ? WHERE id = ?`,
    [type, id],
    function (err, result) {
      if (err) {
        res.json({ status: "ERROR", msg: "in update typeofservice", err });
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

exports.AddtypeService = AddtypeService;
exports.DeltypeService = DeltypeService;
exports.UpdatetypeService = UpdatetypeService
