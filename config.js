module.exports = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/auth_service",
  PORT: process.env.PORT || 5000,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "access-secret",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "refresh-secret",
  ACCESS_TOKEN_EXPIRY: "15m",
  REFRESH_TOKEN_EXPIRY: "7d",
};
