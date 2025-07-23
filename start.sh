#!/bin/sh

# Start nginx in the background
echo "Starting nginx..."
nginx -g "daemon off;" &

# Wait a moment for nginx to start
sleep 2

# Start the MCP server
echo "Starting Apollo MCP Server..."
exec apollo-mcp-server \
  --directory /app \
  --schema /app/schema.graphql \
  --operations /app/operations \
  --endpoint http://mock-graphql-api:4000 \
  --http-address 0.0.0.0 \
  --http-port 5000 