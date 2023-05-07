var sock = null;
var pc = null;
var dc = null;
var videoInput;
var videoInput2;
var timer;
var timerIt;
var clientId;
var targetId;
var FUCKER = false;
var spanWhosOn = gid("spanWhosOn");
var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;
//const codecPreferences = gid("codecPreferences");
const supportsCodecPreferences = window.RTCRtpTransceiver && 'setCodecPreferences' in window.RTCRtpTransceiver.prototype;
const offerOpts = {offerToReceiveAudio: 1, offerToReceiveVideo: 1};



var con = {iceServers: [
{   
	urls: [ "stun:fr-turn1.xirsys.com" ]
	}, 
	{   username: "sy6E_DhPdsS-mVCJVDwQfiGZzLrZ_0ldAHMSraAIu7Upm8iP8VBInygTyGwPpvLdAAAAAGQ79hJHbG9iaQ==",
		   credential: "6eab5a34-dc59-11ed-9b35-0242ac120004",  
		 urls: [       
		 "turn:fr-turn1.xirsys.com:80?transport=udp",   
		     "turn:fr-turn1.xirsys.com:3478?transport=udp",    
		    "turn:fr-turn1.xirsys.com:80?transport=tcp",     
		   "turn:fr-turn1.xirsys.com:3478?transport=tcp",     
		   "turns:fr-turn1.xirsys.com:443?transport=tcp",  
	     "turns:fr-turn1.xirsys.com:5349?transport=tcp"  
	 ]}]
 };



var coni = {iceTransportPolicy:"all","iceServers":[{urls:["stun:45.89.66.167:3478"]},
	{urls:["turn:45.89.66.167:3478?transport=udp","turn:45.89.66.167:5349?transport=tcp"]
		,username:"alik",credential:"1234"}]};


var config = coni;
console.log(config);
if (window.location.protocol === "https:") {
  new_uri = "wss:";
} else {
  new_uri = "ws:";
}

function get_socket() {
  sock = new WebSocket(new_uri + "//" + loc3 + "/gesamt");

  sock.onopen = function () {
    console.log("websocket opened");
  };
  sock.onerror = function (e) {
    note({ content: "Websocket error: " + e, type: "error", time: 5 });
  };
  sock.onmessage = function (evt) {
	  //console.warn(evt.data);
    let a;
    try {
      a = JSON.parse(evt.data);
      on_msg(a);
    } catch (e) {
      note({ content: e, type: "error", time: 5 });
    }
  };
  sock.onclose = function () {
    sock = null;
    note({ content: (nstr == "ru" ? "Соединение с сервером закрыто!" : "Websocket closed!"), type: "error", time: 5 });
  };
}

get_socket();

function on_msg(data) {
	console.log("data type: ", data.type);
	//debug("data type: " + data.type);
  if(data.type == "welcome"){
	  clientId = data.clientId;
  }else if(data.type == "howmuch"){
    if(spanWhosOn) spanWhosOn.textContent = data.value;
  }else if(data.type == "flag"){
	  flag.src = data.flag;
  }else if(data.type == "warte_offer"){
	  console.warn("warte offer from: ", data.from, " du: ", clientId);
	  debug("waiting offer from: " + data.from);
	  debug("You are: " + clientId);
	  targetId = data.from;
	//  note({content: "Connecting a human.", type: "info", time: 5});
  }else if(data.type == "make_offer"){
	  //note({content: "Connecting a human.", type: "info", time: 5});
	  console.warn("to:", data.target, " du: ", clientId);
	  debug("making an offer to: " + data.target);
	  debug("You are: " + clientId);
	  targetId = data.target;
	  makeOffer(data.target);
  }else if(data.type == "offer"){
	 console.warn(targetId, " == ", data.from);
 //if(data.from == targetId){
 
	 handleOffer(data.offer, data.from);
 //}	  
  }else if(data.type == "answer"){
  handleAnswer(data.answer);	  
  }else if(data.type == "candidate"){
	  handleCandidate(data.candidate);
  }else if(data.type == "info"){
	//  note({content: data.info, type: "info", time: 5});
  }else if(data.type == "bye"){
	  console.log("*** BYE ***");
	  handleLeave();
  }else{
    note({ content: "No type " + data.type, type: "error", time: 5 });
  }
}

