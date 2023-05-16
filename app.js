// ssh root@45.89.66.167 (https://chatslider.online)

const Koa = require("koa");
const fs = require("fs");
const https = require("https");
const path = require("path");
const util = require("util");
const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);
const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const koaBody = require("koa-body");
const axios = require("axios");
const passport = require("koa-passport");
const WebSocket = require("ws");
const Datastore = require("@seald-io/nedb")
const url = require("url");
const Pool = require("pg-pool");
const PgStore = require("./libs/pg-sess.js");
const shortid = require("shortid");
const PS = require("pg-pubsub");
const pgtypes = require("pg").types;
const render = require("./libs/render.js");
const { oni } = require('./libs/web_push.js');

const serve = require("koa-static");
const session = require("koa-session");
//const nodemailer = require('nodemailer');
const pubrouter = require("./routes/pubrouter.js");
//const adminrouter = require('./routes/adminrouter.js');
const { meta, warnig, site_name } = require("./config/app.json");
var DB_URL = "postgress://globi:globi@127.0.0.1:5433/globi";

pgtypes.setTypeParser(1114, (str) => str);
const pars = url.parse(DB_URL);
const cauth = pars.auth.split(":");
const pg_opts = {
  user: cauth[0],
  password: cauth[1],
  host: pars.hostname,
  port: pars.port,
  database: pars.pathname.split("/")[1],
  ssl: false,
};

const pool = new Pool(pg_opts);
//const pg_store = new PgStore(pool);

const dkey = "./data/key.pem";
const dcert = "./data/cert.pem";
const db = {};

const app = new Koa();

var HTTPS_PORT = 443;
var HTTP_PORT;

if (process.env.DEVELOPMENT == "yes") {
  HTTP_PORT = 3000;
}

app.keys = ["your-secret"];
app.use(serve(__dirname + "/public"));
//app.use(session({store: pg_store, maxAge: 24 * 60 * 60 * 1000}, app))

render(app, {
  root: "views",
  development: process.env.DEVELOPMENT == "yes" ? false : false,
});
app.use(koaBody());
//require('./config/auth.js')(pool, passport)

//app.use(passport.initialize())
//app.use(passport.session())

async function setDb(){
	try{
		let a = await access("db.json");
		let d = await access('articles.json');
		if(!a){console.log("db.json is there.");}
		//await db.insertAsync({city:"Chelyabinsk", country:"Russia", date: new Date()});
		//let c = await db.findAsync({});
		//console.log("c: ", c);
	}catch(err){
		console.log("No db.json, making... ");
		try{
			let b = await writeFile("db.json", "");
			let e = await writeFile('articles.json', '');
			
			if(!b) console.log("db.json are made.");
		}catch(err){
			console.log("err file write: ", err);
		}
		
		
	}
}
setDb();
db.db = new Datastore({filename: "db.json", autoload: true})
db.articles = new Datastore({filename: "articles.json", autoload: true})

app.use(async (ctx, next) => {
  console.log("FROM HAUPT MIDDLEWARE =>", ctx.path, ctx.method);
  ctx.state.site = site_name;
  ctx.state.meta = meta;
  ctx.state.warnig = warnig;
  ctx.p = pool;
  ctx.db = db;
  console.log("Language: ", ctx.request.header["accept-language"]);
  console.log("IP: ", ctx.request.ip);
  var langstr = (ctx.request.header['accept-language'] ? ctx.request.header['accept-language'].includes('ru') : false);
  ctx.state.lang = langstr;
  try {
    await next();
  } catch (e) {
    console.log("middleware error: ", e);
    //await next();
  }
});

app.use(pubrouter.routes()).use(pubrouter.allowedMethods());

//app.use(adminrouter.routes()).use(adminrouter.allowedMethods());

app.on("error", function (err, ctx) {
  console.log("APP ERROR: ", err.message, "ctx.url : ", ctx.url);
});

var servak;
if (process.env.DEVELOPMENT !== "yes") {
  const ssl_options = {
    key: fs.readFileSync(dkey),
    cert: fs.readFileSync(dcert),
  };
  servak = https.createServer(ssl_options, app.callback()).listen(HTTPS_PORT);
  console.log("Should on https://chatslider.online", HTTPS_PORT, " running");
} else {
  servak = app.listen(process.env.PORT || HTTP_PORT);
  console.log("Should or localhost, port: ", HTTP_PORT, " started.");
}

