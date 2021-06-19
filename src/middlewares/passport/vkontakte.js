const VKontakteStrategy = require('passport-vkontakte').Strategy;

const { VKONTAKTE_APP_ID, VKONTAKTE_APP_SECRET } = process.env;

const BASE_URL = "auth.gpntbsib.ru";


module.exports = (collection) => {

    return new VKontakteStrategy(
        {
            clientID: VKONTAKTE_APP_ID,
            clientSecret: VKONTAKTE_APP_SECRET,
            callbackURL: `http://${BASE_URL}:3000/auth/vkontakte/callback`
            
        },
        function myVerifyCallbackFn(accessToken, refreshToken, params, profile, done) {

            collection.findOne({ vkontakte_id: profile.id }, function (err, user) {
                if (err) {
                    console.log(err);
                }
                if (user) {
                    done(null, user);
                } else {
                    collection.insertOne({
                        vkontakte_id: profile.id,
                        name: profile.displayName,
                        email: params.email
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
    )
}
