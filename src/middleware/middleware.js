const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthrized acsess . please login first" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ _id: decoded._id });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invlaid Token!" });
  }
}
module.exports = authMiddleware;
