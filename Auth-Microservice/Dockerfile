FROM node:18.16-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3000

CMD [ "npm", "start" ]
