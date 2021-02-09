module.exports = {
  // validate Auth, used in /success route
  // ensures that authenticated user cannot access guest only routes
  validateAuth(req, res, next) {
    if (!req.isAuthenticated()) return res.redirect("/");
    return next();
  },
  // validate guest, used in /login route
  // ensures that guest user cannot access authenticated only routes
  validateGuest(req, res, next) {
    if (!req.isAuthenticated()) return next();
    return res.redirect("/success");
  },
};
