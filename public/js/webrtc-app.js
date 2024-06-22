var sock = null;
var pc = null;
var dc = null;
var videoInput;
var videoInput2;
var timer;
var timerIt;
var clientId;
var targetId;
var hisrealid;
var FUCKER = false;
var spanWhosOn = gid("spanWhosOn");
var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;
var fasa;
var CONNECTED = false;
var btnStart = gid("btnStart");
var nextBtn = gid('nextBtn');
var localVideo = gid('localVideo');
var remoteVideo = gid("remoteVideo");
var remoteVideoBox = gid("remoteVideoBox");
var localVideoBox = gid("localVideoBox");
var cloader = gid('cloader');
var ellang = document.querySelector("html");
var nstr = ellang.getAttribute('lang');
var znakPrint = gid("znakPrint");
var privatcontainer = gid("privatcontainer");
// bc1qy9cz8h230kqpp2mm7ynlzzwnm80xgdj2z5djz7
btnStart.addEventListener('click', letStart, false);
nextBtn.addEventListener('click', donext, false);
//const codecPreferences = gid("codecPreferences");
const supportsCodecPreferences = window.RTCRtpTransceiver && 'setCodecPreferences' in window.RTCRtpTransceiver.prototype;
const offerOpts = {offerToReceiveAudio: 1, offerToReceiveVideo: 1};
function copy(){
	navigator.clipboard.writeText(aid.textContent).then(function(){
		note({ content: "OK, copied!", type: "info", time: 5 });
	}, function(err){
		alert(err);
	});
}
var DATI = {};

var con = {iceServers: [{   urls: [ "stun:fr-turn1.xirsys.com" ]},
	 {   username: "sy6E_DhPdsS-mVCJVDwQfiGZzLrZ_0ldAHMSraAIu7Upm8iP8VBInygTyGwPpvLdAAAAAGQ79hJHbG9iaQ==", 
		   credential: "6eab5a34-dc59-11ed-9b35-0242ac120004", 
		     urls: [       "turn:fr-turn1.xirsys.com:80?transport=udp",     
		       "turn:fr-turn1.xirsys.com:3478?transport=udp",     
		         "turn:fr-turn1.xirsys.com:80?transport=tcp",    
		            "turn:fr-turn1.xirsys.com:3478?transport=tcp",   
		                "turns:fr-turn1.xirsys.com:443?transport=tcp",  
	     "turns:fr-turn1.xirsys.com:5349?transport=tcp"   ]}]
 };

//45.89.66.167:5349 
/*
	
0.060	srflx	284386497	udp	77.222.113.209	59584	100 | 32542 | 255	stun:45.89.66.167:80	
0.131	host	1866265727	tcp	192.168.0.106	9	90 | 32542 | 255		
0.456	Authentication failed?
0.455	relay	3426018743	udp	45.89.66.167	56327	2 | 32543 | 255	turn:45.89.66.167:80?transport=udp	udp
//"stun:45.89.66.167:3478"
		// stun:45.89.66.167:3479
*/
var conis3 = {
	"iceServers":[
	{
      "urls": "stun:stun.l.google.com:19302"
    },
	{
		"urls":["stun:chatslider.online:3478",
	"stun:chatslider.online:3479",]
		
		},
	{urls:[
	"turn:chatslider.online:3478?transport=udp",
		"turn:chatslider.online:3478?transport=tcp", 
		"turn:chatslider.online:3479?transport=udp",
		"turn:chatslider.online:3479?transport=tcp" //no stun
		]
		,username:"alik",credential:"1234"}]};
