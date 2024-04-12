


const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema.js");

const  isAdminAuthonticated = async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Admin is not authenticated",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `${req.user.role} is not authorized`,
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token",
    });
  }
};

const isUserAuthonticated = async (req, res, next) => {
  const token = req.cookies.userToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User is not authenticated",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== 'user') {
      return res.status(401).json({
        success: false,
        message: `${req.user.role} is not authorized`,
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired user token",
    });
  }
};

module.exports = { isAdminAuthonticated, isUserAuthonticated };
