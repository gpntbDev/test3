const LocalStrategy = require('passport-local').Strategy;



module.exports = (db) => {
    return new LocalStrategy({usernameField:'libraryCardNumber', passwordField:'password'}, 
        function (libraryCardNumber, password, done) {
            db.findOne({ libraryCardNumber }, function (err, user) {
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

