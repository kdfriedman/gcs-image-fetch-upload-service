const express = require("express");
const router = express.Router();
const passport = require("passport");

// @desc    Auth With Google
// @route   GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", {
    // first check to prevent non-hugers from accessing app
    hd: "hugeinc.com",
    // Ensure the user can always select an account when sent to Google.
    prompt: "select_account",
    scope: ["profile", "email"],
  })
);

// @desc    Google Auth Callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/success");
  }
);

module.exports = router;
