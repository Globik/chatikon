var Router=require('koa-router');
const jwt=require('jsonwebtoken');
const  passport=require('koa-passport');
const router=new Router()

/*
router.post('/auth', async ctx=>{
	let {username}=ctx.request.body;
	if(!username)ctx.throw(400, "no username")
	const token=jwt.sign({name:username, role:"admin"} ,'secret', {expiresIn:'1h'});
	console.log("token: ", token);
	console.log("USER: ", ctx.state.user);
	ctx.cookies.set("alik",token, {});
	ctx.body={info:"ok", token:token}
})
*/ 
router.get('/current',passport.authenticate('jwt', {session:false}), async ctx=>{
	console.log("STATE USER: ", ctx.state.user);
	
	ctx.body=ctx.state.user
})
module.exports=router.routes()
