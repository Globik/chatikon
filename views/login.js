const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');

//const html_admin_nav_menu = require('./html_admin_nav_menu');
//const html_footer = require('./html_footer');
//const { get_meta } = require('./get_meta');

//const { site_domain } = require('../config/app.json');

const login = function (n) {
	const buser = n.user;


	return `<!DOCTYPE html><html lang="${n.lang ? 'ru' : 'en'}"><!-- login.js -->
<head>${html_head.html_head({
		title: `${n.site} - login`,csslink: "/css/main2.css", luser: buser})}
		<link href="/css/login.css" rel="stylesheet">
		<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script> 
		</head>
		<body id="rbody"><nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
		<main id="pagewrap">
		 <button onclick="subscribeWebpush(this);">subscribe</button>
		 <output id="out"></output>
		<script>const lang = "${n.ln}";</script>
		<div id="formWrapper">
		<header>Log in</header>
		<div id="out"></div>
		<form id="myform" name="mform" action="/login" method="post">
		<div class="input">
		<label class="llabel" for="named">Your nick:</label>
		<input type="text" id="named" name="username" required autocomplete="given-name" onfocus="someFocus(this);" maxlength="20" placeholder="Your nick"></div>
		<div class="input">
		<label class="llabel" for="password">Password:</label>
		<input type="password" id="password" name="password" required onfocus="someFocus(this);" maxlength="10" placeholder="Your password"></div>
		<div class="input submit"><input type="submit" value="log in" name="lsubmit"></div>		
		</form>
		<div class="vergessen"><small class="vergessen2">Forgot a password? <a href="/signup">Create a new account!</a></small></div>
	</div>
		</main> <script src="/js/push.js"></script> </body></html>`;
	}
	module.exports = { login: login }
		
