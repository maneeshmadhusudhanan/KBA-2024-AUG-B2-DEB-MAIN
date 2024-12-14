FROM node:20.13.1
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
CMD ["npm","run","dev","--host"]
