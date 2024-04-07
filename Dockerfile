FROM node:18.19.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .env ./build

EXPOSE 3000

CMD ["npm", "run", "start"]