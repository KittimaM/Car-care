const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_WORD;

//use auth when wanna use url that have to login
// const AuthStaff = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, secret);
//     if (!decoded.role) {
//       res.json({ status: "ERROR", msg: "Login wrong place" });
//     } else if (decoded.role != 1) {
//       res.json({ status: "ERROR", msg: "You doesn't have right" });
//     } else {
//       res.json({status: "OK"})
//     }
//   } catch (err) {
//     res.json({ status: "ERROR", msg: "in AuthStaff , token expired" });
//   }
// };

const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    res.json(decoded);
  } catch (err) {
    res.json({ status: "ERROR", msg: "in AuthCus , token expired" });
  }
};

// exports.AuthStaff = AuthStaff;
exports.Auth = Auth;
