const Router = require('koa-router');
//const ObjectId = require('mongodb').ObjectId;

const admin = new Router();

admin.get("/dashboard",async function(ctx){
	console.log("USER: ", ctx.state.user);
	let  dbm = ctx.dbm;
	let a;
	let users=dbm.collection('users');
	try{
		a = await users.estimatedDocumentCount();
		//console.log("count ", a);
	}catch(err){
		console.log(err);
	}
	ctx.body = await ctx.render('dashboard', { usercount: a });
})

admin.get('/api/getUsers', async ctx=>{
	let  dbm = ctx.dbm;
	let a;
	let users=dbm.collection('users');
	try{
		a = await users.find().sort({ _id : -1 }).limit(100).toArray();
		
		ctx.body = { content: await ctx.render('vUsers', { users: a }) }
	}catch(err){
		ctx.throw(400, err)
	}
})
module.exports = admin;
