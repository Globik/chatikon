const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');

const html_admin_nav_menu = require('./html_admin_nav_menu');
const html_footer = require('./html_footer');
const { get_meta } = require('./get_meta');

const { site_domain } = require('../config/app.json');

const main_page = function (n) {
	const buser = n.user;


	return `<!DOCTYPE html><html lang="${n.ln}"><!-- main_page.js -->
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
<section id="langsbox">
 <div class="langs">
<a href="/" hreflang="en"> <img alt="English Version" src="/images/en.png" width="35" height="22"> </a>
<a href="/de" hreflang="de"> <img alt="Deutsch Version" src="/images/de.png" width="35" height="22"> </a>
<a href="/ru" hreflang="ru"> <img alt="Русская версия" src="/images/ru.png"  width="35" height="22"></a>
<a href="/fr" hreflang="fr"> <img alt="Version Française" src="/images/fr.png"  width="35" height="22"></a>
<a href="/es" hreflang="es"> <img alt="Versión en Español" src="/images/es.png"  width="35" height="22"></a>
<a href="/zh" hreflang="zh"><img alt="中文网站" src="/images/zh.png"  width="35" height="22"></a>
               </div>
<h1>${n.ln=='ru'?'Анонимный видеочат':n.ln=='en'?'Free Random Video Chat':n.ln=='fr'?'Chatroulette Française':n.ln=='de'?'Deutsches ChatRoulette':n.ln=='es'?'Chatroulette español':n.ln=='zh'?'免费随机视频聊天':''}</h1>
<h2>${n.ln=='ru'?'ЗНАКОМСТВА ОНЛАЙН':n.ln=='en'?'MEET NEW PEOPLE':n.ln=='de'?'NEUE LEUTE KENNENLERNEN':n.ln=='fr'?'Rencontrer de nouvelles personnes':n.ln=='es'?'Conoce gente nueva':n.ln=='zh'?'认识新朋友':''}</h2>
<div id="startGet" class="langs">${n.ln=='ru'?'НАЧАТЬ ОБЩЕНИЕ':n.ln=='en'?'Start Chatting':n.ln=='fr'?'COMMENCER':n.ln=='de'?'ANFAMGEN':n.ln=='es'?'Empezar':n.ln=='zh'?'开始聊天':''}</div>
<div class="terms">${n.ln=='ru'?'Нажимая кнопку «Начать..», я подтверждаю что мне <br>исполнилось 18 лет и я достиг совершеннолетия,<br> принимаю условия и политику конфеденциальности.':
n.ln=='zh'?'点击开始，我声明我至少18岁，<br>已达到我所在地的法定年龄，<br>并接受我们的条款和隐私政策。':
n.ln=='en'?'Pressing start i certify I am at least 18-years old and <br>have reached the age of majority where I live, <br> and I accept our Terms and Privacy Policy.':''}</div>
               </section>
<article id="mediaBox">
		<section id="videoBoxes">
		<div id="localVideoBox" class="buddy"><video id="localVideo" autoplay muted></video></div>
		<div id="remoteVideoBox" class="buddy"><div id="flagbox"><img id="flag" src=""></div><video id="remoteVideo" autoplay></video></div>
		</section>
        <footer id="controlPanel">
        
        <div id="privatcontainer">
				
<div id="privatchat"></div>
<div id="underchatbox"><input type="text" id="privatinput" placeholder="Your message"><button id="privatbtn" onclick="sendPrivat(this);"><img src="/images/send.svg"></button></div>
</div>
<div class="flex-items"><button id="btnStart" class="btn" data-type="go" onclick="letStart(this);">${n.lang?"старт":"start"}</button></div>
<div class="flex-items control">
<!-- <img onclick="openChat(this);" src="/images/chat.svg" title="chat"> -->

<svg onclick="openChat(this);" title="chat" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">

<g id="Layer_1">
	<g>
		<circle id="channelKrug" class="st0 disabled" cx="32" cy="32" r="32"/>
	</g>
	<g class="st1">
		<path class="st2" d="M52,32c0-9.9-9-18-20-18s-20,8.1-20,18c0,9.6,8.3,17.4,18.8,17.9C31.5,53.6,32,56,32,56s5-3,9.6-8.2
			C47.8,44.7,52,38.8,52,32z"/>
	</g>
	<g>
		<path class="st3" d="M49,28.8C49,43.8,32,54,32,54s-9.4-42,0-42S49,19.5,49,28.8z"/>
	</g>
	<g>
		<ellipse class="st3" cx="32" cy="30" rx="20" ry="18"/>
	</g>
	<g>
		<circle class="st4" cx="32" cy="30" r="2"/>
	</g>
	<g>
		<circle class="st4" cx="40" cy="30" r="2"/>
	</g>
	<g>
		<circle class="st4" cx="24" cy="30" r="2"/>
	</g>
</g>
<g id="Layer_2">
</g>
</svg>



</div>
			<div class="flex-items control" id="currentCamera" onclick="changeCamera(this);" title="${n.lang?"Бак / фронтальная камера":"Back / front cam"}">
			<svg fill="#FFFFFF" fill-opacity="0.5" height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>

			</div>
			</footer>	
	</article>




<section>

<hr>
<section id="count">
<div class="count">${n.lang? "Сейчас" : "Users"} online: <span id="spanWhosOn">0</span></div>
</section>
<hr>


</section>

</main>
<script src="/js/webrtc-app.js"></script> 
<footer id="footer">${html_footer.html_footer({})}</footer></body></html>`;
}

module.exports = { main_page };

