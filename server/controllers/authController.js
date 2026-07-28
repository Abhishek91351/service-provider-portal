const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    res.status(201).json({
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        message: "Invalid Credentials",
      });

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match)
      return res.status(400).json({
        message: "Invalid Credentials",
      });

    res.json({
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};