//	284F8AF315982DBA49BBB226F919D69A1816BCC733EA8697AD111C36EDFC2AB4
//OAuth2 client_secret
//630EF11C0EBD4AA7F15CC929184FA6B91D0E1FD0513CF8E2EC6F12607B904A733E5DA1685B3EA9C483B221D20D43F9CD0F9E6E1C89F2BC8B6309A90E6105CD86	
 var conis4 ={/*iceTransportPolicy:"relay",*/
  "iceServers": [
    {
      "urls": "stun:stun.l.google.com:19302"
    },
    {
      "urls": "turn:relay1.expressturn.com:3478",
      "username": "efZIKNPZ0Y17GFG3WZ",
      "credential": "HIYNupkIAHFXSgW8"
    }]}
	var conis = {
  "iceServers": [
    {
      "urls": "stun:stun.l.google.com:19302"
    },
    {
      "urls": "turn:relay1.expressturn.com:3478",
      
      "username": "efF80AKULRWCVI7JYZ",
      "credential": "8I8md50Q5otRskFc"
    },
    {
      "urls": "turn:relay1.expressturn.com:3478?transport=udp",
      
      "username": "efF80AKULRWCVI7JYZ",
      "credential": "8I8md50Q5otRskFc"
    },
    /*
     {
      "urls": "stun:stun.relay.metered.ca:80"
    },
    
    {
      "urls": "turn:a.relay.metered.ca:80",
      "username": "33c88ed716afa1a802b5116a",
      "credential": "YlI1/qfkEWya3Q4p"
    },
    {
      "urls": "turn:a.relay.metered.ca:80?transport=tcp",
      "username": "33c88ed716afa1a802b5116a",
      "credential": "YlI1/qfkEWya3Q4p"
    },
    {
      "urls": "turn:a.relay.metered.ca:443",
      "username": "33c88ed716afa1a802b5116a",
      "credential": "YlI1/qfkEWya3Q4p"
    },
    {
      "urls": "turn:a.relay.metered.ca:443?transport=tcp",
      "username": "33c88ed716afa1a802b5116a",
      "credential": "YlI1/qfkEWya3Q4p"
    }*/
]};	



var coni = {iceTransportPolicy:"relay","iceServers":[{urls:["stun:127.0.0.1:3478"]},
	{urls:["turn:127.0.0.1:3478?transport=udp",
		"turn:127.0.0.1:5349?transport=tcp"
		]
		,username:"alik",credential:"1234"}]};
//141.8.195.180
var conis2 = {iceServers:[
	{
		urls:["stun:141.8.195.180:80"]
		},
	{urls:[
		"turn:141.8.195.180:443?transport=tcp"
		]
		,username:"alik",credential:"1234"}]};
	
		 var conis6 = new RTCPeerConnection({ iceServers: [
   { urls: "stun:stun.relay.metered.ca:80", }, 
  { urls: "turn:standard.relay.metered.ca:80", username: "34351867ccbc6431d4ac0b65", credential: "y2DxVs2Q8bg5Q6db", },
   { urls: "turn:standard.relay.metered.ca:80?transport=tcp", username: "34351867ccbc6431d4ac0b65", credential: "y2DxVs2Q8bg5Q6db", },
    { urls: "turn:standard.relay.metered.ca:443", username: "34351867ccbc6431d4ac0b65", credential: "y2DxVs2Q8bg5Q6db", },
   { urls: "turns:standard.relay.metered.ca:443?transport=tcp", username: "34351867ccbc6431d4ac0b65", credential: "y2DxVs2Q8bg5Q6db", }, ], });
		
var config = conis3;
console.log(config);
if (window.location.protocol === "https:") {
  new_uri = "wss:";
} else {
  new_uri = "ws:";
}

function get_socket() {
 if(!sock) sock = new WebSocket(new_uri + "//" + loc3 + "/gesamt");

  sock.onopen = function () {
    console.log("websocket opened");
    wsend({ type: "hiserver", nick: mynick.value, myid: myrealid.value });
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
    webcams.textContent = data.online;
  }else if(data.type == "flag"){
	  flag.src = data.flag;
  }else if(data.type == "warte_offer"){
	  console.warn("warte offer from: ", data.from, " du: ", clientId, " ", fasa);
	   targetId = data.from;
	   hisrealid = data.realid;
	  if(fasa && fasa === 'make_offer'){
		  console.warn("fasa", fasa);
		   return;
	   }
	  fasa = "warte_offer";
	  // targetId = data.from;
	  //alert(targetId);
	  debug("waiting offer from: " + data.from);
	  debug("You are: " + clientId);
	  
	//  note({content: "Connecting a human.", type: "info", time: 5});
  }else if(data.type == "make_offer"){
	 // note({content: "Connecting a human.", type: "info", time: 5});
	  if(fasa && fasa === "warte_offer") return;
	  fasa = "make_offer";
	  console.warn("to:", data.target, " du: ", clientId);
	  debug("making an offer to: " + data.target);
	  debug("You are: " + clientId);
	  targetId = data.target;
	  hisrealid = data.realid;
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
	  if(CONNECTED){
		  return;
	  }
	  note({content: data.info, type: "info", time: 5});
  }else if(data.type == "bye"){
	  console.log("*** BYE ***");
	  handleLeave();
  }else if(data.type == "dynamic"){
if(data.online)webcams.textContent = data.online;	
if(data.connects !=undefined){
//alert("data.connects " + data.connects)
Connects.textContent =  data.connects;  
}

  }else{
    note({ content: "No type " + data.type, type: "error", time: 5 });
  }
}

