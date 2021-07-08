FROM node:14 as builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY . ./
RUN yarn --immutable
ARG BUGSNAG_KEY
ENV BUGSNAG_KEY $BUGSNAG_KEY
ARG CI_COMMIT_BRANCH
ENV CI_COMMIT_BRANCH $CI_COMMIT_BRANCH
ARG TEST_BUILD
ENV TEST_BUILD $TEST_BUILD
RUN yarn run t10s:compile
RUN yarn run build:server
RUN yarn run build:bundle

FROM node:14-alpine
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn install --production --immutable
COPY --from=builder /usr/src/app/dist /usr/src/app/dist
COPY --from=builder /usr/src/app/static /usr/src/app/static

ENV NODE_ENV 'production'

EXPOSE 8080
CMD ["node", "./dist/private/server.js"]
