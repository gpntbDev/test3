FROM node:latest

MAINTAINER Nikita DevOsp

RUN echo "Tryin to build my first application"

copy . /var/www

WORKDIR /var/www

RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm","start"]
