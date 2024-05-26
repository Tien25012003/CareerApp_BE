FROM node:v18.20.2
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
