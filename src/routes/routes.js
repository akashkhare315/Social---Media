const express = require("express");
const {
  Registercontroller,
  Logincontroller,
} = require("../controller/UserController.js");

const router = express.Router();

router.post("/register", Registercontroller);
router.post("/login", Logincontroller);


module.exports = router;
