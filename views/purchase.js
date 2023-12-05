const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');

const html_admin_nav_menu = require('./html_admin_nav_menu');
const html_footer = require('./html_footer');
const { get_meta } = require('./get_meta');

const { site_domain } = require('../config/app.json');
const icons_menu = require('./icons_menu.js');

const purchase = function (n) {
	const buser = n.user;


	return `<!DOCTYPE html><html lang="${n.lang}"><!-- main_page.js -->
<head>${html_head.html_head({

		title: `${n.lang?'Покупка токенов':'Tokens Purchase'}`,
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
	
	

</head>
<body>${n.warnig ? `<div id="warnig">${n.warnig}</div>` : ''}

<nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>

${buser && buser.brole == 'superadmin' ? html_admin_nav_menu.html_admin_nav_menu(n) : ''}

<main id="pagewrap">
    ${icons_menu.icons_menu({current:'purchase', user:buser, ln: n.lang })}
    <h1>${n.lang?'Покупка токенов':'Tokens Purchase'}</h1>
</main>
<footer id="footer">${html_footer.html_footer({})}</footer></body></html>`;
}

module.exports = { purchase };
