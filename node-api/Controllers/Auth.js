const jwt = require("jsonwebtoken");
const secret = "carcarecabuki";
const Conn = require("../../db");

const AuthStaff = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    res.json({ status: "OK", decoded });
  } catch (err) {
    res.json({ status: "ERROR", msg: err });
  }
};
exports.AuthStaff = AuthStaff;
