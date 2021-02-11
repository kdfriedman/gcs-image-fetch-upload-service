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
  // convert req object into valid json for success tempate JSON script for use on client side
  const profileData = JSON.stringify({ name: req.user?.name });
  // pass in profile user's given_name prop to render first name on client
  res.render("success", {
    props: profileData,
  });
});

module.exports = router;
