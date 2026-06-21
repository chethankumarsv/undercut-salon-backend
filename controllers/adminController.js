const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fixed Admin Credentials
    const adminEmail = "admin@gmail.com";
    const adminPassword = "123456";

    if (email !== adminEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    if (password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        email: adminEmail,
        role: "admin",
      },
      process.env.JWT_SECRET || "undercut_secret_key",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      admin: {
        email: adminEmail,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
};