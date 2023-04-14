const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_WORD;

const Auth = (req, res, next) => {
  // console.log(
  //   "-------------------------------------------------------------------------------------------"
  // );
  // console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    req.decoded = decoded;
    next();
  } catch (err) {
    
    res.json({ status: "ERROR", msg: "in Auth , token expired" });
  }
};

exports.Auth = Auth;
