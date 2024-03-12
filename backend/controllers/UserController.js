const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.CreateUsers = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 13);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating user. Please try again later.",
    });
  }
};

exports.Login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Password does not match",
      });
    }
    
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
 //save the token into the cookie //
 
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({
      success: false,
      message: "Error during login. Please try again later.",
    });
  }
};


exports.DeleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting user. Please try again later.",
    });
  }
};

exports.GetAllUsers = async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    message: "all users",
    user,
  });
};

exports.Logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successful" });
};
