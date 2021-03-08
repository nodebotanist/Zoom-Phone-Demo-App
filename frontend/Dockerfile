FROM node:current-alpine3.10

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install --also=dev
# If you are building your code for production
# RUN npm ci --only=production

COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]