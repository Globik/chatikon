const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');

const html_admin_nav_menu = require('./html_admin_nav_menu');
const html_footer = require('./html_footer');
const { get_meta } = require('./get_meta');

const { site_domain } = require('../config/app.json');
const icons_menu = require('./icons_menu.js');

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
	<link href="/css/mediabox.css" rel="stylesheet">
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
    ${icons_menu.icons_menu({current:'main', user:buser})}
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
<div id="startGet" class="langs" onclick="openSuechBox();">${n.ln=='ru'?'НАЧАТЬ ОБЩЕНИЕ':n.ln=='en'?'Start Chatting':n.ln=='fr'?'COMMENCER':n.ln=='de'?'ANFAMGEN':n.ln=='es'?'Empezar':n.ln=='zh'?'开始聊天':''}</div>
<div class="terms">${n.ln=='ru'?'Нажимая кнопку «Начать..», я подтверждаю что мне <br>исполнилось 18 лет и я достиг совершеннолетия,<br> принимаю условия и политику конфеденциальности.':
n.ln=='zh'?'点击开始，我声明我至少18岁，<br>已达到我所在地的法定年龄，<br>并接受我们的条款和隐私政策。':
n.ln=='en'?'Pressing start i certify I am at least 18-years old and <br>have reached the age of majority where I live, <br> and I accept our Terms and Privacy Policy.':''}</div>
               </section>
               <!-- JSON.stringify(n.user) -->
<article id="mediaBox">
		<section id="videoBoxes">
		<div id="localVideoBox" class="buddy"><div id="cloader" class="unspinner"><div class="loader"></div></div><video id="localVideo" plysinline autoplay muted></video></div>
		<div id="remoteVideoBox" class="buddy"><div id="flagbox"><img id="flag" src=""></div><video id="remoteVideo" playsinline autoplay></video></div>
		</section>
        <footer id="controlPanel">
        
        <div id="privatcontainer">
				
<div id="privatchat"></div>
<div id="underchatbox"><input type="text" id="privatinput" placeholder="Your message"><button id="privatbtn" onclick="sendPrivat(this);"><img src="/images/send.svg"></button></div>
</div>
<div class="flex-items">
<button id="btnStart" class="btn" data-type="go" onclick="letStart(this);">${n.lang?"старт":"start"}</button>
<button id="stopBtn" class="btn" onclick="stopit(this);" disabled>stop</button>
</div>
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
	<hr>
	<h2>Debug Info:</h2>
	<output id="out"></output>
	<hr>
<section id="count">
<div class="count">${n.ln=='ru'?'Сейчас онлайн':n.ln=='en'?'Users online':n.ln=='fr'?'Utilisateurs en ligne':n.ln=='de'?'Benutzer online':n.ln=='es'?'Usuarios en línea':n.ln=='zh'?'用户在线':''}: <span id="spanWhosOn">0</span></div>
</section><hr>
	<!-- ru, en, fr, de, es, zh -->
