const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URI,
      },
      (accessToken, refreshToken, profile, done) => {
        if (
          !profile?._json?.email_verified ||
          profile?._json?.hd !== "hugeinc.com"
        ) {
          return done(new Error("You do not have suffcient access!"));
        }
        done(null, profile);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    done(null, id);
  });
};
