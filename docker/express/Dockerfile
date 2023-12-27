FROM node:16.13.2

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install --verbose
#RUN npm ci
# run this for production
# npm ci --only=production

COPY . .
