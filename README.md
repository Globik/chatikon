# chat
### Install coturn

```
sudo apt install coturn
sudo vi /etc/default/coturn
uncomment
TURNSERVER_ENABLED=1
systemctl start coturn
or
sudo service coturn restart 
sudo systemctl restart coturn
check if coturn running
sudo ss -lnpt | grep turnserver

in vi press i, then do change and press doubdle ctrl+C  and write and quite :wq

sudo vi /etc/turnserver.conf

user=alik:1234
realm=example.com
listnening-ip=YOUR_IP
relay-ip=YOUR_IP
fingerprint
It-cred-mech  
cli-password=qwerty

```

