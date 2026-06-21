const jwt = require("jsonwebtoken");

const protectAdmin = async (
  req,
  res,
  next
) => {
  try {
    const token =
      req.headers.authorization?.split(
        " "
      )[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "undercut_secret_key"
    );

    req.admin = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = protectAdmin;