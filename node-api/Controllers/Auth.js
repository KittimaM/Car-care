const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_WORD;

const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    res.json(decoded);
  } catch (err) {
    res.json({ status: "ERROR", msg: "in Auth , token expired" });
  }
};

exports.Auth = Auth;
