const express = require("express");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/middleware.js");

const router = express.Router();

router.post("/", authMiddleware, createPostController);
