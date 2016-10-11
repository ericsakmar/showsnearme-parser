FROM node:6

WORKDIR /opt/parser

ADD package.json ./
RUN npm install

EXPOSE 3000 3000

ADD . ./
