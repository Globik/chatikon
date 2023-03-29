var sock = null;
var pc = null;

var timer;
var clientId;
var targetId;

var spanWhosOn = gid("spanWhosOn");
var loc1 = location.hostname + ":" + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;
var new_uri;

		var con = {
			"iceServers":{
			"username":"sfVB_G0h9XCsRMrcjH4KQVa6s3XVC7w38SDpPHO46ZQrtKeMSPMXWM3FnO2MNRNzAAAAAGQjIYhHbG9iaQ==",
		"urls":[
		"stun:fr-turn1.xirsys.com",
		"turn:fr-turn1.xirsys.com:80?transport=udp",
		"turn:fr-turn1.xirsys.com:3478?transport=udp","turn:fr-turn1.xirsys.com:80?transport=tcp",
		"turn:fr-turn1.xirsys.com:3478?transport=tcp","turns:fr-turn1.xirsys.com:443?transport=tcp",
		"turns:fr-turn1.xirsys.com:5349?transport=tcp"
		],
		"credential":"a38223c2-cd8c-11ed-8ef1-0242ac120004"
		}
		};
var config = con.iceServers;

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
    note({ content: "Websocket closed!", type: "error", time: 5 });
  };
}

get_socket();

function on_msg(data) {
	//console.log("data type: ", data.type);
  if (data.type == "welcome") {
	  clientId = data.clientId;
  } else if (data.type == "howmuch") {
    if (spanWhosOn) spanWhosOn.textContent = data.value;
  }else if(data.type == "make_offer"){
	  targetId = data.target;
	  makeOffer(data.target);
  }else if(data.type == "offer"){
	  targetId = data.from;
 handleOffer(data.offer, data.from);	  
  }else if(data.type == "answer"){
  handleAnswer(data.answer);	  
  }else if(data.type == "candidate"){
	  handleCandidate(data.candidate);
  }else if(data.type == "bye"){
	  console.log("*** BYE ***");
	  handleLeave();
  } else {
    note({ content: "No type " + data.type, type: "error", time: 5 });
  }
}

localVideo.srcObject = null;

function letStart(el){
	navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(function(stream){
	if(!localVideo.srcObject) {
		if(el.getAttribute("data-type") == "go"){
			//console.log("adding stream");
		localVideo.srcObject = stream;	
	window.stream = stream;
	el.setAttribute("data-type", "weiter");
	el.disabled = true;
	remoteVideoBox.className = "connecting";
	el.textContent = "further";
		wsend({type: "fertig"});
	}
	}else{
		if(el.getAttribute("data-type") == "weiter"){
			handleLeave();
		}
	}
	}).catch(function(err){
		note({"content": err, type: "error", time: 5});
	});
}

function makeOffer(target){
	try{
	pc = new RTCPeerConnection(config);
}catch(e){
	note({content: e, type: "error", time: 5});
}
	pc.addStream(window.stream);
	pc.onaddstream = addStream;
	pc.onremovestream = removeStream;
	pc.onicecandidate = iceCandidate;
	pc.oniceconnectionstatechange = iceConnectionStateChange;
	pc.createOffer().then(function(offer){
		return pc.setLocalDescription(offer);
	}).then(function(){
		wsend({'type': 'offer', offer: pc.localDescription, target: target, from: clientId});
		timer = setTimeout(function(){
			wsend({type: "fertig"});
		}, 2000);
	}).catch(function(err){
		note({"content": err, type: "error", time: 5});
	});
}

function handleOffer(offer, from){
	try{
	pc = new RTCPeerConnection(config);
}catch(e){
	note({content: e, type: "error", time: 5});
}
	pc.addStream(window.stream);
	pc.onaddstream = addStream;
	pc.onremovestream = removeStream;
	pc.onicecandidate = iceCandidate;
	pc.oniceconnectionstatechange = iceConnectionStateChange;
	pc.setRemoteDescription(offer).then(function(){
		return pc.createAnswer().then(function(answer){
			return pc.setLocalDescription(answer).then(function(){
				wsend({type: 'answer', answer: pc.localDescription, target: from, from: clientId});
			});
		});
	}).catch(function(err){
		note({content: err, type: "error", time: 5});
	});
}

function handleCandidate(candidate){
	if(pc){
		pc.addIceCandidate(candidate).then(function(){
			console.log("success candidate");
		}).catch(function(err){
			note({content: err, type: "error", time: 5});
		});
	}
}

function addStream(e){
		remoteVideo.srcObject = e.stream;
	}
	
function removeStream(e){
		handleLeave(e);
	}
	
	function iceCandidate(e){
		if(e.candidate) wsend({type: 'candidate', candidate: e.candidate, target: targetId});
	}
	
	function iceConnectionStateChange(e){
		if(pc) {
			console.log('ice connection state: ', pc.iceConnectionState);
			if(pc.iceConnectionState == "connected"){
				wsend({type: "unfertig"});
				remoteVideoBox.className = "";
				btnStart.disabled = false;
				if(timer) clearTimeout(timer);
			}else if(pc.iceConnectionState == "disconnected"){
				handleLeave();
			}else if(pc.iceConnectionState == "failed"){
				targetId = null;
				wsend({type: "fertig"});
				if(timer) clearTimeout(timer);
			}else{}
		}
	}
	
	function handleAnswer(answer){
		pc.setRemoteDescription(answer).then(function(){
			
		}).catch(function(err){
			console.log(err);
		});
	}
	
function handleLeave(e){
	//wsend({type: "bye", target: targetId});
	//targetId = null;
	
	
		if(!pc) return;
		pc.close();
		wsend({type: "bye", target: targetId});
	//targetId = null;
		if(timer) clearTimeout(timer);
		//console.log("pc: ", pc.signalingState, targetId, clientId);
		if(remoteVideo.srcObject){
		remoteVideo.srcObject.getTracks().forEach(function(track){
			track.stop();
		});
		}
		targetId = null;
	pc.onaddstream = null;
	pc.onremovestream = null;
	pc.onicecandidate = null;
	pc.oniceconnectionstatechange = null;
	pc = null;
	//console.log("wsend type fertig in handleLeave()");
	wsend({type: "fertig"});
	btnStart.disabled = true;
	remoteVideoBox.className = "connecting";
}
function wsend(obj){
	if(!sock) return;
	let d;
	try{
		d = JSON.stringify(obj);
		sock.send(d);
	}catch(e){}
}





























