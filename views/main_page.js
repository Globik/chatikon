const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');

const html_admin_nav_menu = require('./html_admin_nav_menu');
const html_footer = require('./html_footer');
const { get_meta } = require('./get_meta');

const { site_domain } = require('../config/app.json');

const main_page = function (n) {
	const buser = n.user;


	return `<!DOCTYPE html><html lang="en"><!-- main_page.js -->
<head>${html_head.html_head({
		title: `${n.site} - chatroullete`,
		meta:
			get_meta({
				url: n.meta.url,
				image: n.meta.image,
				site_name: n.meta.site_name,
				title: n.meta.main_page.title,
				description: n.meta.main_page.description
			}),
		csslink: "/css/main2.css", luser: buser
	})}
</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<div id="oldBrowser">You have the old browser. Please use the latest browsers - Firebox oder Chrome.</div>
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>

${buser && buser.brole == 'superadmin' ? html_admin_nav_menu.html_admin_nav_menu(n) : ''}


<main id="pagewrap">
<article id="mediaBox">
<section id="remoteVideoBox">
<video id="remoteVideo" autoplay></video>

<video id="localVideo" autoplay></video>
<footer id="btnPanel"><button id="btnStart" data-type="go" onclick="letStart(this);">start</button></footer>
</section>

</article>
<section>


<hr>
<div>Сейчас online <span id="spanWhosOn">0</span></div>

<hr>


</section></main>
<script src="/js/webrtc-app.js"></script> 
<footer id="footer">${html_footer.html_footer({})}</footer></body></html>`;
}

module.exports = { main_page };

