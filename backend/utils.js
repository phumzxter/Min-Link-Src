const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// generate token and return it
function generateToken(user) {
  if (!user) return null;
  const { email, _id, name } = user;
  let u = {
    email,
    _id,
    name,
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
}

// return basic user details
function getCleanUser(user) {
  if (!user) return null;
  const { email, _id, name } = user;
  return {
    email,
    _id,
    name,
  };
}

module.exports = {
  generateToken,
  getCleanUser,
};
