#!/bin/bash
cd /home/ubuntu/
yes | cp -rf start-pm2.sh nekoverse-server-express/
cd /home/ubuntu/nekoverse-server-express
./start-pm2.sh
