# Step 1: Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy source
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Production stage
FROM node:22-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/package.json ./package.json

# Expose default port
EXPOSE 3000

# Environment variable for API
ENV NEXT_PUBLIC_API_URL=http://localhost:3001

# Start the Next.js app in production
CMD ["npm", "run", "start"]