localVideo.srcObject = null;
//remoteVideo.srcObject = null;


var ellang = document.querySelector("html");
	var nstr = ellang.getAttribute('lang');


function letStart(el){
	
	if(FUCKER){
		el.setAttribute("data-type", "weiter");
		handleLeave();
		return;
	}
	let abb = (videoInput ? {exact: videoInput} : undefined);
	
	let abba =  (abb ? {deviceId: abb} : true);
	
		
		let constraintsi = {
		audio:{
      echoCancellation: true,
      autoGainControl: true,
      noiseSuppression: true,
      channelCount: 1,
      sampleRate:48000,
      sampleSize: 16
    }, 
	video: {deviceId: videoInput ? {exact: videoInput} : undefined}
		};
		
		let constraints = { audio: true, video: true };
		
	navigator.mediaDevices.getUserMedia(constraintsi).then(function(stream){
	if(!localVideo.srcObject){
		
	if(el.getAttribute("data-type") == "go"){
		/*let newStream = new MediaStream();
		stream.getTracks().forEach(function(track){
			newStream.addTrack(track);
		});*/
	localVideo.srcObject = stream;	
	window.streami = stream;



	el.setAttribute("data-type", "weiter");
	el.disabled = true;
	
	
	el.textContent = nstr == "ru" ? "дальше" : "further";
	
	}else{
		
		if(videoInput2){
			
			handleLeave();
		}
	}
	}else{
		
		if(el.getAttribute("data-type") == "weiter"){
			
			handleLeave();
		}else{}
	}
	}).catch(handleError);
}

function handleError(err){
		note({"content": err, type: "error", time: 5});
		debug("<b>Some error: </b>" + err);
	}

function changeCamera(el){
	if(btnStart.getAttribute("data-type") == "go"){ 
		
		return;
		}

	if(!videoInput2) {
		note({content: (nstr == "ru" ? "Не работает!" : "Does not work!"), type: "info", time: 5});
		return;
	}
	if(window.streami){
		window.streami.getTracks().forEach(function(track){
			track.stop();
		});

	localVideo.srcObject = null;

	}
	var dura;
	var si = el.getAttribute("data-current");
	if(si !== videoInput2){
	el.setAttribute("data-current", videoInput2);
	dura = videoInput2;
	
	FUCKER = true;
}else{
	el.setAttribute("data-current", videoInput);
	dura = videoInput;
	
	FUCKER = false;
}

	let constraints={audio:{
      echoCancellation: {exact: true}
    }, video:{deviceId: dura ? {exact: dura} : undefined}}
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
	localVideo.srcObject = stream;	
	window.streami = stream;
	
	
	if(!pc) {
		
		return;
	}
	 let videoTrack = stream.getVideoTracks()[0];
	   var sender = pc.getSenders().find(function(s) {
        return s.track.kind == videoTrack.kind;
      });
      
      sender.replaceTrack(videoTrack).then(function(){
		  
	  }).catch(handleError);
	 
	 
	}).catch(handleError)

}

var kK = 0;

function gotDevices(deviceInfos){
	let a = navigator.mediaDevices.getSupportedConstraints();
	//debug(JSON.stringify(a));
	for(var i=0; i !== deviceInfos.length; ++i){
		//debug(JSON.stringify(deviceInfos[i]));
		const deviceInfo = deviceInfos[i];
		if(deviceInfo.kind === 'videoinput'){
			if(kK == 0){
				videoInput = deviceInfo.deviceId;
				currentCamera.setAttribute("data-current" , deviceInfo.deviceId);
				debug("<b>label:</b> " + deviceInfo.label);
			}else if(kK == 1){
				videoInput2 = deviceInfo.deviceId;
				debug("<b>label:</b> " + deviceInfo.label);
			}
			
			kK++;
		}
	}
}
/*
async function fc(){
	try{
let c = await navigator.mediaDevices.getSupportedConstraints();
console.log(c)
}catch(e){console.error(e);}
}
fc();
*/ 
if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices){
  debug("enumerateDevices() not supported.");
}else{
navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
}
function makeOffer(target){
	console.log("makeoffer()");
    doPeer();
    
    
	//someCodec();
	//changeVideoCodec('video/VP9');
	pc.createOffer(offerOpts).then(function(offer){
		return pc.setLocalDescription(offer);
	}).then(function(){
		debug("send type offer");
		wsend({'type': 'offer', offer: pc.localDescription, target: target, from: clientId});
	}).catch(handleError);

}