const wss = new WebSocket.Server({
  server: servak,
});

function noop() {}

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping(noop);
  });
}, 3000000);

function heartbeat() {
  this.isAlive = true;
}

const abstract_key = "0091fa26a1aa4857907464f57a2a5015";
const re = /([0-9]{1,3}[\.]){3}[0-9]{1,3}/;



let obid = function () {
  let tst = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    tst +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

wss.on("connection", function ws_connect(ws, req) {
	const ip = req.socket.remoteAddress;
	
  oni("websocket from: ", ip);
  setFlag(ws, ip);
// ws.flag = 'https://static.abstractapi.com/country-flags/RU_flag.svg'
  let id = obid();
  ws.clientId = id;
  ws.target = null;
  ws.busy = true;
  wsend(ws, { type: "welcome", clientId: id });
  broadcast_all({ type: "howmuch", value: wss.clients.size });
console.log("Array: ", Array.from(wss.clients)[0].busy);
  ws.isAlive = true;
  ws.on("pong", heartbeat);
  ws.on("message", async function sock_msg(msg) {
    var sendToClients = 0;
    try {
      var data = JSON.parse(msg);
    } catch (e) {
      console.log(e);
      return;
    }
    console.log(data.type);
    if (data.type == "fertig") {
      ws.busy = false;
      let a = Array.from(wss.clients);
     console.log("a: ", a[0].busy, a.length);
      let b = a[Math.floor(Math.random() * a.length)];
      console.log("b: ", b.busy);
      if(b.busy == false && ws.clientId !== b.clientId){
		  ws.busy = true;
		  make_busy(b.clientId, ws);
	  }else{
		  wsend(ws, {type: "info", info: "No match found. Waiting, please."});
	  }
      sendToClients = 1;
    } else if (data.type == "unfertig") {
      ws.busy = true;
      ws.target = data.target;
      sendToClients = 1;
    }else if(data.type == "flag"){
		if(ws.flag) getFlag(ws, data.target);
		sendToClients = 1;
	}else{
     // console.log("Unknown data.type: ", data.type);
    }
    if (sendToClients == 0){
      if (
        data.target && data.target !== undefined && data.target.length !== 0){
        send_to_one(ws, data.target, data);
      }
    }
  });

  ws.on("close", async function ws_close() {
    console.log("Websocked closed!");
    if(ws.target){
		send_to_one(ws, ws.target, {type: "bye"});
	}
    broadcast_all({ type: "howmuch", value: wss.clients.size });
  });
  ws.on('error', function eri(err){
	  console.log("socket error: ", err);
  });
});

function broadcast_all(obj) {
  wss.clients.forEach(function each(client) {
    wsend(client, obj);
  });
}

function send_to_one(ws, target, obj) {
  for (let el of wss.clients) {
    if (el.clientId == target) {
      wsend(el, obj);
      return;
    }
  }
}



function make_busy(randomId, ws) {
  for (let el of wss.clients) {
    if (el.clientId === randomId) {
      el.busy = true;
     wsend(ws, { type: "make_offer", target: randomId });
     wsend(el, { type: "warte_offer", from: ws.clientId});
      return;
    }
  }
}
function getFlag(ws, target){
	for (let el of wss.clients) {
    if (el.clientId === target) {
	if(el.flag){
			wsend(ws, { type: "flag", flag: el.flag });
		}
		return;
	}
	}
}
function wsend(ws, obj) {
  let a;
  try {
    a = JSON.stringify(obj);
  //  console.log("type:", obj.type);
    if (ws.readyState === WebSocket.OPEN) ws.send(a);
  } catch (e) {}
}
function setFlag(ws, ip){
	//let r = '77.222.112.75';
	if(process.env.DEVELOPMENT == "yes"){return;}
let a = ip.match(re);
let r = a[0];
if(r === "78.81.155.17"){return;}
setTimeout(function(){
	axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${abstract_key}&ip_address=${r}&fields=country,city,flag`).then(async response=>{
	console.log('data: ', response.data, 'status', response.status);
	if(response.status == 200){
		//response.data.city response.data.country response.data.flag.unicode svg
		ws.flag = response.data.flag.svg;
		try{
		await db.db.insertAsync({city: response.data.city, country: response.data.country, date: new Date()});
	}catch(er){console.log(er);}
	}
	
}).catch(error=>{
	console.log(error);
})
}, 1000)
}
