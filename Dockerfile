FROM node:6-onbuild

ENV ELASTICSEARCH_URL ''
ENV ELASTICSEARCH_INDEX ''

RUN npm run build
EXPOSE 3000
CMD npm run start:prod
