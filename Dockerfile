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
RUN apk add --no-cache nodejs npm curl tar

# Download and install Apollo MCP Server binary
RUN curl -L -o /tmp/apollo-mcp-server.tar.gz \
    https://github.com/apollographql/apollo-mcp-server/releases/download/v0.5.2/apollo-mcp-server-v0.5.2-x86_64-unknown-linux-musl.tar.gz \
    && tar -xzf /tmp/apollo-mcp-server.tar.gz -C /tmp \
    && mv /tmp/dist/apollo-mcp-server /usr/local/bin/apollo-mcp-server \
    && chmod +x /usr/local/bin/apollo-mcp-server \
    && rm -rf /tmp/apollo-mcp-server*

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built React app
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Copy start script and other files
COPY start.sh /usr/local/bin/start.sh
COPY config.yaml /app/config.yaml
COPY operations/ /app/operations/
COPY schema.graphql /app/schema.graphql

# Make start script executable
RUN chmod +x /usr/local/bin/start.sh

# Expose ports
EXPOSE 80 5000

# Start both nginx and the MCP server
CMD ["/usr/local/bin/start.sh"] 