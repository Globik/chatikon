function clearWindows(){
	contentBox.innerHTML = "";
	dynamicSection.style.display = "none";
	someSpinner.className = "show";
}

function getUsers(el){
	clearWindows();
	vax('get','/api/getUsers', {}, on_get_users, on_error, el, false);
}

function on_get_users(l, el){
	someSpinner.className = "hide";
	contentBox.innerHTML = l.content;
}
function on_error(l, v){
	someSpinner.className = "hide";
	note({ content: l, type: "error", time: 5 });
}
