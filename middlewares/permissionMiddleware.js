const permissionMiddleware = (requiredPermission) => (req, res, next) => {
  if (req.user.permissions.includes(requiredPermission)) return next();
  return res.status(403).json({ msg: "Permission denied" });
};

module.exports = permissionMiddleware;
