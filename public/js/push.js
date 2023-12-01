/*
function subscribeWebpush(el) {
    el.className = "puls";
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
        OneSignal.init({
            appId: "bdd08819-3e41-4e1b-a1bf-13da2ff35f7c"
        });
        OneSignal.setExternalUserId("1");
    });
    OneSignal.isPushNotificationsEnabled(function (isenabled) {
        if (isenabled) {
            logp("push notifications are enabled!");
            OneSignal.getUserId(function (userid) {
                logp("userid: " + userid);
            })
        } else {
            console.log("push notifications are not enabled yet");
            logp("push notifications are not enabled yet");
        }
    })
    OneSignal.on('permissionPromptDisplay', function () {
        console.log("The prompt displayed");
        logp("The promt displayd");
    });
    OneSignal.push(["getNotificationPermission", function (permission) {
        console.log("Site Notification Permission:", permission);
        logp("Site Notification Permission: " + permission);
    }]);
    OneSignal.push(function () {
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            console.log("The user's subscription state is now:", isSubscribed);
            logp("The user's subscription state is now: " + isSubscribed);
            el.className = "";
        });
    });
    OneSignal.push(function () {
        OneSignal.on('notificationDisplay', function (event) {
            console.warn('OneSignal notification displayed:', event);
            console.log("OneSignal notification displayed: " + event);
            el.className = "";
        });

    });
}*/
function logp(t) {
    let out = gid("out");
    if (out) {
        return out.innerHTML += t + "<br>";
    }
}
var token;
function someFocus(ev){
	out.innerHTML="";
}
note({
	content:window.innerWidth + " x " + window.innerHeight,
	type:"info",
	time:10
});
function go_login(ev){
	
//	ev.preventDefault();
	try{
let data = {};
data.username = 'dima';//name.value;
data.password = '1234';//password.value;
vax("post", "/login", data, on_login, on_login_error, ev, false);
ev.className = "puls";	
ev.disabled=true;
}catch(e){alert(e);console.log(e);}
return false;
}
function on_login(l, ev){
	token=l.token;
	//alert(JSON.stringify(l));
	//return;
	ev.className = "";
//var sessRed = gid('sessRed');
//if_cont(sessRed,'green', 'red');

//sessRed.innerHTML = l.info;
//window.location.href = "#.";
in_rem_hash();
if(l.status == 200){
setTimeout(function(){
if(window.location.pathname == "/login"){
window.location.href = "/";	
}else{
//location.reload();
}
},1);
}else if(l.status== 401){
	put();
	ev.disabled = false;
}
}
function on_login_error(l, ev){
	ev.className = "";
	ev.disabled = false;
	out.innerHTML = '<span class="error">' + l + '</span>';

}

function put(){
	var ln = lang;
	if(ln == 'ru'){
		out.innerHTML = '<span class="error">Неверный ник или пароль!</span>';
	}else if(ln == 'en'){
		out.innerHTML = '<span class="error">Wrong login or password!</span>';
	}else if(ln == 'de'){
		out.innerHTML = '<span class="error">Falscher Login oder Passwort!</span>';
	}else if(ln == 'es'){
		out.innerHTML = '<span class="error">¡Usuario o contraseña incorrectos!</span>';
	}else if(ln == 'fr'){
		out.innerHTML = '<span class="error">Identifiant ou mot de passe incorrect!</span>';
	}else if(ln == 'zh'){
		out.innerHTML = '<span class="error">登录名或密码错误！</span>';
	}else{}
}




























