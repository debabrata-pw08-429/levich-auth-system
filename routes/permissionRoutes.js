const express = require("express");
const router = express.Router();
const { setPermissions } = require("../controllers/permissionController");
const auth = require("../middlewares/authMiddleware");

router.put("/:userId", auth, setPermissions);

module.exports = router;
