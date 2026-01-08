const express = require("express");
const router = express.Router();

const { registerUser } = require("../controller/userController");
const { login } = require("../controller/logincontroller");

// Public routes
router.post("/signup", registerUser);
router.post("/login", login);




module.exports = router;
