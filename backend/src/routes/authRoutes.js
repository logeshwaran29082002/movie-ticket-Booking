const express = require("express");
const router = express.Router();

const { registerUser } = require("../controller/userController");
const { login } = require("../controller/logincontroller");
const authMiddleware = require("../middlewares/auth");

// Public routes
router.post("/signup", registerUser);
router.post("/login", login);

// 🔐 Protected route example
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});


module.exports = router;
