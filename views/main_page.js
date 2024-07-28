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
	<link rel="stylesheet" href="/css/login2.css">
	<script src="/js/adapter-latest.js"></script>
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
<!-- <nav id="adminNav"><a href="/dashboard" target="_blank">${n.ln=='ru'?'<span>В админку</span>':'<span>Dashboard</span>'}</a></nav> -->
<main id="pagewrap">
<!--
   <section id="helloContainer"><h1>Hello world, I am looking for a rich investor for 1000 000 000 USD</h1>
   <img src="/images/mich.jpeg"/>
   <p>
   I am Alik Gafarov, 50 years old, I am the creator of this chat roulette. I'm looking for a rich investor for this site.
   There will be paid virtual gifts here. Your profit - 90%. Mine is 10%. If you are intrested in please drop me a line to <a href="mailto:globichatikon@gmail.com">globichatikon@gmail.com</a>
   </p>
   </section>
   -->
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
<h2>${n.ln=='ru'?'ДРОЧИЛОВО ОНЛАЙН!':n.ln=='en'?'LOOKING FOR A GOOD TIME?':n.ln=='de'?'LUST JETZT?':n.ln=='fr'?'Rencontrer de nouvelles personnes':n.ln=='es'?'Conoce gente nueva':n.ln=='zh'?'认识新朋友':''}</h2>
<div id="startGet" class="langs" onclick="openSuechBox();">${n.ln=='ru'?'НАЧАТЬ ОБЩЕНИЕ':n.ln=='en'?'Start Chatting':n.ln=='fr'?'COMMENCER':n.ln=='de'?'ANFAMGEN':n.ln=='es'?'Empezar':n.ln=='zh'?'开始聊天':''}</div>
<div class="terms">${n.ln=='ru'?'Нажимая кнопку «Начать..», я подтверждаю что мне <br>исполнилось 18 лет и я достиг совершеннолетия,<br> принимаю условия и политику конфеденциальности.':
n.ln=='zh'?'点击开始，我声明我至少18岁，<br>已达到我所在地的法定年龄，<br>并接受我们的条款和隐私政策。':
n.ln=='en'?'Pressing start i certify I am at least 18-years old and <br>have reached the age of majority where I live, <br> and I accept our Terms and Privacy Policy.':''}</div>
               </section>
                ${icons_menu.icons_menu({current:'main', user:buser, ln: n.ln })}
               ${n.user?`<span class="username">${n.user.name}, welcome on board!</span>`:''}
               <input type="hidden" id="mynick" value="${n.user?n.user.name:'anon'}" />
               <input type="hidden" id="myrealid" value="${n.user?n.user.id:'no'}" /> 
              <!--
<article id="mediaBox">
<section id="videoBoxes">
		<div id="localVideoBox" class="buddy"><div id="cloader" class="unspinner"><div class="loader"></div></div>
		
		<video id="localVideo" plysinline autoplay muted></video>
		
	<div id="privatcontainer" class="hidden">
	<div id="znakChat">
	<div id="znakPrint" class="typing hidden">
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
    <span class="staben"><small id="printsi">prints</small></span>
  </div>
  <div id="chatimg" onclick="openChat(this);"><img src="/images/chat.svg"/></div>
  
<div id="privatchat"></div>
<div id="underchatbox">
<input type="text" id="privatinput" oninput="txtInput(this);" onchange="someChange(this);" placeholder="Your message">
<button id="privatbtn" onclick="sendPrivat(this);"><img src="/images/send.svg"></button>
</div>
 </div> 
</div>
		<div id="remoteVideoBox" class="buddy"><div id="flagbox"><img id="flag" src=""></div><video id="remoteVideo" playsinline autoplay></video></div>
</section>

<footer id="controlPanel">

		 <div id="giftWrapper" onclick="bearbeitGift(this);">
		<div class="gifts">&#x1f496</div>
		<div><span id="heartscount">44</span></div>
		</div>
		
<div class="flex-items">
<button id="btnStart" class="btn" data-type="go">${n.ln=='ru'?"Старт":"Start"}</button>
<button id="nextBtn" class="btn" disabled>${n.ln=='ru'?"Далeе":"Next"}</button>
</div>
	</div>		
</footer>	
</article>


-->




<article id="mediaBox">
<section id="videoBoxes">
		<div id="localVideoBox" class="buddy"><div id="cloader" class="unspinner"><div class="loader"></div></div>
		
		<video id="localVideo" plysinline autoplay muted></video>
	<div id="privatcontainer" class="hidden">
	<div id="znakChat">
	<div id="znakPrint" class="typing hidden">
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
    <div class="typing__dot"></div>
    <span class="staben"><small id="printsi">prints</small></span>
  </div>
  <div id="chatimg" onclick="openChat(this);"><img src="/images/chat.svg"/></div>
  </div>
<div id="privatchat"></div>
<div id="underchatbox">
<input type="text" id="privatinput" oninput="txtInput(this);" onchange="someChange(this);" placeholder="Your message"><button id="privatbtn" onclick="sendPrivat(this);"><img src="/images/send.svg"></button>
</div>
 </div> 
</div>
		<div id="remoteVideoBox" class="buddy"><div id="flagbox"><img id="flag" src=""></div><video id="remoteVideo" playsinline autoplay></video></div>
</section>
<footer id="controlPanel">

<div class="flex-items">
<button id="btnStart" class="btn" data-type="go">${n.ln=='ru'?"Старт":"Start"}</button>
<button id="nextBtn" class="btn" disabled>${n.ln=='ru'?"Далeе":"Next"}</button>
</div>

	</div> 
