const Router = require('koa-router');
const admin = new Router();
const jwt = require('../jwt.js')
admin.get("/people",async function(ctx){
	console.log("USER: ", ctx.state.user);
	ctx.body={"hello": `${ctx.state.user.name}! You are ${ctx.state.user.role}.`}
})
module.exports = admin;
