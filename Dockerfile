FROM node:carbon-alpine

COPY package*.json ./

RUN apk add --update python make alpine-sdk && \
    apk add curl && \
    npm install && \
    apk del python make alpine-sdk && \
    rm /var/cache/apk/* && \
    rm -rf /root/.npm /root/.node-gyp && \
    rm -rf /usr/lib/node_modules && \
    rm -rf /tmp/*

COPY . .

ENV NODE_ENV production
ENV ADMIN_PORT 4100
ENV API_PORT 4200

LABEL serverless_function=true

EXPOSE 4100
EXPOSE 4200

CMD [ "npm", "start" ]

