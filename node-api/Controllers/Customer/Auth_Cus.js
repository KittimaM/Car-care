const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_WORD;
const Conn = require("../../db");

const Auth = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    res.json({ status: "OK", decoded });
  } catch (err) {
    res.json({ status: "ERROR", msg: err });
  }
};
exports.Auth = Auth;
