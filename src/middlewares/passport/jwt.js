const JwtStrategy = require('passport-jwt').Strategy;
//const ExtractJwt = require('passport-jwt').ExtractJwt;
const ObjectId = require("mongodb").ObjectID;

const { NODE_ENV, JWT_SECRET } = process.env;

const opts = {};

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};

opts.jwtFromRequest = cookieExtractor;

/*opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();*/

opts.secretOrKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';




module.exports = (db) => {
    return new JwtStrategy(opts, function (jwt_payload, done) {
        const userId = new ObjectId(jwt_payload._id);
        db.findOne({_id: userId  }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);

            }
        })
    });
}