function doPeer(){
	try{
	pc = new RTCPeerConnection(config);
}catch(e){alert(e);return;}
	console.log("dopeer()");

 var streami = window.streami;
 try{
    streami.getTracks().forEach(function(track){
	pc.addTrack(track, streami);
	})
}catch(e){alert(e);}
//pc.addStream(window.streami);

	if('ontrack' in pc){
	pc.ontrack = addStream;
}else{
	pc.addStream(streami);
	pc.onaddstream = function(e){
		remoteVideo.srcObject = e.stream;
	}
}
	pc.onicecandidate = iceCandidate;
	pc.oniceconnectionstatechange = iceConnectionStateChange;
	pc.onconnectionstatechange = onConnectionStateChange;
	
    pc.onicegatheringstatechange = gatheringStateChange;
    pc.onicecandidateerror = iceCandidateError;
    pc.onnegotiationneeded = onNegotiation;
    pc.onsignalingstatechange = onSignalingState;
    pc.ondatachannel = receiveChannelCb;
    dc = pc.createDataChannel('globi',{ negotiated: true, id: 0 });
		dc.onopen = onChannelState;
		dc.onclose = onChannelState;
		dc.onmessage = onReceiveMsg;

	}


function handleOffer(offer, from){

	doPeer();
	pc.setRemoteDescription(offer).then(function(){
		return pc.createAnswer().then(function(answer){
			return pc.setLocalDescription(answer).then(function(){
				wsend({type: 'answer', answer: pc.localDescription, target: from, from: clientId});
			});
		});
	}).catch(handleError);
}

function handleCandidate(candidate){
	if(pc){
		var cand = new RTCIceCandidate(candidate);
		pc.addIceCandidate(candidate).then(function(){
			//debug("Success candidate. " + JSON.stringify(candidate));
		}).catch(handleError);
	}
}

function addStream({ track, streams }){
	//debug("addStream()");
	track.onunmute = function(){
		//debug("onunmute()");
		if(remoteVideo.srcObject){return;}
	remoteVideo.srcObject = streams[0];
		//return false;
	}
	streams[0].onremovetrack = ({ track }) => {
    debug(track.kind + " track was removed.");
    if (!streams[0].getTracks().length) {
      debug("stream " + streams[0].id + " emptied (effectively removed).");
    }
  };
	}
	

	function iceCandidate(e){
		if(e.candidate) {
			wsend({type: 'candidate', candidate: e.candidate, target: targetId});
		}
	}
	let codecList = null;
	
	function gatheringStateChange() {
  if(pc.iceGatheringState == "complete"){
	
  }
  
}
function iceCandidateError(e) {
	console.error("ice err: ", e.url, e.errorText );
	debug("<b>ice err:</b> " + e.url + " " + e.errorText );
	note({content: "ice err: " + e.url + " " + e.errorText, type: "error", time: 5});
}
function onNegotiation(e){
	console.log("negotiation needed.");
	debug("negotiation needed.");
	
}
function onConnectionStateChange(e){
	console.log('connection state: ' + pc.connectionState);
	debug('Connection state: ' + pc.connectionState);
	if(pc.connectionState == "failed" || pc.connectionState == "closed"){
		//pc.restartIce();
		handleLeave();
}
}

function onSignalingState(e){
	console.log("signaling state: " + pc.signalingState);
	debug("Signaling state: " + pc.signalingState);
}
	function iceConnectionStateChange(e){
		if(pc) {
			console.log('ice connection state: ', pc.iceConnectionState);
			debug('ice connection state: ' + pc.iceConnectionState);
			if(pc.iceConnectionStateChange == "checking"){
				
			}else if(pc.iceConnectionState == "connected"){
				wsend({type: "unfertig", target: targetId});
				
				remoteVideoBox.className = "";
				btnStart.disabled = false;
				
		
 
			}else if(pc.iceConnectionState == "failed" || pc.iceConnectionState == "disconnected"){
				//pc.restartIce();
				handleLeave();
			}else{}
		}
	}
	
	function handleAnswer(answer){
		pc.setRemoteDescription(answer).then(function(){
			
		}).catch(handleError);
	}
	
