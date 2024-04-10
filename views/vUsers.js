function vUsers(n){
	return `${n.users && n.users.length > 0 ? listUsers(n.users) : '<b>Нет никого.</b>'}`;
}
module.exports = { vUsers }

function listUsers(users){
	let s = '';
	users.forEach(function(el, i){
		s+=`<div>${i+1}) <b>имя: </b>${el.name}</div>`;
		s+=`${el.brole=='admin'?'<div>aдмин</div>':''}`;
		s+=`<div><b>регистрация: </b>${getData(el._id)}</div><hr>`;
	});
	return s;
}
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
function getData(n){
let timeStamp = parseInt(n.toString().substr(0,8), 16)*1000
return new Date(timeStamp).toLocaleString("ru-RU", options)
	
	}

//console.log(date.toLocaleString("de-DE", options));
// "Donnerstag, 20. Dezember 2012"
