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
const koaBody = require("koa-body");

const passport = require("koa-passport");
const WebSocket = require("ws");

const url = require("url");
const Pool = require("pg-pool");
const PgStore = require("./libs/pg-sess.js");
const shortid = require("shortid");
const PS = require("pg-pubsub");
const pgtypes = require("pg").types;
const render = require("./libs/render.js");

const serve = require("koa-static");
const session = require("koa-session");
//const nodemailer = require('nodemailer');
const pubrouter = require("./routes/pubrouter.js");
//const adminrouter = require('./routes/adminrouter.js');
const { meta, warnig, site_name } = require("./config/app.json");
var DB_URL = "postgress://globi:globi@127.0.0.1:5432/chatroulette";

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

//const pool = new Pool(pg_opts);
//const pg_store = new PgStore(pool);

const dkey = "./data/key.pem";
const dcert = "./data/cert.pem";

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
app.use(async (ctx, next) => {
  console.log("FROM HAUPT MIDDLEWARE =>", ctx.path, ctx.method);
  ctx.state.site = site_name;
  ctx.state.meta = meta;
  ctx.state.warnig = warnig;
  console.log("Language: ", ctx.request.header["accept-language"]);
  try {
    await next();
  } catch (e) {
    console.log("middleware error: ", e);
    await next();
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
//  ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6,uk;q=0.5

var myArray = ["Apples", "Bananas", "Pears"];

var randomItem = myArray[Math.floor(Math.random() * myArray.length)];

console.log(randomItem);

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
console.log("obid: ", obid());

wss.on("connection", function ws_connect(ws, req) {
  console.log("Websocked connected");
  var suech_interval;
  let id = obid();
  ws.clientId = id;
  ws.busy = true;
  wsend(ws, { type: "welcome", clientId: id });
  broadcast_all({ type: "howmuch", value: wss.clients.size });

  ws.isAlive = true;
  ws.on("pong", heartbeat);
  ws.on("message", async function sock_msg(msg) {
    var send_to_clients = 0;
    try {
      var data = JSON.parse(msg);
    } catch (e) {
      console.log(e);
      return;
    }
    if (data.type == "fertig") {
      ws.busy = false;
       suech_interval = setInterval(function suech() {
        mach_suech(ws);
      }, 1000);
      send_to_clients = 1;
    } else if (data.type == "unfertig") {
      ws.busy = true;
      clearInterval(suech_interval);
    } else {
     // console.log("Unknown data.type: ", data.type);
    }
    if (send_to_clients == 0) {
      if (
        data.target &&
        data.target !== undefined &&
        data.target.length !== 0
      ) {
        send_to_one(ws, data.target, data);
      }
    }
  });

  ws.on("close", async function ws_close() {
    console.log("Websocked closed!");
    if (suech_interval) clearInterval(suech_interval);
    broadcast_all({ type: "howmuch", value: wss.clients.size });
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

function mach_suech(ws) {
  let arr = [];
  for (let el of wss.clients) {
    if (el.busy == false && el!= ws) {
      arr.push(el.clientId);
     // console.log("ws: ", el.clientId);
    }
  }
  if(arr.length == 0) return;
  let randomIt = arr[Math.floor(Math.random() * arr.length)];
  ws.busy = true;
  make_busy(randomIt, ws.clientId);
  console.log("target: ", randomIt);
  wsend(ws, { type: "make_offer", target: randomIt });
}

function make_busy(clientId, from_id) {
  for (let el of wss.clients) {
    if (el.clientId == clientId) {
      el.busy = true;
   //   wsend(el, { type: "warte_offer", from: from_id });
      return;
    }
  }
}

function wsend(ws, obj) {
  let a;
  try {
    a = JSON.stringify(obj);
    if (ws.readyState === WebSocket.OPEN) ws.send(a);
  } catch (e) {}
}