localVideo.srcObject = null;
//remoteVideo.srcObject = null;

let constraints = { audio: true, video: true };
var constraints2 = { audio: false, video: true };

localVideo.srcObject = null;
function starti(el){
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
	if(localVideo.srcObject==null){
	localVideo.srcObject = stream;	
	window.streami = stream;

	}
	
}).catch(function err(e){
	alert(e);//o
})}
function stopi(el){
	localVideo.srcObject.getTracks().forEach(function(track){
			track.stop();
		});
		localVideo.srcObject=null;
		window.streami = null;
		localVideoBox.className = "";
			cloader.className = "unspinner";
		
			
	if(timerIt){clearInterval(timerIt);}
		if(pc)wsend({ type: "bye", target: targetId });
	handleLeave();
		sock.close();
		
		sock = null;
		btnStart.disabled = false;
		btnStart.className = 'btn';
		btnStart.textContent = "start";
		btnStart.setAttribute('data-type',"go" );

		remoteVideoBox.className = "buddy";
		localVideoBox.className = "buddy";
		el.setAttribute("data-type", "go");
		console.log("stoping");
		
}
function letStart(el){
	if(!sock) {
		//alert("!sock");
		get_socket();
		}
	if(el.target.getAttribute("data-type") == "go"){
		localVideoBox.className = "";
			cloader.className = "";
			el.target.disabled = true;

}	
if(FUCKER){
		el.target.setAttribute("data-type", "weiter");
		handleLeave();
		return;
	}
	let abb = (videoInput ? {exact: videoInput} : undefined);
	
	let abba =  (abb ? {deviceId: abb} : true);
	
		//\n  "width": 320,\n  "height": 240,\n  "frameRate": 30\n}
		let constraintsi22 = {
		audio: true/*{
      echoCancellation: true,
      autoGainControl: true,
      noiseSuppression: true,
      channelCount: 1,
      sampleRate:48000,
      sampleSize: 16
    }*/, 
	video: {deviceId: videoInput ? {exact: videoInput} : undefined,
		width:320, height:240, 
	//	frameRate:15
		}
		};
		
		
		/*try{
		let supportedConstraints=navigator.mediaDevices.getSupportedConstraints();
	
		for(const constraint in supportedConstraints){
			if(Object.hasOwn(supportedConstraints, constraint)){
			//	debug(constraint);
			}
		}
	}catch(e){
		console.error(e);
	}*/
	let constraintsi = { audio:true,video:true };
	if(el.target.getAttribute("data-type") == "go"){
	navigator.mediaDevices.getUserMedia(constraintsi).then(function(stream){
	
		//document.body.click();
	
	localVideo.srcObject = stream;	
	window.streami = stream;


	el.target.setAttribute("data-type", "stop");
	
	}).catch(function(err){
		console.error(err);
		alert(err);
		// NotReadableError: Could not start audio source
		if(e.name =='NotReadableError' || e.name == 'TrackStartError'){
			navigator.mediaDevices.getUserMedia(constraints2).then(function(stream){
	//if(!localVideo.srcObject){
		//document.body.click();
	if(el.target.getAttribute("data-type") == "go"){
		
	localVideo.srcObject = stream;	
	window.streami = stream;


	el.target.setAttribute("data-type", "stop");
	}
	}).catch(function(er){alert(er)})
	
		}})
		}else{
		stopi(el.target);
		/*
		//if(el.target.getAttribute("data-type") == "stop"){
		localVideo.srcObject.getTracks().forEach(function(track){
			track.stop();
		});
		localVideo.srcObject=null;
		window.streami = null;
			localVideoBox.className = "";
			cloader.className = "unspinner";
			//stopi(el);
			if(timerIt){clearInterval(timerIt);}
		
	handleLeave();
		sock.close();
		
		sock = null;
		btnStart.disabled = false;
		btnStart.className = 'btn';
		btnStart.textContent = "start";
		btnStart.setAttribute('data-type',"go" );

		remoteVideoBox.className = "buddy";
		localVideoBox.className = "buddy";
		console.log("stoping");
		*/ 

}
}

