FROM node:10.15.3

ADD . /app
WORKDIR /app

EXPOSE 80 8888

ENTRYPOINT ["npm", "start"]