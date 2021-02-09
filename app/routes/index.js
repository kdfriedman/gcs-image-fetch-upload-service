const express = require("express");
const router = express.Router();
const { validateAuth, validateGuest } = require("../middleware/auth");

// @desc    Login/Landing page
// @route   GET /
router.get("/", validateGuest, (req, res) => {
  res.render("login");
});

// @desc    Success Page
// @route   GET /success
router.get("/success", validateAuth, (req, res) => {
  console.log(req.user);
  res.render("success", { name: req.user?.name?.givenName });
});

module.exports = router;
