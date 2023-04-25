FROM node:16-alpine 

RUN npm install -g ts-node

WORKDIR /usrc/src/app

COPY package*.json ./

COPY . .

RUN npm install

ENV NODE_ENV=production

RUN npm run m:gen --src/migrations/initDB

RUN npm run m:run

EXPOSE 6000

CMD ["npm","start"]