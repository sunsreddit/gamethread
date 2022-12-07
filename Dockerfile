# Dockerfile to create image with cron services
FROM node:latest
LABEL net.sunsreddit.vendor="r/SUNS" \
    net.sunsreddit.image.authors="mods@sunsreddit.net" \
    version="0.1.0-beta" \
    description="An automated cron-job that creates a Phoenix Suns Game Thread at https://reddit.com/r/suns"

WORKDIR /app

COPY . .

RUN npm ci

CMD ["node", "bin/index.js"]