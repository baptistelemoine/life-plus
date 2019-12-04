FROM node:8.12.0

COPY package.json package-lock.json /app/
WORKDIR /app
RUN yarn install
COPY . /app/

EXPOSE 8083

CMD ["node", "index.js"]
