const bodyParser = require('koa-body');
const Router = require('koa-router');
const walletValidator = require('wallet-address-validator');
const { sign } = require('jsonwebtoken');
var secret="secret";
//const jwt = require('koa-jwt')({secret});
const pub = new Router();
const jwt=require('jsonwebtoken');
const passport = require('koa-passport');

pub.get('/', async ctx=>{
	console.log("STATE USER:", ctx.state.user);
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

pub.get('/login', async ctx=>{
	console.log("is auth? ", ctx.isAuthenticated());
	 if (!ctx.isAuthenticated()) {
	ctx.body = await ctx.render('login', { ln: 'en' });
}else{
	 return ctx.redirect('/');
}
})


pub.get('/ru/login', async ctx=>{
	console.log("is auth? ", ctx.isAuthenticated());
	 if (!ctx.isAuthenticated()) {
	ctx.body = await ctx.render('login', { ln: 'ru' });
}else{
	 return ctx.redirect('/');
}
})


pub.get('/de/login', async ctx=>{
	console.log("is auth? ", ctx.isAuthenticated());
	 if (!ctx.isAuthenticated()) {
	ctx.body = await ctx.render('login', { ln: 'de' });
}else{
	 return ctx.redirect('/');
}
})



pub.get('/fr/login', async ctx=>{
	console.log("is auth? ", ctx.isAuthenticated());
	 if (!ctx.isAuthenticated()) {
	ctx.body = await ctx.render('login', { ln: 'fr' });
}else{
	 return ctx.redirect('/');
}
})


pub.get('/es/login', async ctx=>{
	console.log("is auth? ", ctx.isAuthenticated());
	 if (!ctx.isAuthenticated()) {
	ctx.body = await ctx.render('login', { ln: 'es' });
}else{
	 return ctx.redirect('/');
}
})

pub.get('/zh/login', async ctx=>{
	console.log("is auth? ", ctx.isAuthenticated());
	 if (!ctx.isAuthenticated()) {
	ctx.body = await ctx.render('login', { ln: 'zh' });
}else{
	 return ctx.redirect('/');
}
})

pub.post('/login', async(ctx, next)=>{
	 if (!ctx.isAuthenticated()) {
		   return passport.authenticate('local', function (err, user, info) {
			   console.log("err ", err,"user ", user, "info", info,);
			      if (err) {
                    ctx.body = {success: false, info: err.message};
                    ctx.throw(500, err.message);
                }
                if (user === false) {
                    ctx.body = {success: false, info: info.message}
                   // ctx.throw(401, info.message)
                } else {
                    ctx.body = {
                        success: true,
                        info: info.message,
                        nick: info.nick,
                        id: info.id,
                        redirect:/*ctx.session.dorthin ||*/ '/'
                    }
                    return ctx.login(user)
                }
		   })(ctx, next)
	 }else{
		 ctx.throw(409, "Already athenticated!")
	 }
})

pub.get('/logout', ctx => {
    ctx.logout();
    ctx.redirect('/');
});

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
