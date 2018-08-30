FROM node:10 as builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn
COPY . ./
ARG FRONTEND_HOSTNAME
ENV FRONTEND_HOSTNAME $FRONTEND_HOSTNAME
RUN yarn run build:server
RUN yarn run build:bundle

FROM node:10-alpine
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm i -q --production
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/static /usr/src/app/static

ENV NODE_ENV 'production'
ARG ARGU_API_URL
ENV ARGU_API_URL $ARGU_API_URL

EXPOSE 8080
CMD ["node", "./dist/private/server.js"]
