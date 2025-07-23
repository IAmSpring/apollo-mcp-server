import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Server, 
  Activity, 
  Database, 
  Settings, 
  Zap,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import './App.css';

// Component 1: Server Status
const ServerStatus = () => {
  const [status, setStatus] = useState('loading');
  const [lastCheck, setLastCheck] = useState(null);

  const checkStatus = async () => {
    try {
      const response = await axios.get('/api/status');
      setStatus('online');
      setLastCheck(new Date());
    } catch (error) {
      setStatus('offline');
      setLastCheck(new Date());
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'online':
        return <CheckCircle className="status-online" size={20} />;
      case 'offline':
        return <XCircle className="status-offline" size={20} />;
      default:
        return <Clock className="status-loading" size={20} />;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <Server size={24} />
        <h3>Server Status</h3>
      </div>
      <div className="card-content">
        <div className="status-row">
          {getStatusIcon()}
          <span className={`status-text status-${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        {lastCheck && (
          <p className="last-check">
            Last checked: {lastCheck.toLocaleTimeString()}
          </p>
        )}
        <button className="btn" onClick={checkStatus}>
          Refresh Status
        </button>
      </div>
    </div>
  );
};

// Component 2: MCP Tools Overview
const MCPToolsOverview = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        // Mock data for now - replace with actual MCP tools fetch
        const mockTools = [
          { name: 'getReservation', description: 'Retrieve hotel reservation details', category: 'Reservations' },
          { name: 'searchHotels', description: 'Search for available hotels', category: 'Search' },
          { name: 'createBooking', description: 'Create a new hotel booking', category: 'Bookings' },
          { name: 'getGuestProfile', description: 'Get guest profile information', category: 'Guests' },
          { name: 'updateReservation', description: 'Update existing reservation', category: 'Reservations' }
        ];
        setTools(mockTools);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tools:', error);
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <Zap size={24} />
        <h3>MCP Tools Available</h3>
      </div>
      <div className="card-content">
        {loading ? (
          <p>Loading tools...</p>
        ) : (
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <div key={index} className="tool-item">
                <h4>{tool.name}</h4>
                <p>{tool.description}</p>
                <span className="tool-category">{tool.category}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Component 3: GraphQL Schema Info
const GraphQLSchemaInfo = () => {
  const [schemaInfo, setSchemaInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemaInfo = async () => {
      try {
        // Mock schema info - replace with actual GraphQL introspection
        const mockSchemaInfo = {
          types: 45,
          queries: 12,
          mutations: 8,
          subscriptions: 3,
          lastUpdated: new Date().toISOString()
        };
        setSchemaInfo(mockSchemaInfo);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schema info:', error);
        setLoading(false);
      }
    };

    fetchSchemaInfo();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <Database size={24} />
        <h3>GraphQL Schema</h3>
      </div>
      <div className="card-content">
        {loading ? (
          <p>Loading schema information...</p>
        ) : schemaInfo ? (
          <div className="schema-stats">
            <div className="stat-item">
              <span className="stat-number">{schemaInfo.types}</span>
              <span className="stat-label">Types</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{schemaInfo.queries}</span>
              <span className="stat-label">Queries</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{schemaInfo.mutations}</span>
              <span className="stat-label">Mutations</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{schemaInfo.subscriptions}</span>
              <span className="stat-label">Subscriptions</span>
            </div>
          </div>
        ) : (
          <p>Unable to load schema information</p>
        )}
      </div>
    </div>
  );
};

// Component 4: Performance Metrics
const PerformanceMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Mock performance metrics - replace with actual metrics
        const mockMetrics = {
          responseTime: 125,
          requestsPerMinute: 45,
          errorRate: 0.02,
          uptime: 99.8,
          activeConnections: 12
        };
        setMetrics(mockMetrics);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching metrics:', error);
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <Activity size={24} />
        <h3>Performance Metrics</h3>
      </div>
      <div className="card-content">
        {loading ? (
          <p>Loading metrics...</p>
        ) : metrics ? (
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-value">{metrics.responseTime}ms</span>
              <span className="metric-label">Avg Response Time</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{metrics.requestsPerMinute}</span>
              <span className="metric-label">Requests/min</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{(metrics.errorRate * 100).toFixed(2)}%</span>
              <span className="metric-label">Error Rate</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{metrics.uptime}%</span>
              <span className="metric-label">Uptime</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">{metrics.activeConnections}</span>
              <span className="metric-label">Active Connections</span>
            </div>
          </div>
        ) : (
          <p>Unable to load performance metrics</p>
        )}
      </div>
    </div>
  );
};

// Component 5: Configuration Status
const ConfigurationStatus = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Mock configuration - replace with actual config fetch
        const mockConfig = {
          endpoint: 'http://localhost:4000/graphql',
          transport: 'streamable_http',
          port: 5000,
          operationsSource: 'local',
          schemaSource: 'local',
          loggingLevel: 'info'
        };
        setConfig(mockConfig);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching configuration:', error);
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <Settings size={24} />
        <h3>Configuration</h3>
      </div>
      <div className="card-content">
        {loading ? (
          <p>Loading configuration...</p>
        ) : config ? (
          <div className="config-list">
            <div className="config-item">
              <span className="config-key">Endpoint:</span>
              <span className="config-value">{config.endpoint}</span>
            </div>
            <div className="config-item">
              <span className="config-key">Transport:</span>
              <span className="config-value">{config.transport}</span>
            </div>
            <div className="config-item">
              <span className="config-key">Port:</span>
              <span className="config-value">{config.port}</span>
            </div>
            <div className="config-item">
              <span className="config-key">Operations Source:</span>
              <span className="config-value">{config.operationsSource}</span>
            </div>
            <div className="config-item">
              <span className="config-key">Schema Source:</span>
              <span className="config-value">{config.schemaSource}</span>
            </div>
            <div className="config-item">
              <span className="config-key">Logging Level:</span>
              <span className="config-value">{config.loggingLevel}</span>
            </div>
          </div>
        ) : (
          <p>Unable to load configuration</p>
        )}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>🏨 Marriott MCP Server</h1>
          <p>GraphQL API for AI Agents - Development Dashboard</p>
        </div>
      </header>
      
      <main className="container">
        <div className="dashboard-grid">
          <ServerStatus />
          <MCPToolsOverview />
          <GraphQLSchemaInfo />
          <PerformanceMetrics />
          <ConfigurationStatus />
        </div>
      </main>
    </div>
  );
}

export default App; 