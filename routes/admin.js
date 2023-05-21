const Router = require('koa-router');
const admin = new Router();
const jwt = require('../jwt.js')
admin.get("/people",async function(ctx){
	ctx.body={"err":'du'}
})
module.exports = admin;
