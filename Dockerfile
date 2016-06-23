FROM node:4-onbuild

ENV NODE_ENV 'production'
ENV ELASTICSEARCH_URL ''
ENV ELASTICSEARCH_INDEX ''
ENV ARGU_API_URL ''

RUN npm run build
EXPOSE 3000
CMD npm run start:prod
