FROM node:10.15.3-alpine

ADD . /app
WORKDIR /app

RUN npm install
RUN npm run production

EXPOSE 80 8888

CMD ["npm", "start"]