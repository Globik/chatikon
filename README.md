# chat
### Install coturn on Ubuntu 20

 Обновляем систему
sudo apt update
 Устанавливаем  coturn
sudo apt install coturn
В редакторе открываем этот файл
sudo vi /etc/default/coturn
 И раскомментируем это:
# TURNSERVER_ENABLED=1
 Затем переименовываем конфигурационный файл
sudo mv /etc/turnserver.conf /etc/turnserver.old
Затем создаем наш конфигурационный файл
sudo touch /etc/turnserver.conf
 Открываем файл и вносим необходимое
 sudo vi /etc/turnserver.conf
 имя - пароль
user=alik:1234
тут бы доменное имя указать
realm=example.com
айпи адрес для принятия запросов
listening-ip=141.8.195.180 
listening-ip=45.12.18.172
 айпи адрес для ретрансляции
relay-ip=141.8.195.180
relay-ip=45.12.18.172
 порт 80 принимает несекьюрные соединения
listening-port=80
Обозначаем секьюрный порт 443 для turn
tls-listening-port=8443
fingerprint
lt-cred-mech  
cli-password=qwerty
  Берем откуда либо сертификаты
cert=/root/fullchain.pem
pkey=/root/privkey.pem

sudo ufw allow 5349/tcp
sudo ufw allow 5349/udp

sudo ufw allow 3478/udp
sudo ufw allow 3478/tcp

Выходим из редактора и сохраняем файл
Ctrl+C CTRL+c
shift :wq enter
screen
Стартуем сервер
turnserver
 В другом терминале роверяем работает ли сервер
sudo ss -lnpt | grep turnserver
 Должен быть выхлоп о том какие порты сервер слушает
 
 sudo systemctl start cotourn
 sudo systemctl enable cotourn
 systemctl status cotourn
 
 listening-port=3478
 tls-listening-port=5349
 listening-ip=45.89.66.167
 relay-ip=45.89.66.167
 fingerprint
 lt-cred-mech
 user=alik:1234
 realm=chatslider.online
 cert=/etc/letsencrypt/live/chatslider.online/fullchain.pem
 pkey=/etc/letsencrypt/live/chatslider.online/privkey.pem
 no-stdout-log
 cli-password=qwerty
 
 

```

stun:stun.l.google.com:19202
prflx 


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
