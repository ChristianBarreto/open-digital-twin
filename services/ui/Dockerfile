FROM node:alpine

WORKDIR /user/app

COPY package*json ./
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]