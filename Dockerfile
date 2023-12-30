FROM node:alpine
LABEL net.sunsreddit.vendor="r/SUNS" \
    net.sunsreddit.image.authors="mods@sunsreddit.net" \
    version="0.1.0-beta" \
    description="An automated cron-job that creates a Phoenix Suns Game Thread at https://reddit.com/r/suns"

WORKDIR /app

COPY ./bin ./bin/
COPY ./config ./config/
COPY ./src ./src/
COPY package.json package-lock.json ./

RUN npm install

CMD ["npm", "run", "start"]