function handleLeave(e){
	wsend({type: "bye", target: targetId});
	
	
	
		if(!pc) return;
		if(remoteVideo.srcObject){
		remoteVideo.srcObject.getTracks().forEach(function(track){
			track.stop();
		});
		}
		//if(dc) dc.close();
		//dc = null;
		pc.close();
		
		
		console.log("pc: ", pc.signalingState);
		debug("pc: " + pc.signalingState);
	flag.src="";
	remoteVideo.srcObject = null;
		targetId = null;
	
    
    
    pc.ontrack = null;
	//pc.onremovestream = null;
	pc.onicecandidate = null;
	pc.oniceconnectionstatechange = null;
	pc.onconnectionstatechange = null;
	
    pc.onicegatheringstatechange = null;
    pc.onicecandidateerror = null;
    pc.onnegotiationneeded = null;
    pc.onsignalingstatechange = null;
	
	pc = null;

	wsend({type: "fertig"});
	btnStart.disabled = true;
	remoteVideoBox.className = "connecting";
	//channelKrug.classList.toggle("disabled");
	debug("*************************************");
	
}
function wsend(obj){
	if(!sock) return;
	let d;
	try{
		d = JSON.stringify(obj);
		sock.send(d);
	}catch(e){}
}

localVideo.onloadedmetadata = function () {
	debug("Local video enabled.");
	localVideoBox.className = "";
	remoteVideoBox.className = "connecting";
	wsend({type: "fertig"});
	//localVideo.unmuted = true;
	if(timerIt){clearInterval(timerIt);}
	 timerIt = setInterval(function(){
		if(!targetId){
			wsend({type: "fertig"});
		}
	}, 5000);
	}
remoteVideo.onloadedmetadata = function () {
	debug("Remote video enabled.");
	remoteVideoBox.className = "";
	
	wsend({type: "flag", target: targetId });
}



function debug(s){
	if(!gid("out")) return;
	out.innerHTML+=s+"<br>";
}



function hasUserMedia(){
	return !!(navigator.getUserMedia);
}
 if(!hasUserMedia()){
	 alert("Ваш браузер не поддерживает технологию webRTC! Используйте, пожалуйста, новейшие браузеры Chrome или Firefox на настольных ПК и телефонах.");
 }



var brows = adapter.browserDetails.browser;
console.log(brows);
var vers = adapter.browserDetails.version;
console.log(vers);
//debug("<b>Your browser, version:</b> " + brows + " " + vers);


function openChat(el){
		
		if(!pc){return;}
		
		privatcontainer.classList.toggle("out");
	}

function onChannelState(){
	//alert("channel " + dc.readyState);
	if(dc.readyState == "open"){
		//privatcontainer.classList.toggle("out");
		channelKrug.classList.toggle("disabled");
	}else{
		privatcontainer.classList.toggle("out");
		channelKrug.classList.toggle("disabled");
		privatchat.innerHTML = "";
	}
}
function onReceiveMsg(event){
	try{
		let a = JSON.parse(event.data);
		insertMsg(a);
	}catch(e){}
}

function insertMsg(obj){
	if(!privatcontainer.classList.contains("out")){
		privatcontainer.classList.add("out");
	}
	let m = document.createElement("div");
		m.className = "chat-div";
		m.innerHTML+='<span class="chat-user">' + obj.from + ': </span><span class="chat-msg">'+ obj.msg +'</span>';
		privatchat.appendChild(m);
		privatchat.scrollTop=privatchat.clientHeight + privatchat.scrollHeight;
}

function receiveChannelCb(event){
	dc = event.channel;
	dc.onmessage = onReceiveMsg;
	dc.onopen = onChannelState;
	dc.onclose = onChannelState;
}

	function sendPrivat(el){
		if(!dc) return;
		if(!privatinput.value) return;
		let a;
		try{
			a = JSON.stringify({from: "anonym", msg: privatinput.value});
		}catch(e){return;}
		dc.send(a);
		insertMsg({from: "You", msg: privatinput.value});
		privatinput.value = "";
	}
