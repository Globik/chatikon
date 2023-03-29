// Node Get ICE STUN and TURN list

curl -s -H "Content-type: application/json" -XPUT "https://Globi:867f06f6-1065-11ea-a46b-0242ac110003@global.xirsys.net/_turn/alikon" -d '{"format": "urls"}'

{"iceServers":
	{"username":"sfVB_G0h9XCsRMrcjH4KQVa6s3XVC7w38SDpPHO46ZQrtKeMSPMXWM3FnO2MNRNzAAAAAGQjIYhHbG9iaQ==",
		"urls":["stun:fr-turn1.xirsys.com","turn:fr-turn1.xirsys.com:80?transport=udp",
		"turn:fr-turn1.xirsys.com:3478?transport=udp","turn:fr-turn1.xirsys.com:80?transport=tcp",
		"turn:fr-turn1.xirsys.com:3478?transport=tcp","turns:fr-turn1.xirsys.com:443?transport=tcp",
		"turns:fr-turn1.xirsys.com:5349?transport=tcp"],"credential":"a38223c2-cd8c-11ed-8ef1-0242ac120004"
		}
		}
