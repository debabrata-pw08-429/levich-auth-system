const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Token = require("../models/Token");
const generateTokens = require("../utils/generateTokens");
const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_SECRET } = require("../config");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    permissions: [],
  });
  await user.save();
  res.status(201).json({ msg: "User registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
  const tokens = generateTokens(user);
  await Token.create({ userId: user._id, refreshToken: tokens.refreshToken });
  res.json(tokens);
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ msg: "Missing refresh token" });
  const stored = await Token.findOne({ refreshToken });
  if (!stored) return res.status(403).json({ msg: "Invalid refresh token" });
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    const tokens = generateTokens(user);
    stored.refreshToken = tokens.refreshToken;
    await stored.save();
    res.json(tokens);
  } catch (err) {
    res.status(403).json({ msg: "Invalid refresh token" });
  }
};

exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  await Token.findOneAndDelete({ refreshToken });
  res.json({ msg: "Logged out" });
};

exports.forgotPassword = async (req, res) => {
  // Mocked - just return success
  res.json({ msg: "Reset token generated (mocked)" });
};
