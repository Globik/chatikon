const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');

//const html_admin_nav_menu = require('./html_admin_nav_menu');
//const html_footer = require('./html_footer');
//const { get_meta } = require('./get_meta');

//const { site_domain } = require('../config/app.json');

const signup = function (n) {
	const buser = n.user;


	return `<!DOCTYPE html><html lang="${n.lang ? 'ru' : 'en'}"><!-- login.js -->
<head>${html_head.html_head({
		title: `${n.site} - signup`,csslink: "/css/main2.css", luser: buser})}
		<link href="/css/login.css" rel="stylesheet">
		</head>
		<body id="rbody"><nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
		<main id="pagewrap">
		
		<script>const lang = "${n.ln}";</script>
		<div id="formWrapper">
		<header>Sign up</header>
		<div id="out"></div>
		<form id="myform" name="mforms" action="/signup" method="post">
		<div class="input">
		<label class="llabel" for="named">Your nick:</label>
		<input type="text" id="named" name="username" required autocomplete="given-name" onfocus="someFocus(this);" maxlength="20" placeholder="Your nick"></div>
		<div class="input">
		<label class="llabel" for="password">Password:</label>
		<div class="inpwrap" style="display:block;position:relative;">
		<input type="password" id="password" name="password" required onfocus="someFocus(this);" maxlength="10" placeholder="Password"></div>
		<div id="eyesvg" onclick="show_pwd(this);" title="show password"></div>
		</div>
		<div class="input submit"><input type="submit" value="sign up" name="lsubmit"></div>		
		</form>
		<div class="vergessen"><small class="vergessen2">Already have an account? <a href="/login">Log in!</a></small></div>
	</div>
		</main> <script src="/js/push.js"></script> </body></html>`;
	}
	module.exports = { signup }
		
