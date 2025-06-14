FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install --production
RUN apk add --no-cache curl
COPY . .

RUN npm run build
CMD ["npm", "start"]
