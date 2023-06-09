const express = require("express");
const { Login } = require("../Controllers/Login");
const router = express.Router();

// GET /login
router.post("/", Login);

module.exports = router;
