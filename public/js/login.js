/*
    window.onload=function(){
   const cat = localStorage.getItem("myCat");
   if(!cat && cat !=="Tom"){
    window.location.href="#regeln";
}else{
	let islogin = localStorage.getItem("islogin");
	if(!islogin && islogin !=="yes")window.location.href="#login";
}
}
   
    
function confirmRules(){
	localStorage.setItem("myCat", "Tom");
	window.location.href="#login";
}
function isOpenModal(){
	 window.location.href="#regeln";
}
*/
function logi(el){
	el.preventDefault();
	//el.stopPropogation();
}

const myform = gid("myform");
const name = gid("name");
const password = gid("password");
const btnlogin = gid("btnlogin");
const btnregister = gid("btnregister");
btnlogin.addEventListener('click', register, false);
btnregister.addEventListener('click', register, false);

async function register(el){
	el.preventDefault();
	//el.stopPropagation();
    errormsg.textContent = "";
   
   var sname = document.getElementById('name').value;
   if(!sname){
	    note({content:"Введите имя!", type:"info", time: 5});
	    return;
	}
	if(!password.value){
		note({content: "Введите пароль!", type: "info", time: 5});
		return;
	}
	el.target.disabled = true;
let user = {};
user.username = sname;
user.password = password.value;
//alert(JSON.stringify(user))
let uri = (el.target.className=="register-button" ? "/signup":"/login");
try{
var r=await fetch(uri, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(user)
    });
    
  console.log('res ', r);
    if(r.ok){
		console.log('ok');
		let data=await r.json();
		console.log('data: ', data);
		if(data.success==false){
			 errormsg.textContent = data.message || data.info;
			
			  setTimeout(() => {
        el.target.disabled = false;
         errormsg.textContent = "";
        }, 3500)
return;
			 
		}
	
localStorage.setItem("islogin" , "yes");
window.location.href="#.";
//in_rem_hash();
         location.reload();
          
          
   
		
	}
	
}catch(error){
	
      

        setTimeout(() => {
          errormsg.textContent = "";
        }, 3500)

        console.error(error)
	
	}
	el.target.style.backGround="green";
	}
	function logi(ev){
		ev.preventDefault();
	}
	
async function logout(){
	try{
var r=await fetch('/logout', {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({user:'user'})
    });
    
  console.log('res ', r);
    if(r.ok){
		console.log('ok');
		let data=await r.json();
		console.log('data: ', data);
		if(data.error){
			console.error(data.error);
			 errormsg.textContent = data.message;
			
			  setTimeout(() => {
        
         errormsg.textContent = "";
        }, 3500)
return;
			 
		}
	//localStorage.removeItem("islogin");
	//localStorage.removeItem("myCat");
	location.reload();
}}catch(err){
	alert(err);
}
}
