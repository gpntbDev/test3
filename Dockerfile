FROM node:latest

MAINTAINER Nikita DevOsp

ARG PORT=3000
ENV PORT=$PORT


ARG NODE_ENV=production
ENV NODE_ENV=$production


ARG MONGO_URI=mongodb://sergeev:zSLW8VDsyj@mongodb.gpntbsib.ru:27017

ARG JWT_SECRET=1f8cad8320c20dcaf714b64a391fc41c3cd9757c536f68e0e7940e39aaf53d80

ARG EMAIL_HOST=webproxy.gpntbsib.ru

ARG EMAIL_PORT=25

ARG LDAP_URL=ldap://10.3.11.22:389

ARG LDAP_CLIENT_DN=cn=admin,dc=gpntbsib,dc=ru

ARG LDAP_CLIENT_PASSWORD=123qwe123

ARG GOOGLE_RECAPTCHA_SITE_KEY=6LeChqoaAAAAABXyFY8k_cGdj54y2dNEoXnI7KRm

copy . /var/www

WORKDIR /var/www

RUN npm install

RUN npm run build

RUN npm run dev

EXPOSE 3000

ENTRYPOINT ["npm","start"]
