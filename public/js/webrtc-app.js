var sock = null;
var pc = null;
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
	  note({content: "Connecting a human.", type: "info", time: 5});
  }else if(data.type == "make_offer"){
	  note({content: "Connecting a human.", type: "info", time: 5});
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
	  note({content: data.info, type: "info", time: 5});
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
  console.log("gathering: ", pc.iceGatheringState);
  //debug("gathering: " + pc.iceGatheringState);
  if(pc.iceGatheringState == "complete"){
	  /*
	  const senders = pc.getSenders();
	  senders.forEach(function(sender){
		  if(sender.track.kind === "video"){
			  codecList = sender.getParameters().codecs;
			  return;
		  }
	  });*/
  }
  //debug("<b>codecList: </b>: "+ JSON.stringify(codecList));
  //codecList = null;
}
function iceCandidateError(e) {
	console.error("ice err: ", e.url, e.errorText );
	debug("<b>ice err:</b> " + e.url + " " + e.errorText );
}
function onNegotiation(e){
	console.log("negotiation needed.");
	debug("negotiation needed.");
	
	/*
	pc.createOffer(offerOpts).then(function(offer){
		return pc.setLocalDescription(offer);
	}).then(function(){
		debug("send type offer");
		wsend({'type': 'offer', offer: pc.localDescription, target: targetId, from: clientId});
	}).catch(handleError);

	*/
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
				
				/*
				pc.getStats().then(function(stats){
					stats.forEach(function(stat){
						if(!(stat.type === 'outbound-rtp' && stat.kind === 'video')){
							return;
						}
						const codec = stats.get(stat);
						debug("<b> HOST: </b>" + codec);
	//actualCodec.innerText = 'Using ' + codec.mimeType + ' ' + (codec.sdpFmtpLine ? codec.sdpFmtpLine + ' ' : "") + ', payloadType=' + codec.payloadType + '. Encoder: ' + stat.encoderImplementation;
					});
				}).catch(function(e){
				debug("Error : " + e);
				});
				
				*/
				
		
  
  /*
  pc.getStats(null).then((stats) => {
    let statsOutput = "";

    stats.forEach((report) => {
		if(report.type !== "local-candidate"){return;}
      statsOutput += '<h2>Report: '+ report.type + '</h2><br>';
      
      // Now the statistics for this report; we intentionally drop the ones we
      // sorted to the top above
console.warn(report.candidateType)
      Object.keys(report).forEach((statName) => {
        if (
          statName !== "id" &&
          statName !== "timestamp" &&
          statName !== "type"
        ) {
          statsOutput += '<strong>'+statName+':</strong>'+report[statName]+'<br>';
        }
      });
    });

    debug(statsOutput);
  });
*/
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
debug("<b>Your browser, version:</b> " + brows + " " + vers);
/*
if(supportsCodecPreferences){
	var { codecs } = RTCRtpSender.getCapabilities('video');
	codecs.forEach(function(codec){
		if(['video/red', 'video/ulpfec', 'video/rtx'].includes(codec.mimeType)){
			return;
		}
		const option = document.createElement('option');
		option.value = (codec.mimeType + ' ' + (codec.sdpFmtpLine || '')).trim();
		option.innerText = option.value;
		codecPreferences.appendChild(option);
	});
	codecPreferences.disabled = false;
}

function someCodec(){
	if(supportsCodecPreferences){
		const preferredCodec = codecPreferences.options[codecPreferences.selectedIndex];
		if(prefferedCodec.value !==''){
			const [mimeType, sdpFmtpLine] = prefferedCodec.value.split('');
			const {codecs} = RTCRtpSender.getCapabilities('video');
			const selectedCodecIndex = codecs.findIndex(c=> c.mimeType === mimeType && c.sdpFmtpLine);
			const selectedCodec = codecs[selectedCodecIndex];
			codecs.splice(selectedCodecIndex, 1);
			codecs.unschift(selectedCodec);
			const transceiver = pc.getTransceivers().find(t=> t.sender && t.sender.track === window.streami.getVideoTracks()[0]);
			transceiver.setCodecPreferences(codecs);
		}
	}
	codecPreferences.disabled = true;
}

function changeVideoCodec(mimeType){
	if(supportsCodecPreferences){
		const transceivers = pc.getTrancievers();
		tranceivers.forEach(function(transceiver){
			const kind = transceiver.sender.track.kind;
			let sendCodecs = RTCRtpSender.getCapabilities(kind).codecs;
			let recvCodecs = RTCRtpReceiver.getCapabilities(kond).codecs;
			if(kind === 'video'){
				sendCodecs = preferCodec(mimeType);
				recvCodecs = preferCodec(mimeType);
				transceiver.setCodecPreferences([...sendCodecs, ...recvCodecs]);
			}
		});
	}
	
}

function preferCodec(codecs, mimeType){
	let otherCodecs = [];
	let sortedCodecs = [];
	codecs.forEach(function(codec){
		if(codec.mimeType === mimeType){
			sortedCodecs.push(codec);
		}else{
			otherCodecs.push(codec);
		}
	});
	return sortedCodecs.concat(otherCodecs);
}
*/ 

/*
 * [{"clockRate":90000,"mimeType":"video/VP8","payloadType":96},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":97,"sdpFmtpLine":"apt=96"},
 * {"clockRate":90000,"mimeType":"video/H264","payloadType":102,"sdpFmtpLine":"level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f"},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":103,"sdpFmtpLine":"apt=102"},
 * {"clockRate":90000,"mimeType":"video/H264","payloadType":104,"sdpFmtpLine":"level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f"},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":105,"sdpFmtpLine":"apt=104"},
 * {"clockRate":90000,"mimeType":"video/H264","payloadType":106,"sdpFmtpLine":"level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f"},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":107,"sdpFmtpLine":"apt=106"},
 * {"clockRate":90000,"mimeType":"video/H264","payloadType":108,"sdpFmtpLine":"level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f"},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":109,"sdpFmtpLine":"apt=108"},
 * {"clockRate":90000,"mimeType":"video/H264","payloadType":127,"sdpFmtpLine":"level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d001f"},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":125,"sdpFmtpLine":"apt=127"},
 * {"clockRate":90000,"mimeType":"video/H264","payloadType":39,"sdpFmtpLine":"level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=4d001f"},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":40,"sdpFmtpLine":"apt=39"},
 * {"clockRate":90000,"mimeType":"video/AV1","payloadType":45},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":46,"sdpFmtpLine":"apt=45"},
 * {"clockRate":90000,"mimeType":"video/VP9","payloadType":98,"sdpFmtpLine":"profile-id=0"},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":99,"sdpFmtpLine":"apt=98"},
 * {"clockRate":90000,"mimeType":"video/VP9","payloadType":100,"sdpFmtpLine":"profile-id=2"},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":101,"sdpFmtpLine":"apt=100"},
 * {"clockRate":90000,"mimeType":"video/red","payloadType":112},
 * {"clockRate":90000,"mimeType":"video/rtx","payloadType":113,"sdpFmtpLine":"apt=112"},
 * {"clockRate":90000,"mimeType":"video/ulpfec","payloadType":114}] 
 * 
 * 
 * 
 * */









