const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Registercontroller = async (req, res) => {
  const { username, password } = req.body;

  const userExist = await userModel.findOne({ username });
  if (!username) {
    res.status(401).json({ message: "Username Required" });
  }
  if (!userExist) {
    res.status(401).json({ message: "User Not found" });
  }

  const user = await userModel.create({ username, password });
  const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(201).json({ message: "registered Successfully" });
};

// const Registercontroller = async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username and password required" });
//   }

//   const userExist = await userModel.findOne({ username });
//   if (userExist) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const user = await userModel.create({
//     username,
//     password: await bcrypt.hash(password, 10),
//   });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.cookie("token", token, { httpOnly: true });

//   return res.status(201).json({ message: "Registered successfully" });
// };

// const Logincontroller = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await userModel.findOne({ username });
//   if (!user) {
//     res.status(401).json({ message: "User not Valid" });
//   }
//   const passwordmatched = user.password == password;
//   if (!passwordmatched) {
//     res.status(401).json({ message: "Unauthorised User" });
//   }
//   token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.cookie("token", token);
//   res.status(201).json({ message: "LogIn Successfully" });
// };

const Logincontroller = async (req, res) => {
  const { username, password } = req.body;
  console.log("LOGIN API HIT", req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "User not valid" });
  }

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) {
    return res.status(401).json({ message: "Unauthorized user" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successfully",
    user: {
      username: user.username,
      id: user._id,
    },
  });
};

module.exports = { Registercontroller, Logincontroller };
