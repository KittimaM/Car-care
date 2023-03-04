const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_WORD;

//use auth when wanna use url that have to login
const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    if (decoded.role == 1) {
      next();
    } else {
      res.json({ status: "ERROR", msg: "verify token" });
    }
  } catch (err) {
    res.json({ status: "ERROR", msg: "in auth" });
  }
};

exports.Auth = Auth;
