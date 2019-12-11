FROM node:8.12

COPY package.json /app/
WORKDIR /app
RUN npm install
COPY . /app/

EXPOSE 9000

CMD ["npm", "start"]
