FROM node:12 as builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --non-interactive --frozen-lockfile
COPY . ./
ARG FRONTEND_HOSTNAME
ENV FRONTEND_HOSTNAME $FRONTEND_HOSTNAME
ARG TEST_BUILD
ENV TEST_BUILD $TEST_BUILD
RUN yarn run build:server
RUN yarn run build:bundle

FROM node:12-alpine
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
# The packages are needed to build shrink-ray-current's native extensions
RUN apk add python alpine-sdk && yarn install --production --frozen-lockfile --non-interactive && apk del python alpine-sdk
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/static /usr/src/app/static

ENV NODE_ENV 'production'
ARG ARGU_API_URL
ENV ARGU_API_URL $ARGU_API_URL

EXPOSE 8080
CMD ["node", "./dist/private/server.js"]
