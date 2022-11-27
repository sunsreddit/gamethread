# Dockerfile to create image with cron services
FROM ubuntu:latest
LABEL net.sunsreddit.vendor="r/SUNS" \
    org.opencontainers.image.authors="mods@sunsreddit.net" \
    version="0.1.0-beta" \
    description="An automated cron-job that creates a Phoenix Suns Game Thread at https://reddit.com/r/suns"

WORKDIR /cron
# Add the script to the Docker Image
ADD . /crontab

#Install Cron
RUN apt-get update && apt-get -y install cron

# Add the cron job
RUN crontab -l | { cat; echo "0 * * * * npm start"; } | crontab -

# Run the command on container startup
CMD cron