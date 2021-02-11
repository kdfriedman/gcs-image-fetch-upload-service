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
        // 2nd check to verify that the user has a @hugeinc.com domain from their email
        if (
          !profile?._json?.email_verified ||
          profile?._json?.hd !== "hugeinc.com"
        ) {
          return done(new Error("You do not have suffcient access!"));
        }
        // run done middleware to continue execution and pass profile data to
        // response object to be used with route rendered template view
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
