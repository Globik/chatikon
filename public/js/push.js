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
}
function logp(t) {
    let out = gid("out");
    if (out) {
        return out.innerHTML += t + "<br>";
    }
}
var token;
function go_login(ev){
	
//	ev.preventDefault();
	try{
let data = {};
data.username = 'dima';//name.value;
data.password = '1234';//password.value;
vax('post', '/auth', data, on_login, on_login_error, ev, false);
//ev.disabled = true;
//ev.lsubmit.className = "puls";	
}catch(e){alert(e);console.log(e);}
return false;
}
function on_login(l, ev){
	token=l.token;
	//alert(JSON.stringify(l));
	
//	ev.lsubmit.className = "";
var sessRed = gid('sessRed');
//if_cont(sessRed,'green', 'red');

//sessRed.innerHTML = l.info;
//window.location.href = "#.";
in_rem_hash();
setTimeout(function(){
if(window.location.pathname == "/login"){
window.location.href = "/";	
}else{
//location.reload();
}
},1);
}
function on_login_error(l, ev){
	ev.lsubmit.className = "";
	ev.disabled = false;
	alert(l);
//gid("sessRed").innerHTML =  l;
}
async function fuck(){
	//alert(token);
	 const response = await fetch("http://localhost:3000/api/users/current", {
		  method:'GET',
		  headers: {
			  'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
            }
            });
  const jsonData = await response.json();
  console.log(jsonData);
  alert(jsonData);
}




























