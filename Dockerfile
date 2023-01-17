FROM node:14-alpine3.16

COPY . .

RUN npm install --production

CMD ["npm", "start"]