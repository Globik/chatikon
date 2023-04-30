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
