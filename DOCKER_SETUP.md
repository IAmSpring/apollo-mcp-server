# 🐳 Docker Setup Guide - Marriott MCP Server

This guide will help you set up and run the Marriott MCP Server with a React frontend for local testing and development.

## 📋 Prerequisites

- Docker Desktop installed and running
- Docker Compose (usually included with Docker Desktop)
- At least 4GB of available RAM
- Ports 3000, 4000, and 5000 available

## 🚀 Quick Start

### 1. Build and Start the Services

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 2. Access the Applications

Once the services are running, you can access:

- **React Frontend Dashboard**: http://localhost:3000
- **Mock GraphQL API**: http://localhost:4000/graphql
- **MCP Server**: http://localhost:5000/mcp
- **GraphiQL Interface**: http://localhost:4000/graphql (for testing GraphQL queries)

### 3. Verify Everything is Working

1. **Frontend Dashboard**: Visit http://localhost:3000 to see the 5-component dashboard
2. **Server Status**: Check that the "Server Status" component shows "Online"
3. **GraphQL API**: Test queries in the GraphiQL interface at http://localhost:4000/graphql

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │   Nginx Proxy   │    │  Apollo MCP     │
│   (Port 3000)   │◄──►│   (Port 80)     │◄──►│   Server        │
│                 │    │                 │    │  (Port 5000)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  Mock GraphQL   │
                       │   API Server    │
                       │  (Port 4000)    │
                       └─────────────────┘
```

## 📊 Dashboard Components

The React frontend includes 5 testing components:

1. **Server Status** - Real-time health monitoring
2. **MCP Tools Overview** - Available GraphQL operations
3. **GraphQL Schema Info** - Schema statistics
4. **Performance Metrics** - System performance data
5. **Configuration Status** - Current server configuration

## 🔧 Configuration

### Environment Variables

The MCP server can be configured via environment variables in `docker-compose.yml`:

```yaml
environment:
  - APOLLO_MCP_ENDPOINT=http://localhost:4000/graphql
  - APOLLO_MCP_TRANSPORT__TYPE=streamable_http
  - APOLLO_MCP_TRANSPORT__PORT=5000
  - APOLLO_MCP_TRANSPORT__ADDRESS=0.0.0.0
  - APOLLO_MCP_LOGGING__LEVEL=info
```

### Configuration File

The main configuration is in `config.yaml`:

```yaml
endpoint: http://localhost:4000/graphql
transport:
  type: streamable_http
  port: 5000
  address: 0.0.0.0

operations:
  source: local
  paths:
    - /data/operations

schema:
  source: local
  path: /data/schema.graphql
```

## 🧪 Testing the MCP Server

### 1. Test with MCP Inspector

```bash
# Install MCP Inspector
npm install -g @modelcontextprotocol/inspector

# Test the MCP server
npx @modelcontextprotocol/inspector http://localhost:5000/mcp
```

### 2. Test GraphQL Operations

Visit http://localhost:4000/graphql and try these sample queries:

**Get Reservation:**
```graphql
query {
  reservation(confirmationNumber: "MR123456789") {
    guestName
    checkIn
    checkOut
    hotel {
      name
      city
    }
  }
}
```

**Search Hotels:**
```graphql
query {
  searchHotels(location: "New York", checkIn: "2024-02-15", checkOut: "2024-02-18") {
    name
    address
    rating
    priceRange {
      min
      max
    }
  }
}
```

### 3. Test MCP Tools

The MCP server exposes these GraphQL operations as tools:

- `getReservation` - Retrieve hotel reservation details
- `searchHotels` - Search for available hotels
- `createBooking` - Create a new hotel booking

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the ports
   lsof -i :3000
   lsof -i :4000
   lsof -i :5000
   
   # Kill processes if needed
   kill -9 <PID>
   ```

2. **Docker Build Fails**
   ```bash
   # Clean up Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

3. **MCP Server Not Responding**
   ```bash
   # Check logs
   docker-compose logs marriott-mcp-server
   
   # Restart the service
   docker-compose restart marriott-mcp-server
   ```

4. **Frontend Not Loading**
   ```bash
   # Check nginx logs
   docker-compose exec marriott-mcp-server tail -f /var/log/nginx/error.log
   
   # Verify nginx is running
   docker-compose exec marriott-mcp-server ps aux | grep nginx
   ```

### Health Checks

- **Frontend**: http://localhost:3000/health
- **API**: http://localhost:4000/health
- **MCP Server**: http://localhost:5000/mcp (should return MCP manifest)

## 📝 Development Workflow

### 1. Local Development

```bash
# Start services in development mode
docker-compose up --build

# Make changes to files
# The containers will automatically reload (if using volumes)

# View logs in real-time
docker-compose logs -f
```

### 2. Adding New GraphQL Operations

1. Add the operation to `operations/` directory
2. Update the schema if needed in `schema.graphql`
3. Restart the MCP server: `docker-compose restart marriott-mcp-server`

### 3. Modifying the Frontend

1. Make changes to files in `frontend/src/`
2. The React app will hot-reload automatically
3. For production builds, rebuild the Docker image

## 🔄 Useful Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs marriott-mcp-server

# Rebuild and restart
docker-compose up --build

# Clean up everything
docker-compose down -v --remove-orphans
docker system prune -a

# Access container shell
docker-compose exec marriott-mcp-server sh

# Check service status
docker-compose ps
```

## 🚀 Production Considerations

For production deployment, consider:

1. **Security**: Add authentication and authorization
2. **SSL/TLS**: Configure HTTPS
3. **Monitoring**: Add Prometheus metrics and Grafana dashboards
4. **Logging**: Centralized logging with ELK stack
5. **Scaling**: Kubernetes deployment with horizontal scaling
6. **Backup**: Database and configuration backups

## 📚 Next Steps

1. **Test the MCP server** with your preferred AI agent
2. **Customize the GraphQL schema** for your specific needs
3. **Add more operations** to the `operations/` directory
4. **Implement real GraphQL API** instead of the mock server
5. **Add authentication and security** measures
6. **Deploy to Kubernetes** for production use

## 🆘 Support

If you encounter issues:

1. Check the logs: `docker-compose logs`
2. Verify all services are running: `docker-compose ps`
3. Test individual endpoints manually
4. Check the troubleshooting section above

---

**Happy testing! 🎉** 