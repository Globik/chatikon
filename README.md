# chat
### Install coturn

```
sudo apt install coturn
sudo vi /etc/default/coturn
uncomment
TURNSERVER_ENABLED=1
sudo mv /etc/turnserver.conf /etc/turnserver.old
sudo touch /etc/turnserver.conf

systemctl start coturn
or
sudo service coturn restart 
sudo systemctl restart coturn
check if coturn running
sudo ss -lnpt | grep turnserver

in vi press i, then do change and press doubdle ctrl+C  and write and quite :wq
const dkey = "/etc/letsencrypt/live/chatslider.online/privkey.pem";
const dcert = "/etc/letsencrypt/live/chatslider.online/fullchain.pem";
sudo vi /etc/turnserver.conf

user=alik:1234
realm=example.com
listening-ip=141.8.195.180 
listening-ip=2a0a:2b41:b:d50c::64

relay-ip=141.8.195.180
listening-port=80
tls-listening-port=443
fingerprint
lt-cred-mech  
cli-password=qwerty

cert=/root/fullchain.pem

# Private key file.
# Use an absolute path or path relative to the 
# configuration file.
# Use PEM file format.
#
pkey=/root/privkey.pem



Ctrl+C CTRL+c
shift :wq enter

```
```

	curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
	echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
	sudo apt update
	sudo apt install mongodb-org
	sudo systemctl enable --now mongod
	sudo systemctl start mongod.service
	sudo systemctl status mongod
	sudo systemctl enable mongod
	mongo --eval 'db.runCommand({ connectionStatus: 1 })'
	
```
```
sudo service redis-server status

```