<hr><button id="searchBtn" onclick="openSuechBox();">${n.ln=='ru'?'Поиск':n.ln=='en'?'Search':n.ln=='fr'?'Recherche':n.ln=='de'?'Suche':n.ln=='es'?'Buscar':n.ln=='zh'?'搜索':''}</button><hr>
<section id="suechBox">
<form name="suechform">
<div class="gender-box">
<b>${n.ln=='ru'?'Выберите с кем вы хотите поговорить':n.ln=='en'?'Choose who you want to talk to':n.ln=='fr'?'Choisissez à qui vous voulez parler':
n.ln=='de'?'Wählen Sie aus, mit wem Sie sprechen möchten':
n.ln=='es'?'Elige con quién quieres hablar':
n.ln=='zh'?'选择您想与之交谈的人':''}</b>
<div id="ageBox">
<div class="age">
<b>${n.ln=='ru'?'Сколько вам лет?':n.ln=='en'?'How old are you?':n.ln=='fr'?'Quel âge as-tu?':
n.ln=='de'?'Wie alt sind Sie?':
n.ln=='es'?'¿Cuántos años tiene?':
n.ln=='zh'?'你今年多大？':''}</b>&nbsp;
<input type="number" name="myage" value="18" min="10" max="100" step="1" onchange="saveMyAge(this);" />
</div>
<div class="age">
<b>${n.ln=='ru'?'Вы ищете человека в возрасте от':n.ln=='en'?"You're looking for a human of age":n.ln=='fr'?"Vous cherchez un homme d'âge":
n.ln=='de'?'Suechen Sie einen Mensch nach im Alter':
n.ln=='es'?'Estas buscando una humana de edad':
n.ln=='zh'?'您正在寻找同龄人':''}</b>&nbsp;
<input type="number" id="minAb" name="ab" min="10" max="60" value="10"  step="1" onchange="saveAb(this);" /> - <input id="minBis" type="number" name="bis" value="100" step="1" min="20" max="100" onchange="saveBis(this);" />
</div>
</div><hr>
<b>${n.ln=='ru'?'Ваш пол':n.ln=='en'?'Your gender is':n.ln=='fr'?'Votre sexe est':
n.ln=='de'?'Ihr Geschlecht ist':
n.ln=='es'?'Tu genero es':
n.ln=='zh'?'您的性别是':''}</b>
<div class="gender-wrapper">
<div class="gender"><input name="mygender" type="radio" value="male" id="maleInput" checked onchange="saveMyGender(this);" />
<label class="cntlbi" for="maleInput">&nbsp;${n.ln=='ru'?'мужчина':n.ln=='en'?'male':n.ln=='fr'?'mâle':n.ln=='de'?'Mann':n.ln=='es'?'masculino':n.ln=='zh'?'男性':''}</label></div>
<div class="gender"><input name="mygender" type="radio" value="female" id="femaleInput" onchange="saveMyGender(this);" />
<label class="cntlbi" for="femaleInput">&nbsp;${n.ln=='ru'?'':n.ln=='en'?'female':n.ln=='fr'?'femelle':n.ln=='de'?'Frau':n.ln=='es'?'masculina':n.ln=='zh'?'女性':''}</label></div>
</div><hr>
<b>${n.ln=='ru'?'Вы ищете':n.ln=='en'?"You're looking for a":n.ln=='fr'?'Vous cherchez un':n.ln=='de'?'Sie suchen nach einem':
n.ln=='es'?'estas buscando un':
n.ln=='zh'?'您正在寻找一个':''}</b>
<div class="gender-wrapper">
<div class="gender"><input name="suechgender" type="radio" value="male" id="suechMaleInput" onchange="saveSuechGender(this);" />
<label class="cntlbi" for="suechMaleInput">&nbsp;${n.ln=='ru'?'мужчину':n.ln=='en'?'male':n.ln=='fr'?'mâle':n.ln=='de'?'Mann':n.ln=='es'?'masculino':n.ln=='zh'?'男性':''}</label></div>
<div class="gender"><input name="suechgender" type="radio" value="female" id="suechFemaleInput" checked onchange="saveSuechGender(this);" />
<label class="cntlbi" for="suechFemaleInput">&nbsp;${n.ln=='ru'?'женщину':n.ln=='en'?'female':n.ln=='fr'?'femelle':n.ln=='de'?'Frau':n.ln=='es'?'masculina':n.ln=='zh'?'女性':''}</label></div>
</div>
</div>
<div id="landContainerBox">
<b>${n.ln=='ru'?'Выберите страну':n.ln=='en'?'Choose a country':n.ln=='fr'?'Choisissez un pays':
n.ln=='de'?'Wählen Sie ein Land':
n.ln=='es'?'Elige un país':
n.ln=='zh'?'选择一个国家':''}</b><br><br>
<div id="landContainer">

</div>
</div>

</form>
<button id="btnClose" onclick="closeSave(this);">${n.ln=='ru'?'закрыть и сохранить':n.ln=='en'?'close and save':n.ln=='fr'?'fermer et enregistrer':n.ln=='de'?'schließen und speichern':
n.ln=='es'?'cerrar y guardar':
n.ln=='zh'?'关闭并保存':''}</button>
</section>



<section>


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