function handleLeave(e){
	
	cloader.className = "unspinner";
	
	
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
		CONNECTED = false;
		debug("pc: " + pc.signalingState);
	flag.src="";
	remoteVideo.srcObject = null;
		targetId = null;
	fasa = undefined;
    
    
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

	wsend({ type: "fertig" });
	//btnStart.disabled = true;
	nextBtn.disabled = true;
	remoteVideoBox.className = "connecting";
	cloader.className = "unspinner";
	//channelKrug.classList.toggle("disabled");
	debug("*************************************");
	
}
function donext(ev){
	wsend({ type: "bye", target: targetId });
	handleLeave();
	ev.target.disabled = true;
}




function stopit(el){
		
		localVideo.srcObject.getTracks().forEach(function(track){
			track.stop();
		});
		localVideo.srcObject=null;
		window.streami = null;
	/*
	if(timerIt){clearInterval(timerIt);}
		
		handleLeave();
		sock.close();
		sock = null;
		btnStart.disabled = false;
		btnStart.className = 'btn';
		btnStart.textContent = "start";
		btnStart.setAttribute('data-type',"go" );

		remoteVideoBox.className = "buddy";
		localVideoBox.className = "buddy";
		console.log("stoping");
		*/ 
	}
	
function handleError(err){
	alert(err);
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
			//	currentCamera.setAttribute("data-current" , deviceInfo.deviceId);
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
		/*try{
let vtr=pc.addTransceiver("video");
var pv=vtr.sender.getParameters();
pv.encodings[0].maxBitrate=1000*1000;
vtr.sender.setParameters(pv);

let atr=pc.addTransceiver("audio");
let ap=atr.sender.getParameters();
ap.encodings[0].maxBitrate=128*1000;
atr.sender.setParameters(ap);
}catch(e){
	alert(e);
}*/
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
	}/*
	streams[0].onremovetrack = ({ track }) => {
    debug(track.kind + " track was removed.");
    if (!streams[0].getTracks().length) {
      debug("stream " + streams[0].id + " emptied (effectively removed).");
    }
  };*/
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
	
	if(pc.connectionState=="connected"){
	/*			
 let iceTransport = pc.getSenders[0].transport.iceTransport;
 iceTransport.addEventListener("selectedcandidatepairchange", function(ev){
	 let pair=iceTransport.getSelectedCandidatePair();
	 debug("local protocol " + pair.local.protocol);
	 debug("remote protocol: " + pair.remote.protocol);
 }, false);
 */
 /*
 try{
 setInterval(function(){
	 if(!pc){return;}
	 
	 try{
		const sender=pc.getSenders()[0]; 
		const parameters=sender.getParameters();
		const bandwidth=calculateBandwidth();
		parameters.encodings[0].maxBitrate=bandwidth;
		sender.setParameters(parameters);
	 }catch(e){
		// alert(e);
		console.error(e);
	 }
 },1000);
 
 function calculateBandwidth(){
	 const connection=navigator.connection;
	 const bandwidth=connection.downlink*1000;
	 return bandwidth;
 }
 
}catch(e){
	console.error(e);
}
 */
 
 
 
	}
	if(pc.connectionState == "failed" || pc.connectionState == "closed"){
		//pc.restartIce();
		note({ content: "Failed or disconnected!", type: "warn", time:5 });
		CONNECTED = false;
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
				CONNECTED = true;

 
 
 
			}else if(pc.iceConnectionState == "failed" || pc.iceConnectionState == "disconnected"){
				//pc.restartIce();
				note({ content: "Failed or disconnected!", type: "warn", time:5 });
				handleLeave();
				CONNECTED = false;
			}else{}
		}
	}
	
	function handleAnswer(answer){
		pc.setRemoteDescription(answer).then(function(){
			
		}).catch(handleError);
	}
	/*
	
function handleLeave(e){
	wsend({ type: "bye", target: targetId });
	cloader.className = "unspinner";
	
	
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
		CONNECTED = false;
		debug("pc: " + pc.signalingState);
	flag.src="";
	remoteVideo.srcObject = null;
		targetId = null;
	fasa = undefined;
    
    
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

	wsend({ type: "fertig" });
	//btnStart.disabled = true;
	nextBtn.disabled = true;
	remoteVideoBox.className = "connecting";
	cloader.className = "unspinner";
	//channelKrug.classList.toggle("disabled");
	debug("*************************************");
	
}
function donext(ev){
	handleLeave();
	ev.target.disabled = true;
}


*/ 
function wsend(obj){
	if(!sock) return;
	let d;
	try{
		d = JSON.stringify(obj);
		sock.send(d);
	}catch(e){}
}

