# Use Node.js LTS
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all files
COPY . .

# Build Next.js app
RUN npm run build

# Expose Next.js default port
EXPOSE 3000

# Run app
CMD ["npm", "run", "start"]
