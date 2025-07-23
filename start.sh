#!/bin/sh

# Start nginx in the background
echo "Starting nginx..."
nginx -g "daemon off;" &

# Wait a moment for nginx to start
sleep 2

# Start the MCP server
echo "Starting Apollo MCP Server..."
exec apollo-mcp-server /data/config/config.yaml 