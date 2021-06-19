const OrcidStrategy = require('passport-orcid').Strategy;
const { ORCID_SANDBOX_CLIENT_ID, ORCID_SANDBOX_CLIENT_SECRET } = process.env;


module.exports = (collection) => {
    return new OrcidStrategy({
        sandbox: process.env.NODE_ENV !== 'production', // use the sandbox for non-production environments
        clientID: ORCID_SANDBOX_CLIENT_ID,
        clientSecret: ORCID_SANDBOX_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/orcid/callback"
    },
        function (accessToken, refreshToken, params, profile, done) {
            // NOTE: `profile` is empty, use `params` instead

            collection.findOne({orcid: params.orcid, name: params.name}, function (err, user) {
                if (err) {
                    console.log(err);
                }
                if (user) {
                    done(null, user);
                    console.log(params.orcid);
                } else {
                    collection.insertOne({
                        orcid: params.orcid,
                        name: params.name,
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

