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

		title: `${n.ln=='ru'?n.meta.ru.title:n.ln=='en'?n.meta.en.title:n.ln=='de'?n.meta.de.title:n.ln=='fr'?n.meta.fr.title:n.ln=='es'?n.meta.es.title:n.ln=='zh'?n.meta.zh.title:''}`,
		meta:
			get_meta({
			key:`${n.ln=='en'?n.meta.en.key:n.ln=='ru'?n.meta.ru.key:n.ln=='fr'?n.meta.fr.key:n.ln=='de'?n.meta.de.key:n.ln=='es'?n.meta.es.key:n.ln=='zh'?n.meta.zh.key:''}`,
			loc:`${n.ln=='en'?'en-US':n.ln=='ru'?'ru-RU':n.ln=='de'?'de-DE':n.ln=='fr'?'fr-FR':n.ln=='es'?'es-ES':n.ln=='zh'?'zh-ZH':''}`,
				url: n.meta.url,
				image: n.meta.image,
				site_name: n.meta.site_name,
				title: `${n.ln=='ru'?n.meta.ru.title:n.ln=='en'?n.meta.en.title:n.ln=='de'?n.meta.de.title:n.ln=='fr'?n.meta.fr.title:n.ln=='es'?n.meta.es.title:n.ln=='zh'?n.meta.zh.title:''}`,
description: `${n.ln=='ru'?n.meta.ru.description:n.ln=='en'?n.meta.en.description:n.ln=='de'?n.meta.de.description:n.ln=='fr'?n.meta.fr.description:n.ln=='es'?n.meta.es.description:n.ln=='zh'?n.meta.zh.description:''}`,
			}),
		csslink: "/css/main2.css", luser: buser
	})}
	<link rel="stylesheet" href="/css/searchbox.css">
	<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
	<style>
	
	
	#remoteVideoBox.connecting::after{
	content: "${n.lang? "Поиск..." : "Connecting..."}"
}
</style>

</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}
<div id="oldBrowser">You have the old browser. Please use the latest browsers - Firebox or Chrome.</div>
<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>

${buser && buser.brole == 'superadmin' ? html_admin_nav_menu.html_admin_nav_menu(n) : ''}

<main id="pagewrap">
<section id="langsbox">
 <div class="langs">
${n.ln=='en'?'':'<a href="/" hreflang="en">'} <img alt="English Version" src="/images/en.png" width="35" height="22"> ${n.ln=='en'?'':'</a>'}
${n.ln=='de'?'':'<a href="/de" hreflang="de">'} <img alt="Deutsch Version" src="/images/de.png" width="35" height="22"> ${n.ln=='de'?'':'</a>'}
${n.ln=='ru'?'':'<a href="/ru" hreflang="ru">'} <img alt="Русская версия" src="/images/ru.png"  width="35" height="22">${n.ln=='ru'?'':'</a>'}
${n.ln=='fr'?'':'<a href="/fr" hreflang="fr">'} <img alt="Version Française" src="/images/fr.png"  width="35" height="22">${n.ln=='fr'?'':'</a>'}
${n.ln=='es'?'':'<a href="/es" hreflang="es">'} <img alt="Versión en Español" src="/images/es.png"  width="35" height="22">${n.ln=='es'?'':'</a>'}
${n.ln=='zh'?'':'<a href="/zh" hreflang="zh">'}<img alt="中文网站" src="/images/zh.png"  width="35" height="22">${n.ln=='zh'?'':'</a>'}
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
	<hr><button>${n.ln=='ru'?'Поиск':'Search'}</button><hr>
<section id="suechBox">
<form>
<div class="gender-box">
<header>Search info. Choose what you wanna talk</header>
<div id="ageBox">
<div class="age">
<b>How old are you?</b>&nbsp;
<input type="number" name="myage" value="18">
</div>
<div class="age">
<b>You're looking for a human of age</b>&nbsp;
<input type="number" name="ab" value="10"> - <input type="number" name="bis" value="100">
</div>
</div><hr>
<b>Your gender is</b>
<div class="gender-wrapper">
<div class="gender"><label class="cntlb" for="maleInput">&nbsp;male<input name="mygender" type="radio" value="male" id="maleInput" checked/><span class="mark"></span></label></div>
<div class="gender"><label class="cntlb" for="femaleInput">&nbsp;female<input name="mygender" type="radio" value="female" id="femaleInput"/><span class="mark"></span></label></div>
</div><hr>
<b>You're a looking for a</b>
<div class="gender-wrapper">
<div class="gender"><label class="cntlb" for="suechMaleInput">&nbsp;male<input name="suechgender" type="radio" value="male" id="suechMaleInput"/><span class="mark"></span></label></div>
<div class="gender"><label class="cntlb" for="suechFemaleInput">&nbsp;female<input name="suechgender" type="radio" value="female" id="suechFemaleInput" checked/><span class="mark"></span></label></div>
</div>
</div>
<div id="landContainer">

</div>
</form>
</section>



<section>

<hr>
<section id="count">
<div class="count">${n.lang? "Сейчас" : "Users"} online: <span id="spanWhosOn">0</span></div>
</section><hr>
<article id = "art" data-id="${n.articles?n.articles._id:''}">${n.articles?getTxt(n.articles):''}</article>
${n.user && n.user.role=="admin"? `<div class="editbtn"><button onclick="editTxt(this);">edit</button></div>
<section id="txtwrapper">
<textarea id="txt" placeholder="your article"></textarea>
${n.articles.length==0 ? `<div class="editbtn"><button data-ln="${n.ln}" onclick="saveTxt(this);">save</button></div>`: `<div class="editbtn"><button data-ln="${n.ln}" data-id="${n.articles._id}" onclick="updateTxt(this);">save</button></div>`}

</section>`:''}
</section>

</main>
<script src="/js/webrtc-app.js"></script> 
${n.user && n.user.role=='admin'?'<script src="/js/redact.js"></script>':''}
<footer id="footer">${html_footer.html_footer({})}</footer></body></html>`;
}

module.exports = { main_page };
function getTxt(arr){
let s='';
arr.forEach(function(el,i){
	s+=el.txt;
})
return s;
}

