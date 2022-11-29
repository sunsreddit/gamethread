# Dockerfile to create image with cron services
FROM node:latest
LABEL net.sunsreddit.vendor="r/SUNS" \
    org.opencontainers.image.authors="mods@sunsreddit.net" \
    version="0.1.0-beta" \
    description="An automated cron-job that creates a Phoenix Suns Game Thread at https://reddit.com/r/suns"

WORKDIR /tmp

COPY init.js .

CMD ["node", "init.js"]