FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

COPY utils/ ./utils

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["node", "server.js"]
