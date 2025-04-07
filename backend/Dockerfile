# Dockerfile
FROM node:23

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Expose app port
EXPOSE 4000

# Start app
CMD ["node", "index.js"]