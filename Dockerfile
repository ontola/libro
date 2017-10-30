FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm i -q --production
COPY dist /usr/src/app/dist
COPY static /usr/src/app/static

ENV NODE_ENV 'production'
ENV ELASTICSEARCH_URL ''
ENV ELASTICSEARCH_INDEX ''
ENV ARGU_API_URL 'http://localhost:3030/'

EXPOSE 8080
CMD ["node", "./dist/private/server.js"]
