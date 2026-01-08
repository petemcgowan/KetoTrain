FROM node:20-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4001

CMD ["npm", "run", "server"]
