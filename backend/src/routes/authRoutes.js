const express = require("express");
const router = express.Router();

const { registerUser } = require("../controller/userController");
const { login } = require("../controller/logincontroller");

// Register route
router.post("/signup", registerUser);

// Login route
router.post("/login", login);
module.exports = router;
