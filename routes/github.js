var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: 643aa1a64a6c95934f2a,
    clientSecret: c7df3387a5a72e940d2ee7a4932e512692708529,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));