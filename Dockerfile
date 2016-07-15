FROM node:6-onbuild

ENV ELASTICSEARCH_URL ''
ENV ELASTICSEARCH_INDEX ''
ENV ARGU_API_URL 'http://localhost:3030/'

RUN npm run build
EXPOSE 8080
CMD npm run start:prod
