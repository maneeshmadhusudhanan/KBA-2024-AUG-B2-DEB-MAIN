FROM node:20.13.1
WORKDIR /user/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node","app.js"]