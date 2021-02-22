FROM node:current-alpine3.10

WORKDIR /app
COPY . .
RUN npm i
EXPOSE 8000
CMD ["npm", "run", "start"]