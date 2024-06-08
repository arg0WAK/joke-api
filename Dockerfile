# syntax=docker/dockerfile:1

# Use the official image as a parent image
FROM node:20
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN yarn install --production
COPY . .

# Base Port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]