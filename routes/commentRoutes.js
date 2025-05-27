const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const permission = require("../middlewares/permissionMiddleware");
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/commentController");

router.get("/", auth, permission("read"), getComments);
router.post("/", auth, permission("write"), addComment);
router.delete("/:id", auth, permission("delete"), deleteComment);

module.exports = router;
