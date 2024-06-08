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

# Health Check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/health || exit 1

# Start the app
CMD ["node", "index.js"]