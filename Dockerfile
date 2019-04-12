FROM node:10.15.3

COPY . /app
WORKDIR /app

EXPOSE 80 8888

ENTRYPOINT ["npm", "start"]