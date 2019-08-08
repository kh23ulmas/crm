const JwtStrategy = require('passport-jwt').Strategy;
const ExtraJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/config');

const User = require('mongoose').model('users');

const options = {
    jwtFromRequest: ExtraJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};

module.exports = function (passport) {
    passport.use(
        new JwtStrategy(options, async (payload, done)=>{
            try {
                const user = await User.findById(payload.id).select("email id");
                if(user)
                    done(null, user);
                else
                    done(null, false);
            }
            catch (e) {
                console.log(e);
            }

        } )
    )
}