</footer>	
</article>








<!--
	<hr>
	<h2>Debug Info:</h2>
	<output id="out"></output>
	<hr>
	-->
	<!--<button onclick="starti(this);">start</button>
	<button onclick="stopi(this);">stop</button>-->
<section id="count">
<div class="count">${n.ln=='ru'?'Сейчас онлайн':n.ln=='en'?'Users online':n.ln=='fr'?'Utilisateurs en ligne':n.ln=='de'?'Benutzer online':n.ln=='es'?'Usuarios en línea':n.ln=='zh'?'用户在线':''}: <span id="spanWhosOn">0</span></div>
&nbsp;&nbsp;<div>&nbsp;&nbsp;Webcams:&nbsp;<span id="webcams">0</span></div>
&nbsp;&nbsp;<div>&nbsp;&nbsp;Connections:&nbsp;<span id="Connects">0</span></div>
</section><hr>
	<!-- ru, en, fr, de, es, zh -->
	
	<section id="reklama2">
	<div id="fotopanel"><img class="telka" src="/images/girl.webp"/><img class="telka" src="/images/girl2.webp"/><img class="telka" src="/images/girl3.webp"/></div>
	<div><span id="reklama2span"><b>Advertise 18+</b></span></div>
	<article>
	<p>Looking for new acquaintances? Thousand of hot girls and boys are waiting for you to talk in chat roulette on <a href="https://rouletka.ru/about">https://rouletka.ru</a>!
	</p>
	<p>
	寻找新朋友？ 数以千计的热辣女孩和男孩正在等待您在聊天轮盘赌中交谈: <a href="https://rouletka.ru/about">https://rouletka.ru</a>!
	<div class="forbtndiv"><button onclick="window.location.href='https://rouletka.ru/about';">Come on join us! | 快来加入我们吧!</button></div>
	</p>
	</article>
	</section>
	
	
<button id="searchBtn" onclick="openSuechBox();">${n.ln=='ru'?'Поиск':n.ln=='en'?'Search':n.ln=='fr'?'Recherche':n.ln=='de'?'Suche':n.ln=='es'?'Buscar':n.ln=='zh'?'搜索':''}</button><hr>
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


<article id = "art" data-id="${n.articles?n.articles._id:''}">${n.articles?getTxt(n.articles,n.ln):''}</article>
<div class="donate"><h2>Please donate bitcoins</h2>
<b><a id="aid" href="bitcoin:bc1qy9cz8h230kqpp2mm7ynlzzwnm80xgdj2z5djz7">bc1qy9cz8h230kqpp2mm7ynlzzwnm80xgdj2z5djz7</a></b>
<button onclick="copy();">copy</button>
</div>
${n.user && n.user.role=="admin"? `<div class="editbtn"><button onclick="editTxt(this);">edit</button></div>
<section id="txtwrapper">
<textarea id="txt" placeholder="your article"></textarea>
${n.articles.length==0 ? `<div class="editbtn"><button data-ln="${n.ln}" onclick="saveTxt(this);">save</button></div>`: `<div class="editbtn"><button data-ln="${n.ln}" data-id="${n.articles._id}" onclick="updateTxt(this);">save</button></div>`}

</section>`:''}
</section>
 <a href="#."  class="overlay" id="login2"></a>
    <output id="loginoutput" class="popi">
        <div class="modal-header">
          ${n.lang=='ru'?'Авторизация / Регистрация':'Login / Signup'}
         <!-- <span class="model-header-label" onclick="isOpenModal();">
            Правила чата
          </span> -->
        </div>
        <div class="modal-body">
          <div class="error-message" id="errormsg"></div>
          <form name="formlogin" id="myform">
            <label class="lab" for="name" style="margin-top: 5px;">${n.lang=='ru'?'Имя':'Nickname'}</label>
            <input  name="username" type="text" placeholder="${n.lang=='ru'?'Введите Имя/Логин':'Enter nickname'}" id="name" required minlength="2" maxlength="20">

            <label class="lab" for="password">${n.lang=='ru'?'Пароль':'Password'}</label>
            <input  name="userpassword" type="password" autocomplete="on" placeholder="Введите пароль" id="password" required minlength="2" maxlength="20">
			 <button  class="login-button" id="btnlogin">${n.lang=='ru'?'Войти':'Log in'}</button>
            <button class="register-button" style="" id="btnregister">${n.lang=='ru'?'Зарегистрироваться':'Sign up'}</button>
           
          </form>
        </div>
    </output>
</main>
<script src="/js/webrtc-app.js"></script>
<script src="/js/login.js"></script> 
${n.user && n.user.role=='admin'?'<script src="/js/redact.js"></script>':''}
<footer id="footer">${html_footer.html_footer({})}</footer></body></html>`;
}

module.exports = { main_page };
function getTxt(arr, ln){
let s='';
if(ln=='en'){
arr.forEach(function(el,i){
	s+=el.txt;
})
}else if(ln=='de'){
	arr.forEach(function(el,i){
	s+=el.txt;
})
}else if(ln=='ru'){
	arr.forEach(function(el,i){
	s+=el.txt;
})
}else if(ln=='es'){
	arr.forEach(function(el,i){
	s+=el.txt;
})
}else if(ln=='zh'){
	arr.forEach(function(el,i){
	s+=el.txt;
})
}else if(ln=='fr'){
	arr.forEach(function(el,i){
	s+=el.txt;
})
}
return s;
}

