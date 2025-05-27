const User = require("../models/User");
exports.setPermissions = async (req, res) => {
  const { userId } = req.params;
  const { permissions } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { permissions },
    { new: true }
  );
  res.json(user);
};
