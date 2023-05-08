const bodyParser = require('koa-body');
const Router = require('koa-router');
const walletValidator = require('wallet-address-validator');

const pub = new Router();

pub.get('/', async ctx=>{
	ctx.body = await ctx.render('main_page', {ln: "en"});
})
pub.get('/ru', async ctx=>{
	ctx.body = await ctx.render('main_page', {ln: "ru"});
})
pub.get('/de', async ctx=>{
	ctx.body = await ctx.render('main_page', {ln: "de"});
})
pub.get('/es', async ctx=>{
	ctx.body = await ctx.render('main_page', {ln: "es"});
})
pub.get('/fr', async ctx=>{
	ctx.body = await ctx.render('main_page', {ln: "fr"});
})
pub.get('/zh', async ctx=>{
	ctx.body = await ctx.render('main_page', {ln: "zh"});
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
