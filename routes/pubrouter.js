const bodyParser = require('koa-body');
const Router = require('koa-router');
const walletValidator = require('wallet-address-validator');
const { sign } = require('jsonwebtoken');
var secret="secret";
//const jwt = require('koa-jwt')({secret});
const pub = new Router();
const jwt=require('jsonwebtoken');

pub.get('/', async ctx=>{
	let  dbm = ctx.dbm;
	let c;
	let a;let b;
	let articles=dbm.collection('articles');
	//console.log("CTX", ctx.state);
	try{
		c=await articles.find({lang:'en'}).toArray();
		//console.log("c :",c);
	//let r = await articles.find({}).toArray();
	//console.log("R: ",r);
	}catch(e){console.log(e);}
	ctx.body = await ctx.render('main_page', {ln: "en", articles:c, user:ctx.state.user});
})
pub.get('/ru', async ctx=>{
	let dbm = ctx.dbm;
	let c;
	let articles=dbm.collection('articles');
	try{
	
	c=await articles.find({lang:'ru'}).toArray();
//	console.log("ru: ", c);
	}catch(e){console.log(e);}
	ctx.body = await ctx.render('main_page', {ln: "ru", articles: c});
})
pub.get('/de', async ctx=>{
	let  dbm = ctx.dbm;
	let c;
	let articles=dbm.collection('articles');
	try{
		c=await articles.find({lang:'de'}).toArray();
		//console.log('de: ',c);
	}catch(e){console.log(e);}
	ctx.body = await ctx.render('main_page', {ln: "de", articles: c});
})
pub.get('/es', async ctx=>{
	let  dbm= ctx.dbm;
	let articles=dbm.collection('articles');
	let c;
	try{
		c = await articles.find({lang:'es'}).toArray();
		
	}catch(e){console.log(e);}
	ctx.body = await ctx.render('main_page', {ln: "es",  articles: c});
})
pub.get('/fr', async ctx=>{
	let c;
	let  dbm= ctx.dbm;
	let articles=dbm.collection('articles');
	try{
		c = await articles.find({lang:'fr'}).toArray();
		
	}catch(e){console.log(e);}
	
	ctx.body = await ctx.render('main_page', {ln: "fr", articles: c});
})
pub.get('/zh', async ctx=>{
	let  dbm = ctx.dbm;
	let articles = dbm.collection('articles');
	let c;
	try{
		c = await articles.find({lang:'zh'}).toArray();
		
	}catch(e){console.log(e);}
	ctx.body = await ctx.render('main_page', {ln: "zh",  articles: c});
})
pub.get('/login', async ctx=>{
	
	ctx.body = await ctx.render('login', {});
})

pub.get('/guests', async ctx=>{
	let  { db } = ctx.db;
	let c;
	try{
		c = await db.findAsync({});
		
	}catch(e){console.log(e);}
	
	ctx.body = await ctx.render('guests', { guests: c });
})
pub.post("/saveTxt", async ctx=>{
	//let  db = ctx.p;
	let  dbm = ctx.dbm;
	let c;
	let articles=dbm.collection('articles');
	let {lang, txt} = ctx.request.body;
	if(!lang || !txt)ctx.throw(400, "bad request")
	console.log(ctx.request.body);
	try{
		 c=await articles.insertOne({lang:lang, txt:txt});
		 // await db.query('insert into articles(lang,txt) values($1,$2)', [lang,txt]);
		//console.log("c: ", c);
	}catch(e){ctx.throw(400, "som error"+e)}
	
	ctx.body={lang};
})
pub.post("/saveEdit", async ctx=>{
	//let  db = ctx.p;
	let  dbm = ctx.dbm;
	let c;
	let articles=dbm.collection('articles');
	let {lang, txt, id} = ctx.request.body;
	console.log(ctx.request.body);
	if(!lang || !txt)ctx.throw(400, "bad request")
	console.log('saveEdit');
	try{
		await articles.updateOne({lang:lang},{$set:{txt:txt}});
		//await db.query('update articles set txt=$1 where lang=$2',[txt, lang]);
		
	}catch(e){ctx.throw(400, "som error"+e)}
	
	ctx.body={lang};
})


pub.post('/auth', async(ctx)=>{
	let {username, password} = ctx.request.body;
	console.log('username:', username, "pwd: ", password);
	if(username === "dima" && password === "1234"){
		const token=jwt.sign({name:username, role:"admin"} ,'secret', {expiresIn:'1h'});
		//const token = sign({username, test: "admin"}, 'secret', {expiresIn:'1h'});
		ctx.cookies.set("alik",token, {});
		ctx.body = {info: "ok",token}
		//ctx.body={token:jwt.issue({user:"user", role: 'admin'})}
		//ctx.state.user={user:"user", role:"admin"}
		//console.log("USER: ", ctx.state.user);
	}else{
		
		ctx.body= {message:'param error'}
	}
})
/*
pub.get('/fuck', jwt, async(ctx, next)=>{
	//ctx.body = await ctx.render('userinfo', {username:ctx.state.user.username})
	ctx.body={username:ctx.state.user.username}
})
*/ 
module.exports = pub;

function auth(ctx, next) {
    //for xhr
    if (ctx.isAuthenticated()) {
        return next()
    } else {
        ctx.throw(401, "Please log in.")
    }
}

function authed(ctx, next) {
    if (ctx.isAuthenticated()) {
        return next()
    } else {
        ctx.redirect('/');
    }
}
