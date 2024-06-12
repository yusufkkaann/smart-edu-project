module.exports = (roles) => {
  return (req, res, next) => {
    const role = req.body.role;
    console.log(role);
    if (roles.includes(role)) {
      next();
    } else {
      return res.status(403).json({
        message: "You are not authorized",
      });
    }
  };
};
