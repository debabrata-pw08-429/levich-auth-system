const Comment = require("../models/Comment");

exports.getComments = async (req, res) => {
  const comments = await Comment.find().populate("createdBy", "name");
  res.json(comments);
};

exports.addComment = async (req, res) => {
  const { content } = req.body;
  const comment = await Comment.create({ content, createdBy: req.user.id });
  res.status(201).json(comment);
};

exports.deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.json({ msg: "Comment deleted" });
};
