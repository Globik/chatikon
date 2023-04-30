const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');

const html_admin_nav_menu = require('./html_admin_nav_menu');
const html_footer = require('./html_footer');
const { get_meta } = require('./get_meta');

const { site_domain } = require('../config/app.json');

const main_page = function (n) {
	const buser = n.user;


	return `<!DOCTYPE html><html lang="${n.lang ? 'ru' : 'en'}"><!-- main_page.js -->
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
	<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
	<style>
	
	
	#remoteVideoBox.connecting::after{
	content: "${n.lang? "Поиск..." : "Connecting..."}"
}
}</style>

</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<div id="oldBrowser">You have the old browser. Please use the latest browsers - Firebox or Chrome.</div>
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>

${buser && buser.brole == 'superadmin' ? html_admin_nav_menu.html_admin_nav_menu(n) : ''}

<main id="pagewrap">

<article id="mediaBox">
		<section id="videoBoxes">
		<div id="localVideoBox" class="buddy"><video id="localVideo" autoplay muted></video></div>
		<div id="remoteVideoBox" class="buddy"><div id="flagbox"><img id="flag" src=""></div><video id="remoteVideo" autoplay></video></div>
		</section>
        <footer id="controlPanel">
			
			<div class="flex-items"><button id="btnStart" class="btn" data-type="go" onclick="letStart(this);">${n.lang?"старт":"start"}</button></div>
			<div class="flex-items control" id="currentCamera" onclick="changeCamera(this);" title="${n.lang?"Бак / фронтальная камера":"Back / front cam"}">
			<svg fill="#FFFFFF" fill-opacity="0.5" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>

			</div>
			</footer>	
	</article>




<section>
<!--
<div class="box">
<span>Choose the Codec</span>
<select id="codecPreferences" disabled>
<option selected value="">Default</option>
</select>
<div id="actualCodec"></div>
</div> -->
<hr>
<section id="count">
<div class="count">${n.lang? "Сейчас" : "Users"} online: <span id="spanWhosOn">0</span></div>
</section>
<hr>


</section>
<h3>Debug info:</h3>
<div id="out"></div>
</main>
<script src="/js/webrtc-app.js"></script> 
<footer id="footer">${html_footer.html_footer({})}</footer></body></html>`;
}

module.exports = { main_page };