localVideo.onloadedmetadata = function () {
	wsend({ type: 'pfertig' });
	debug("Local video enabled.");
	localVideoBox.className = "";

	remoteVideoBox.className = "connecting";
	DATI.type = "fertig";
	wsend(DATI);
	//localVideo.unmuted = true;
	if(timerIt){clearInterval(timerIt);}
	
	timerIt = setInterval(function(){
		if(!targetId){
			DATI.type = "fertig";
			wsend(DATI);
		}
	}, 10000);
	btnStart.disabled = false;
	btnStart.className = "start";
	btnStart.textContent = (nstr=="ru"?"Стоп":"Stop");
	btnStart.setAttribute("data-type", "stop");
	cloader.className = "unspinner";
	}
remoteVideo.onloadedmetadata = function () {
	debug("Remote video enabled.");
	remoteVideoBox.className = "";
	//localVideoBox.className = "";
	wsend({type: "flag", target: targetId });
		nextBtn.disabled = false;	
		/*	
 let iceTransport = pc.getSenders().map(sender=>{
	 console.warn(sender);
	 if(sender.transport){
		 var iceTransport=sender.transport.iceTransport;
 iceTransport.addEventListener("selectedcandidatepairchange", function(ev){
	 let pair=iceTransport.getSelectedCandidatePair();
	 debug("local protocol " + pair.local.protocol);
	 debug("remote protocol: " + pair.remote.protocol);
 }, false);
 let pair=iceTransport.getSelectedCandidatePair();
	 debug("local protocol " + pair.local.candidate);
	 debug("remote protocol: " + pair.remote.candidate);
}
})
*/
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
debug("<b>Your browser, version:</b> " + brows + " " + vers);


function openChat(el){
		
		if(!pc){return;}
	
	if(privatcontainer.className == "show"){
		privatcontainer.classList.add("out");
	}else{
		privatcontainer.className = "show";
	}
	}

function onChannelState(){
	//alert("channel " + dc.readyState);
	if(dc.readyState == "open"){
		privatcontainer.className = "show";
	//	channelKrug.classList.toggle("disabled");
	}else{
	privatcontainer.className = "hidden";
	//	channelKrug.classList.toggle("disabled");
		privatchat.innerHTML = "";
	}
}
var tr = undefined;

function onReceiveMsg(event){
//znakPrint.classList.remove("hidden");
	try{
		let a = JSON.parse(event.data);
		if(a.type == 'message'){
			insertMsg(a);
		}else if(a.type == "write"){
		//	alert(1);
		console.warn("tipe write");
			znakPrint.classList.remove("hidden");
			//znakPrint.className="typing";
		tr=setTimeout(function(){
			znakPrint.classList.add("hidden");
			clearTimeout(tr);
			tr = undefined;
		}, 1000);
		}else if(a.type == "unwrite"){
			console.log("unwrite");
			znakPrint.classList.add("hidden");
		}else{}
	}catch(e){}
}

function txtInput(el){
if(!dc) return;
		dc.send(JSON.stringify({ type:"write"}));
	
	}
	function someChange(){
		if(!dc)return;
		dc.send(JSON.stringify({ type:"unwrite" }));
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
			a = JSON.stringify({type: "message", from: "anonym", msg: privatinput.value});
		}catch(e){return;}
		dc.send(a);
		insertMsg({from: "You", msg: privatinput.value});
		privatinput.value = "";
	}

function getLands(){
vax("get", `/json/${nstr=='ru'?'ru':nstr=='en'?'en':nstr=='de'?'de':nstr=='fr'?'fr':nstr=='es'?'es':nstr=='zh'?'zh':''}/country.json`, {}, ongetLands, onErrLands, null, false);
}
getLands();
function ongetLands(r){
	
	//alert(JSON.stringify(r));
	// https://flagcdn.com/w40/${key}.webp
	//<div class="img-halter"><img onerror="this.style.display='none'" src="https://static.abstractapi.com/country-flags/${key}_flag.svg"></div>
	let s='';
		for(const [key, value] of Object.entries(r)){
s+=`<section class="landsection"><div class="img-halter"><img src="https://flagcdn.com/w40/${key.toLowerCase()}.webp"/></div>
<label class="label-me"><span>${value}</span><input type="checkbox" value="${key}" onchange="onLand(this);" /></label></section><br>`;
	}
	landContainer.innerHTML =  s;
	getSuech(r);
}

