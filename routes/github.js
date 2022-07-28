const passport = require('passport');
const router = require('./indexRoute');

var GitHubStrategy = require('passport-github').Strategy;

let githubLogin = new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
);

module.exports = passport.use(githubLogin).use(loalLogin);

router.get("/github", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github"),
  function (req, res) {
    res.redirect("/reminders");
  }
);