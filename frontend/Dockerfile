FROM node:current-alpine3.10

WORKDIR /app
COPY . .
ENV PORT=3000
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "start"]