function onErrLands(r){
	alert("error " + r );
}
var landis;// = new Set();
function getSuech(r){
	let f = document.forms.suechform;
	if(localStorage.getItem("myage")){
		f.myage.value = localStorage.getItem("myage");
	}else{
		f.myage.value = 18;
	}
	if(localStorage.getItem("ab")){
		f.ab.value = localStorage.getItem("ab");
	}else{
		f.ab.value = 18;
	}
	if(localStorage.getItem("bis")){
		f.bis.value = localStorage.getItem("bis");
	}else{
		f.bis.value = 100;
	}
	if(localStorage.getItem("mygender")){
		let a = localStorage.getItem("mygender");
		if(a == "male"){
			maleInput.checked = true;
		}else{
			femaleInput.checked = true;
		}
	}else{
	maleInput.checked = true;
	}
	if(localStorage.getItem("suechgender")){
		let a = localStorage.getItem("suechgender");
		if(a == "male"){
		suechMaleInput.checked = true;
	}else{
		suechFemaleInput.checked = true;
	}
	}else{
		suechFemaleInput.checked = true;
	}
	
	try{
		if(localStorage.getItem("lands")){
			let a = JSON.parse(localStorage.getItem("lands")).lands;
			//alert(a);
			if(a.length > 0){
				//alert(a);
				landis = new Set(a);
			for(const [key, value] of Object.entries(r)){
				a.forEach(function(el, i){
					
					if( el == key){
						console.log(el, " : ", key);
						let b = document.querySelector("input[value="+el+"]");
						//alert(b);
						b.checked = true;
					}
				});
			}
			}else{
			landis = new Set(["all"]);
			}
		}else{
			landis = new Set();
		}
	}catch(e){
		alert(e);
	}
	closeSave();
}



function saveMyGender(el){
	//alert(el.value);
	if(el.value == "male"){
		localStorage.setItem("mygender", "male");
	}else{
		localStorage.setItem("mygender", "female");
	}
	closeSave();
}

function saveSuechGender(el){
	//alert(el.value);
	if(el.value == "male"){
		localStorage.setItem("suechgender", "male");
	}else{
		localStorage.setItem("suechgender", "female");
	}
	closeSave();
}

function saveMyAge(el){
	localStorage.setItem("myage", el.value);
	closeSave();
}
function saveAb(el){
	if(Number(el.value) >= Number(minBis.value)){
		el.value = el.value;
		minBis.value = Number(minBis.value) + 10;
	}
	localStorage.setItem("ab", el.value);
	closeSave();
}
function saveBis(el){
	if(Number(el.value) <= Number(minAb.value)){
		el.value = el.value;
		minAb.value = Number(minAb.value) - 10;
	}
	localStorage.setItem("bis", el.value);
	closeSave();
}
//var landis = new Set();
function onLand(el){
	if(el.checked){
	landis.add(el.value);
	if(landis.has("all")) landis.delete("all");
}else{
	landis.delete(el.value);
	if(landis.size == 0) landis.add("all");
}
	try{
		if(localStorage.getItem("lands")){
			localStorage.removeItem("lands");
		localStorage.setItem("lands", JSON.stringify({lands: Array.from(landis)}));
	}else{
		localStorage.setItem("lands", JSON.stringify({lands: Array.from(landis)}));
	}
	}catch(e){alert(e);}
	//alert(Array.from(landis));
	closeSave();
}

function closeSave(el){
	
	try{
	let f = document.forms.suechform;
	
	DATI.myage = f.myage.value;
	DATI.ab = f.ab.value;
	DATI.bis = f.bis.value;
	DATI.mygender = f.mygender.value;
	DATI.suechgender = f.suechgender.value;
	DATI.countries = Array.from(landis);
	console.log(DATI);
}catch(e){
	alert(e);
}
if(el){
	suechBox.style.display = "none";
	window.location.href = "#mediaBox";
}
}

function openSuechBox(){
	suechBox.style.display = "block";
	window.location.href = "#suechBox";
}
//bearbeitGift(this);
function bearbeitGift(el){
	//alert(1);
	//wsend({ type: "gift", from:, target:,count: 1 , sub: "heart" });
}


	privatinput.addEventListener('keydown', sendEnter, false);


function sendEnter(ev){
	if(ev.key == "Enter"){
		if(!ev.target.value) return;
		sendPrivat2();
	}
}
function sendPrivat2(el){
		if(!dc) return;
		
		let a;
		try{
			a = JSON.stringify({type: "message", from: "anonym", msg: privatinput.value});
		}catch(e){return;}
		dc.send(a);
		insertMsg({from: "You", msg: privatinput.value});
		privatinput.value = "";
	}










