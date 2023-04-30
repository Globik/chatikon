const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');

//const html_admin_nav_menu = require('./html_admin_nav_menu');
//const html_footer = require('./html_footer');
const { get_meta } = require('./get_meta');

const { site_domain } = require('../config/app.json');

const login = function (n) {
	const buser = n.user;


	return `<!DOCTYPE html><html lang="${n.lang ? 'ru' : 'en'}"><!-- login.js -->
<head>${html_head.html_head({
		title: `${n.site} - login`,csslink: "/css/main2.css", luser: buser})}
		<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
		</head><body><nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
		<main id="pagewrap">
		<button onclick="subscribeWebpush(this);">subscribe</button>
		<hr><div id="out"></div>
		</main><script src="/js/push.js"></script></body></html>`;
	}
	module.exports = { login: login }
		
