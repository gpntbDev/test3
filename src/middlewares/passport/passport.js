const passportLocalEmail = require('./local-email');
const passportLocalLibraryCard = require('./local-library-card');
const passportJwt = require('./jwt');
const passportAdminJwt = require('./jwt-admin');
const passportFacebook = require('./facebook');
const passportVkontakte = require('./vkontakte');
const passportOrcid = require('./orcid');

module.exports = function(passport, collection) {

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {

    collection.findOne({ _id: id }, function (err, user) {
        if (err) {
            return done(err);
        }
        done(null, user);
    });
});

passport.use(passportLocalEmail(collection));
passport.use('local-library-card', passportLocalLibraryCard(collection));
passport.use(passportJwt(collection));
passport.use('jwt-admin', passportAdminJwt(collection));
passport.use(passportFacebook(collection));
passport.use(passportVkontakte(collection));
passport.use(passportOrcid(collection));

}


