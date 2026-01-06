const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },          // user ID
    process.env.SECRET_KEY,    // secret key
    { expiresIn: "24h" }       // token expiry
  );
};

module.exports = generateToken;
