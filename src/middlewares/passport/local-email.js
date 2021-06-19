const LocalStrategy = require('passport-local').Strategy;



module.exports = (db) => {
    return new LocalStrategy({usernameField:'email', passwordField:'password'}, 
        function (email, password, done) {
            db.findOne({ email }, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (!user) {
                    console.log(err);
                    return done('User not found');
                }
                if (user.password != password) {
                    console.log(err);
                    return done('Wrong password');
                }
                
                return done(null, user);
            });
        })
  }

