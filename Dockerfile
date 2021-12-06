FROM registry.gitlab.com/ontola/cache/master:latest
WORKDIR /app

COPY ./dist/f_assets /app/assets
COPY ./dist/manifest.legacy.json /app/assets/manifest.legacy.json
COPY ./dist/manifest.module.json /app/assets/manifest.module.json
COPY ./dist/metaData.js /app/build/client/metaData.js
