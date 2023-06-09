// สร้างสิทธิให้ครบแล้วลบไฟล์นี้ทิ้ง
const Conn = require("../../../db");
// check auth
const AddRights = (req, res, next) => {
  const { rights } = req.body;
  Conn.execute(
    `ALTER TABLE role ADD COLUMN ${rights} boolean DEFAULT false`,
    [],
    function (err, result) {
      if (err) {
        if (err.code === "ER_DUP_FIELDNAME") {
          res.json({ status: "Duplicated" });
        } else {
          res.json({ status: "ERROR", msg: "add rights", err });
        }
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

const DelRights = (req, res, next) => {
  const { rights } = req.body;
  Conn.execute(
    `ALTER TABLE role DROP COLUMN ${rights}`,
    [],
    function (err, result) {
      if (err) {
        if (err.code === "ER_CANT_DROP_FIELD_OR_KEY") {
          res.json({ status: "ERROR", msg: "This Rights No longer Exist" });
        } else {
          res.json({ status: "ERROR", msg: "in del rights", err });
        }
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

const UpdateRights = (req, res, next) => {
  const { old_rights, rights } = req.body;
  Conn.execute(
    `ALTER TABLE role RENAME COLUMN ${old_rights} TO ${rights}`,
    [],
    function (err, result) {
      if (err) {
        if (err.code === "ER_BAD_FIELD_ERROR") {
          res.json({ status: "No Rights" });
        } else if (err.code === "ER_DUP_FIELDNAME") {
          res.json({ status: "Duplicated" });
        } else {
          res.json({ status: "ERROR", msg: "in update rights", err });
        }
      } else {
        res.json({ status: "OK" });
      }
    }
  );
};

exports.AddRights = AddRights;
exports.DelRights = DelRights;
exports.UpdateRights = UpdateRights;
