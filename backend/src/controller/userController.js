const User = require("../models/userModels");
const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

// helpers
const emailIsValid = (e) => /\S+@\S+\.\S+/.test(String(e || ""));
const extractCleanPhone = (p) => String(p || "").replace(/\D/g, "");

// Register User Controller
const registerUser = async (req, res) => {
  try {
    const { fullName, userName, email, phone, birthdate, password } =
      req.body || {};

    // Required fields
    if (!fullName || !userName || !email || !phone || !birthdate || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Full name validation
    if (typeof fullName !== "string" || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Full name must be at least 2 characters",
      });
    }

    // Username validation
    if (typeof userName !== "string" || userName.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters",
      });
    }

    // Email validation
    if (!emailIsValid(email)) {
      return res.status(400).json({
        success: false,
        message: "Email is invalid",
      });
    }

    // Phone validation
    const cleanedPhone = extractCleanPhone(phone);
    if (cleanedPhone.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number is invalid",
      });
    }

    // Password validation
    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Birthdate validation
    const parsedBirth = new Date(birthdate);
    if (Number.isNaN(parsedBirth.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Birth date is invalid",
      });
    }

    // Existing email check
    const existingEmail = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Existing username check
    const existingUserName = await User.findOne({
      userName: userName.toLowerCase().trim(),
    });
    if (existingUserName) {
      return res.status(409).json({
        success: false,
        message: "Username already in use",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await User.create({
      fullName: fullName.trim(),
      userName: userName.trim().toLowerCase(),
      email: email.toLowerCase().trim(),
      phone: cleanedPhone,
      birthdate: parsedBirth,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken({ id: newUser._id });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        email: newUser.email,
        phone:newUser.phone,
        birthdate:newUser.birthdate
      },
    });
  } catch (error) {
    console.error("Register error:", error);
if(error.code === 11000){
  const dupKey = Object.keys(error.keyValue || {})[0];
  return res.status(400).json({
    success:false,
    message:`${dupKey} already exists.`
  })
}

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
  




module.exports = { registerUser };
