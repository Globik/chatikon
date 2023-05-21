/*const jwt = require('koa-jwt');
const jwtin = jwt({secret:'secret'});
const jsonwebtoken = require('jsonwebtoken')
function jwterrorhandler(ctx, next){
	return next().catch((err)=>{
		if(401 == err.status){
			ctx.status = 401;
			ctx.body={"error":"not authorized"}
		}else{throw err;}
	});
}
module.exports.jwt=()=>jwtin;
module.exports.errorhandler =()=>jwterrorhandler;
module.exports.issue = (payload)=>{
	return jsonwebtoken.sign(payload, 'secret');
}
*/

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
//opts.secretOrPrivateKey='secret';
module.exports=(passport)=>{
	passport.use(new JwtStrategy(opts, async(jwt_payload, done)=>{
		console.log('**********************jwt_payload********************:', jwt_payload);
		return done(null, {name:"alik", role:"admin"});
	}));
}

function kok(req){
	var token=null;
	if(req && req.cookies){
		token=req.cookies['alik']
	}
	return token;
}
