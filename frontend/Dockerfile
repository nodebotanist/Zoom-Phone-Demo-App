FROM node:current-alpine3.10

WORKDIR /app
COPY . .
ENV PORT=3030
RUN npm i
EXPOSE 3030
CMD ["npm", "run", "start"]