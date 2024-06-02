# ---- Build ----
FROM node:18-alpine AS build
ARG DIST=.

# OS deps
RUN apk add --update --no-cache --virtual .gyp \
        dumb-init \
        python3 \
        make \
        g++

# Folder structure
WORKDIR /home/node/app

# App deps
COPY package*.json *yarn* ./
RUN npm install

# App
COPY . $DIST
  
# ---- Release ----
FROM node:18-alpine AS release
ARG DIST=.
ARG PORT=3000
ENV NODE_ENV production

# OS deps
RUN apk add --update --no-cache dumb-init

WORKDIR /home/node/app

# App
COPY --from=build /home/node/app .

CMD ["dumb-init", "node", "./src/server.js"]
