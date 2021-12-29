FROM node:10.15

ENV HOST localhost
ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install GYP dependencies globally, will be used to code build other dependencies
RUN yarn global add redis@0.10.0 talib@1.0.2 tulind@0.8.7 pg

EXPOSE 3000
