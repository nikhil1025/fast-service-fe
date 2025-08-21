# Dockerfile

# Step 1: Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy source and build
COPY . .
RUN npm run build

# Step 2: Production stage
FROM node:22-alpine
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Expose Next.js default port
EXPOSE 3000

# Set environment variable (can be overridden at runtime)
ENV NEXT_PUBLIC_API_URL=http://localhost:3001

# Start Next.js app
CMD ["npm", "run", "start"]
