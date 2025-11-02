#!/bin/bash

echo "Starting MongoDB..."
bash start-mongodb.sh

sleep 2

echo "Starting Node.js application..."
npm start
