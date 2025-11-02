#!/bin/bash

mkdir -p ~/mongodb_data

if pgrep -x "mongod" > /dev/null
then
    echo "MongoDB is already running"
else
    echo "Starting MongoDB..."
    mongod --dbpath ~/mongodb_data --port 27017 --bind_ip 127.0.0.1 --fork --logpath ~/mongodb.log
    echo "MongoDB started"
fi
