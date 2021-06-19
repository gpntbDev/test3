
const FacebookStrategy = require('passport-facebook').Strategy;

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;


module.exports = (collection) => {

  return new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    scope: 'email',
    enableProof: false
  },
    function (accessToken, refreshToken, profile, done) {

      collection.findOne({ facebook_id: profile.id }, function (err, user) {
        if (err) {
          console.log(err);
        }
        if (user) {
          done(null, user);
        } else {
          collection.insertOne({
            facebook_id: profile.id,
            name: profile.displayName,
            email:profile.email
          }, function (err, user) {
            if (err) {
              console.log(err);
            } else {
              done(null, user);
            }
          });
        }
      });
    }
  );

}

