const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../model/user');
const keys = process.env.SECRET || '';

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = (passport) => {
	passport.use(
		'admin-rule',
		new JwtStrategy(opts, async (payload, done) => {
			console.log(payload);
			console.log('admin signin');
			const user = await User.findOne({
				_id: payload._id,
			}).select('_id name userName');
			console.log({ user });
			if (!user) return done(null, false);
			return done(null, user);
		})
	);
};
