const passport = require('passport');


module.exports = (req, res, next) => {
    passport.authenticate('jwt', {
        session: false
    }, function (err, user, info) {
        try {
            if (err || !user) {
                console.log(err);
                return res.status(401).send(err || 'Access denied')
            }
            if (req.params.path == user._id.toString() || user.adminCredentials == true) {
                var options = {
                    root: '/Work/auth-gpntb/sapper-registration-app/src/images/users/',

                }

                res.sendFile(req.params.path + '.jpg', options);


            } else {
                return res.status(404).send('Access denied')
            }

        } catch (error) {
            return res.send(error);
        }
    })(req, res, next)
}