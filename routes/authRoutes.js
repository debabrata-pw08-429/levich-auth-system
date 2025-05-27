const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  refreshToken,
  logout,
  forgotPassword,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);

module.exports = router;
