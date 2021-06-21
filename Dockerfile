FROM node:latest

MAINTAINER Nikita DevOsp

ENV PORT=3000

ENV NODE_ENV=production

ENV MONGO_URI=mongodb://sergeev:zSLW8VDsyj@mongodb.gpntbsib.ru:27017

ENV JWT_SECRET=1f8cad8320c20dcaf714b64a391fc41c3cd9757c536f68e0e7940e39aaf53d80

ENV EMAIL_HOST=webproxy.gpntbsib.ru

ENV EMAIL_PORT=25

ENV LDAP_URL=ldap://10.3.11.22:389

ENV LDAP_CLIENT_DN=cn=admin,dc=gpntbsib,dc=ru

ENV LDAP_CLIENT_PASSWORD=123qwe123

ENV GOOGLE_RECAPTCHA_SITE_KEY=6LeChqoaAAAAABXyFY8k_cGdj54y2dNEoXnI7KRm

copy . /var/www

WORKDIR /var/www

RUN npm install

RUN npm run build

RUN npm run dev

EXPOSE 3000

ENTRYPOINT ["npm","start"]
