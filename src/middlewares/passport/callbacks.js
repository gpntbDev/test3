const { NODE_ENV, JWT_SECRET } = process.env;

const passport = require('passport');

const jwt = require('jsonwebtoken');


module.exports = (scheme) => {
    return function (req, res, next) {
        passport.authenticate(scheme, function (err, user, info) {
            try {
                if (err || !user) {
                    console.log(err);
                    return res.status(401).send(err || 'An Error occured')
                }
               // console.log(req.user);
                console.log(req.body);
                const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
                console.log(token);
                //res.cookie('jwt', token, { maxAge: 168 * 3600000, httpOnly: true });
                res
                    .status(201)
                    .cookie('jwt', token, { maxAge: 24 * 3600000, httpOnly: true });
                   // .redirect(301, '/');
                if (scheme == "local" || scheme == "local-library-card") {
                    res.send({ token });
                } else {
                    res.redirect('/');
                }
            } catch (error) {
                console.log(error);
                return res.send(error);
            }
        })(req, res, next)
    }

}