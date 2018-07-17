FROM node:9-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm i -q --production
COPY dist /usr/src/app/dist
COPY static /usr/src/app/static

ENV NODE_ENV 'production'
ARG ARGU_API_URL
ENV ARGU_API_URL $ARGU_API_URL

EXPOSE 8080
CMD ["node", "./dist/private/server.js"]
