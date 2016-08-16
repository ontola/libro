FROM node:4.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm i -q
COPY . /usr/src/app

ENV NODE_ENV 'production'
ENV ELASTICSEARCH_URL ''
ENV ELASTICSEARCH_INDEX ''
ENV ARGU_API_URL 'http://localhost:3030/'

RUN npm run build
RUN npm prune -q --prod

EXPOSE 8080
CMD npm run start:prod
