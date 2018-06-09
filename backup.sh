mongodump -h 127.0.0.1 --port 3001 -d meteor
mongorestore -h ds247270.mlab.com:47270 -d mcg -u mcg dump/meteor