FROM node:6-onbuild
# replace this with your application's default port
ENV ELASTICSEARCH_URL ''
ENV ELASTICSEARCH_INDEX ''
EXPOSE 3000
