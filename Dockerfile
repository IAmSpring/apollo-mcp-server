# Multi-stage build for Apollo MCP Server with React frontend
FROM node:18-alpine AS frontend-builder

# Set working directory
WORKDIR /app/frontend

# Copy package files
COPY frontend/package*.json ./

# Install dependencies (using npm install instead of npm ci for better compatibility)
RUN npm install --production=false

# Copy frontend source
COPY frontend/ .

# Build React app
RUN npm run build

# Final stage
FROM nginx:alpine

# Install Node.js and curl for downloading
RUN apk add --no-cache nodejs npm curl

# Download and install Apollo MCP Server binary
RUN curl -L -o /usr/local/bin/apollo-mcp-server \
    https://github.com/apollographql/apollo-mcp-server/releases/latest/download/apollo-mcp-server-x86_64-unknown-linux-musl \
    && chmod +x /usr/local/bin/apollo-mcp-server

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built React app
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Create necessary directories
RUN mkdir -p /data/operations /data/config

# Copy default configuration
COPY config.yaml /data/config/config.yaml

# Copy example operations
COPY operations/ /data/operations/

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Expose ports
EXPOSE 80 5000

# Set working directory
WORKDIR /data

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/health || exit 1

# Start both nginx and MCP server
CMD ["/start.sh"] 