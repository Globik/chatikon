const bodyParser = require('koa-body');
const Router = require('koa-router');
const walletValidator = require('wallet-address-validator');

const pub = new Router();

pub.get('/', async ctx=>{
	let  db = ctx.p;
	let c;
	let a;
	try{
		c = await db.query(`select * from articles where lang='en'`);
		if(c.rows)a=c.rows[0]
	}catch(e){console.log(e);}
	ctx.body = await ctx.render('main_page', {ln: "en", articles:a});
})
pub.get('/ru', async ctx=>{
	let db = ctx.p;
	let c;
	try{
		c = await db.query(`select * from articles where lang='ru'`);
		console.log("c: ", c.rows);
	}catch(e){console.log(e);}
	ctx.body = await ctx.render('main_page', {ln: "ru", articles: c.rows[0]});
})
pub.get('/de', async ctx=>{
	let  db = ctx.p;
	let c;
	try{
		c = await db.query(`select * from articles where lang='de'`);
		
	}catch(e){console.log(e);}
	ctx.body = await ctx.render('main_page', {ln: "de", articles: c.rows[0]});
})
pub.get('/es', async ctx=>{
	let  db = ctx.p;
	let c;
	try{
		c = await db.query(`select * from articles where lang='es'`);
		
	}catch(e){console.log(e);}
	ctx.body = await ctx.render('main_page', {ln: "es",  articles: c.rows[0]});
})
pub.get('/fr', async ctx=>{
	let c;
	let  db = ctx.p;
	try{
		c = await db.query(`select * from articles where lang='fr'`);
		
	}catch(e){console.log(e);}
	
	ctx.body = await ctx.render('main_page', {ln: "fr", articles: c.rows[0]});
})
pub.get('/zh', async ctx=>{
	let  db = ctx.p;
	let c;
	try{
		c = await db.query(`select * from articles where lang='zh'`);
		
	}catch(e){console.log(e);}
	ctx.body = await ctx.render('main_page', {ln: "zh",  articles: c.rows[0]});
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
	let  db = ctx.p;
	let {lang, txt} = ctx.request.body;
	if(!lang || !txt)ctx.throw(400, "bad request")
	console.log(ctx.request.body);
	try{
		 // await articles.insertAsync({lang:lang, txt:txt});
		  await db.query('insert into articles(lang,txt) values($1,$2)', [lang,txt]);
		
	}catch(e){ctx.throw(400, "som error"+e)}
	
	ctx.body={lang};
})
pub.post("/saveEdit", async ctx=>{
	let  db = ctx.p;
	let {lang, txt, id} = ctx.request.body;
	console.log(ctx.request.body);
	if(!lang || !txt)ctx.throw(400, "bad request")
	console.log('saveEdit');
	try{
		await db.query('update articles set txt=$1 where lang=$2',[txt, lang]);
		
	}catch(e){ctx.throw(400, "som error"+e)}
	
	ctx.body={lang};
})
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
