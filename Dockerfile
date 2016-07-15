FROM node:4-onbuild

ENV NODE_ENV 'production'
ENV ELASTICSEARCH_URL ''
ENV ELASTICSEARCH_INDEX ''
ENV ARGU_API_URL 'http://localhost:3030/'

RUN npm run build
EXPOSE 8080
CMD npm run start:prod
