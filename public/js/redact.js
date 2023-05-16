

function saveTxt(el){
	if(!txt.value)return;
	let a=el.getAttribute("data-ln");
	let b=txt.value;
	el.className = "puls";
	let d = {};
	d.lang = a;
	d.txt = b;
	
		vax("post", "/saveTxt", d, onSave, onErr, el, false);
		
}

 function updateTxt(el){
	if(!txt.value)return;
	let a=el.getAttribute("data-ln");
	let b=txt.value;
	el.className = "puls";
	let d = {};
	d.lang = a;
	d.txt = b;
	let f = el.getAttribute("data-id");
	d.id = f;
	console.log(d);
	vax("post", "/saveEdit", d, onEdit, onErr, el, false);
}















function onEdit(l,el){
	el.className = "";
	note({content: "Saved", type:"info", time:5});
	art.innerHTML = txt.value
	txtwrapper.style.display = "none";
	//window.reload();
}
function editTxt(el){
	txtwrapper.style.display = "block";
	txt.value = art.innerHTML;
}

function onSave(l, el){
	el.className = "";
	note({content: "Saved", type:"info", time:5});
	art.innerHTML = txt.value
	txtwrapper.style.display = "none";
	window.reload();
}
function onErr(l, el){
	el.className = "";
	note({content: l, type:"error", time:5});
}
function gettext(el){
	txtwrapper.style.display = "block";
}
