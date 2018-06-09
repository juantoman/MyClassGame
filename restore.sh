mongodump -h ds247270.mlab.com:47270 -d mcg -u mcg -o dump
mongorestore -h 127.0.0.1 --port 3001 -d meteor --drop dump/mcg