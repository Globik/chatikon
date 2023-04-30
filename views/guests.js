const html_head = require('./html_head');
const html_nav_menu = require('./html_nav_menu');

//const html_admin_nav_menu = require('./html_admin_nav_menu');
//const html_footer = require('./html_footer');
const { get_meta } = require('./get_meta');

const { site_domain } = require('../config/app.json');

const guests = function (n) {
	const buser = n.user;
	return `<!DOCTYPE html><html lang="${n.lang ? 'ru' : 'en'}"><!-- login.js -->
<head>${html_head.html_head({
		title: `${n.site} - guests`,csslink: "/css/main2.css", luser: buser})}
	
		</head><body><nav class="back">${html_nav_menu.html_nav_menu(n)}</nav>
		<main id="pagewrap">
		<h1>Guests</h1>
		${n.guests ? getGuests(n.guests) : "No one else"}
		</main><!-- <script src="/js/push.js"></script> --></body></html>`;
	}
	module.exports = { guests: guests }
	
	function getGuests(arr){
		let arr2 = arr.sort(function(a, b){
			return new Date(a.date) - new Date(b.date);
		});
		let arr3 = arr2.reverse();
		let s = "";
		arr3.forEach(function(el, i){
s+=`<div>${i + 1}) ${el.country}, ${el.city}, ${new Date(el.date).toLocaleString('ru-RU', {year:'numeric',weekday:'long',month:'long',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric',hour12:false})}.</div>`;
//toLocaleString('ru-RU', {year:'numeric',weekday:'long',month:'long',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric',hour12:false});
		});
		return s;
	};
		
