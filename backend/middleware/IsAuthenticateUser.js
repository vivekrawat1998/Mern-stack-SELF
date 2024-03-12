const jwt = require("jsonwebtoken");
const UserSchema = require("../models/UserSchema");

exports.IsAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token not provided",
      });
    }

    // Verify the token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded data contains user id
    if (!decodedData || !decodedData.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format: Missing user id",
      });
    }

    // Find the user based on decoded user id
    const user = await UserSchema.findById(decodedData.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};


exports.authorizedRole = (req, res, next) => {
    const user = req.user; // Assuming the user object is attached to the request

    // Check if user object or role is not defined
    if (!user || !user.role) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized access: user role is not defined",
        });
    }

    // Check if the user is an admin
    if (user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Only admins can access this resource",
        });
    }

    next();
};
