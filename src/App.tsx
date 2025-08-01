import React, { useState } from 'react';
import { 
  Database, 
  Brain, 
  Settings, 
  Play, 
  Upload,
  Plus,
  Search,
  BarChart3,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Terminal
} from 'lucide-react';
import './index.css';

// Type definitions
type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';
type SystemItemStatus = 'healthy' | 'disabled' | 'disconnected' | 'connecting' | 'pending';

interface Stats {
  connectedDatabase: string;
  activeModels: number;
  componentsLoaded: number;
  predictionsRun: number;
}

interface HeaderProps {
  connectionStatus: ConnectionStatus;
}

interface ConnectionIndicatorProps {
  status: ConnectionStatus;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface QuickActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface MainContentProps {
  activeTab: string;
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (status: ConnectionStatus) => void;
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
}

interface DashboardProps {
  stats: Stats;
  connectionStatus: ConnectionStatus;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

interface SystemStatusProps {
  connectionStatus: ConnectionStatus;
}

interface ConnectionManagerProps {
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (status: ConnectionStatus) => void;
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
}

interface ModelManagerProps {
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
}

interface ConnectionForm {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
}

interface DatabaseProvider {
  id: string;
  name: string;
  icon: string;
  defaultPort: string;
}

// Main App Component
const NarthosGUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [stats, setStats] = useState<Stats>({
    connectedDatabase: 'None',
    activeModels: 0,
    componentsLoaded: 0,
    predictionsRun: 0
  });

  return (
    <div className="app">
      <Header connectionStatus={connectionStatus} />
      <div className="main-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <MainContent 
          activeTab={activeTab} 
          connectionStatus={connectionStatus}
          setConnectionStatus={setConnectionStatus}
          stats={stats}
          setStats={setStats}
        />
      </div>
    </div>
  );
};

// Header Component
const Header: React.FC<HeaderProps> = ({ connectionStatus }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <Database className="logo-icon" />
        </div>
        <div>
          <h1 className="title">Narthos</h1>
          <p className="subtitle">AI Database Framework</p>
        </div>
      </div>
      <div className="header-right">
        <ConnectionIndicator status={connectionStatus} />
        <button className="settings-button" title="Settings">
          <Settings className="settings-icon" />
        </button>
      </div>
    </header>
  );
};

// Connection Status Indicator
const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({ status }) => {
  const getStatusConfig = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return { 
          color: 'text-green-600', 
          bg: 'bg-green-100', 
          icon: CheckCircle, 
          text: 'Connected' 
        };
      case 'connecting':
        return { 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-100', 
          icon: Clock, 
          text: 'Connecting...' 
        };
      default:
        return { 
          color: 'text-red-600', 
          bg: 'bg-red-100', 
          icon: AlertCircle, 
          text: 'Disconnected' 
        };
    }
  };
  
  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  return (
    <div className={`connection-indicator ${config.bg} ${config.color}`}>
      <Icon className="connection-icon" />
      <span className="connection-text">{config.text}</span>
    </div>
  );
};

// Sidebar Navigation
const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'connections', label: 'Connections', icon: Database },
    { id: 'models', label: 'Models', icon: Brain },
    { id: 'data', label: 'Data', icon: FileText },
    { id: 'predictions', label: 'Predictions', icon: Zap },
    { id: 'logs', label: 'Logs', icon: Terminal }
  ];

  return (
    <aside className="sidebar">
      <nav className="nav">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-button ${isActive ? 'nav-button-active' : 'nav-button-inactive'}`}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="quick-actions">
        <h3 className="quick-actions-title">Quick Actions</h3>
        <div className="quick-actions-container">
          <QuickActionButton icon={Plus} label="Create Model" />
          <QuickActionButton icon={Play} label="Run Prediction" />
          <QuickActionButton icon={Search} label="Query Database" />
          <QuickActionButton icon={Upload} label="Upload Data" />
        </div>
      </div>
    </aside>
  );
};

// Quick Action Button
const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon: Icon, label }) => (
  <button className="quick-action-button">
    <Icon className="quick-action-icon" />
    <span>{label}</span>
  </button>
);

// Main Content Area
const MainContent: React.FC<MainContentProps> = ({ activeTab, connectionStatus, setConnectionStatus, stats, setStats }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} connectionStatus={connectionStatus} />;
      case 'connections':
        return <ConnectionManager connectionStatus={connectionStatus} setConnectionStatus={setConnectionStatus} stats={stats} setStats={setStats} />;
      case 'models':
        return <ModelManager stats={stats} setStats={setStats} />;
      case 'data':
        return <DataManager />;
      case 'predictions':
        return <PredictionRunner />;
      case 'logs':
        return <LogViewer />;
      default:
        return <Dashboard stats={stats} connectionStatus={connectionStatus} />;
    }
  };

  return (
    <main className="main-content">
      {renderContent()}
    </main>
  );
};

// Dashboard Component
const Dashboard: React.FC<DashboardProps> = ({ stats, connectionStatus }) => {
  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h2 className="welcome-title">Welcome to Narthos</h2>
        <p className="welcome-text">Build end-to-end AI applications and agents on your own data</p>
        <div className="button-group">
          <button className="primary-button">Get Started</button>
          <button className="secondary-button">View Docs</button>
        </div>
      </div>
      <div className="stats-grid">
        <StatCard title="Database" value={stats.connectedDatabase} icon={Database} color="blue" />
        <StatCard title="Active Models" value={stats.activeModels} icon={Brain} color="green" />
        <StatCard title="Components" value={stats.componentsLoaded} icon={Settings} color="purple" />
        <StatCard title="Predictions" value={stats.predictionsRun} icon={Zap} color="orange" />
      </div>
      <div className="activity-grid">
        <RecentActivity />
        <SystemStatus connectionStatus={connectionStatus} />
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  const getColorConfig = (color: string) => {
    switch (color) {
      case 'blue': return 'stat-icon-blue';
      case 'green': return 'stat-icon-green';
      case 'purple': return 'stat-icon-purple';
      case 'orange': return 'stat-icon-orange';
      default: return 'stat-icon-default';
    }
  };

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div>
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className={`stat-icon ${getColorConfig(color)}`}>
          <Icon className="icon" />
        </div>
      </div>
    </div>
  );
};

// Recent Activity Component
const RecentActivity: React.FC = () => {
  const activities = [
    { action: 'Model created', target: 'text-classifier-v1', time: '2 minutes ago', type: 'success' },
    { action: 'Prediction run', target: 'sentiment-analyzer', time: '5 minutes ago', type: 'info' },
    { action: 'Data uploaded', target: 'training_dataset.csv', time: '10 minutes ago', type: 'info' },
    { action: 'Connection established', target: 'MongoDB Atlas', time: '1 hour ago', type: 'success' }
  ];

  return (
    <div className="activity-card">
      <h3 className="activity-title">Recent Activity</h3>
      <div>
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className={`activity-dot ${activity.type === 'success' ? 'activity-dot-success' : 'activity-dot-info'}`} />
            <div className="activity-content">
              <p className="activity-text">
                <span className="activity-action">{activity.action}</span>{' '}
                <span className="activity-target">{activity.target}</span>
              </p>
              <p className="activity-time">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// System Status Component
const SystemStatus: React.FC<SystemStatusProps> = ({ connectionStatus }) => {
  const getStatus = (status: ConnectionStatus, isPredictionEngine: boolean = false): SystemItemStatus => {
    if (isPredictionEngine) {
      switch (status) {
        case 'connected': return 'healthy';
        case 'connecting': return 'pending';
        case 'disconnected': return 'disabled';
        default: return 'disabled';
      }
    }
    switch (status) {
      case 'connected': return 'healthy';
      case 'connecting': return 'connecting';
      case 'disconnected': return 'disconnected';
      default: return 'disconnected';
    }
  };

  const statusItems = [
    { label: 'Narthos Core', status: 'healthy' as SystemItemStatus },
    { label: 'Database Connection', status: getStatus(connectionStatus) },
    { label: 'Model Registry', status: 'healthy' as SystemItemStatus },
    { label: 'Prediction Engine', status: getStatus(connectionStatus, true) },
  ];

  return (
    <div className="activity-card">
      <h3 className="activity-title">System Status</h3>
      <div>
        {statusItems.map((item, index) => (
          <div key={index} className="status-item">
            <span className="status-label">{item.label}</span>
            <span
              className={`status-badge ${
                item.status === 'healthy'
                  ? 'status-badge-healthy'
                  : item.status === 'connecting' || item.status === 'pending'
                  ? 'status-badge-pending'
                  : 'status-badge-disconnected'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Connection Manager Component
const ConnectionManager: React.FC<ConnectionManagerProps> = ({ connectionStatus, setConnectionStatus, stats, setStats }) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('mongodb');
  const [connectionForm, setConnectionForm] = useState<ConnectionForm>({
    host: 'localhost',
    port: '27017',
    database: 'narthos_db',
    username: '',
    password: ''
  });

  const providers: DatabaseProvider[] = [
    { id: 'mongodb', name: 'MongoDB', icon: '🍃', defaultPort: '27017' },
    { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', defaultPort: '5432' },
    { id: 'mysql', name: 'MySQL', icon: '🐬', defaultPort: '3306' },
    { id: 'sqlite', name: 'SQLite', icon: '📄', defaultPort: '' },
    { id: 'duckdb', name: 'DuckDB', icon: '🦆', defaultPort: '' },
    { id: 'snowflake', name: 'Snowflake', icon: '❄️', defaultPort: '443' }
  ];

  const handleConnect = async () => {
    setConnectionStatus('connecting');
    setTimeout(() => {
      setConnectionStatus('connected');
      setStats((prev: Stats) => ({ ...prev, connectedDatabase: connectionForm.database }));
    }, 2000);
  };

  const handleTestConnection = async () => {
    alert('Test connection not implemented yet.');
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
  };

  const getButtonText = (status: ConnectionStatus): string => {
    switch (status) {
      case 'connecting': return 'Connecting...';
      default: return 'Connect';
    }
  };

  const isButtonDisabled = (status: ConnectionStatus): boolean => status === 'connecting';

  return (
    <div className="connection-manager">
      <div className="connection-header">
        <h2 className="connection-title">Database Connections</h2>
        {connectionStatus === 'connected' && (
          <button onClick={handleDisconnect} className="disconnect-button">
            Disconnect
          </button>
        )}
      </div>
      {connectionStatus === 'connected' ? (
        <div className="activity-card">
          <div className="connection-success">
            <CheckCircle className="success-icon" />
            <h3 className="activity-title">Connected Successfully</h3>
          </div>
          <div className="connection-details">
            <div>
              <span className="detail-label">Provider:</span>
              <span className="detail-value">{selectedProvider.toUpperCase()}</span>
            </div>
            <div>
              <span className="detail-label">Host:</span>
              <span className="detail-value">{connectionForm.host}:{connectionForm.port}</span>
            </div>
            <div>
              <span className="detail-label">Database:</span>
              <span className="detail-value">{connectionForm.database}</span>
            </div>
            <div>
              <span className="detail-label">Status:</span>
              <span className="detail-value-active">Active</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="activity-card">
          <h3 className="activity-title">Connect to Database</h3>
          <p className="connect-text">Select a database provider and configure your connection.</p>
          <div className="provider-grid">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => {
                  setSelectedProvider(provider.id);
                  setConnectionForm(prev => ({ ...prev, port: provider.defaultPort }));
                }}
                className={`provider-button ${selectedProvider === provider.id ? 'provider-button-active' : ''}`}
              >
                <div className="provider-icon">{provider.icon}</div>
                <div className="provider-name">{provider.name}</div>
              </button>
            ))}
          </div>
          <div className="connection-form">
            <div>
              <label htmlFor="host" className="form-label">Host</label>
              <input
                id="host"
                type="text"
                value={connectionForm.host}
                onChange={(e) => setConnectionForm(prev => ({ ...prev, host: e.target.value }))}
                className="form-input"
                placeholder="Enter host"
                aria-label="Host"
              />
            </div>
            <div>
              <label htmlFor="port" className="form-label">Port</label>
              <input
                id="port"
                type="text"
                value={connectionForm.port}
                onChange={(e) => setConnectionForm(prev => ({ ...prev, port: e.target.value }))}
                className="form-input"
                placeholder="Enter port"
                aria-label="Port"
              />
            </div>
            <div>
              <label htmlFor="database" className="form-label">Database</label>
              <input
                id="database"
                type="text"
                value={connectionForm.database}
                onChange={(e) => setConnectionForm(prev => ({ ...prev, database: e.target.value }))}
                className="form-input"
                placeholder="Enter database name"
                aria-label="Database"
              />
            </div>
            <div>
              <label htmlFor="username" className="form-label">Username</label>
              <input
                id="username"
                type="text"
                value={connectionForm.username}
                onChange={(e) => setConnectionForm(prev => ({ ...prev, username: e.target.value }))}
                className="form-input"
                placeholder="Enter username"
                aria-label="Username"
              />
            </div>
            <div className="form-full-width">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                value={connectionForm.password}
                onChange={(e) => setConnectionForm(prev => ({ ...prev, password: e.target.value }))}
                className="form-input"
                placeholder="Enter password"
                aria-label="Password"
              />
            </div>
          </div>
          <div className="connection-string">
            <label className="form-label">Connection String</label>
            <div className="connection-string-value">
              {selectedProvider}://{connectionForm.username && `${connectionForm.username}:***@`}{connectionForm.host}:{connectionForm.port}/{connectionForm.database}
            </div>
          </div>
          <div className="button-group">
            <button
              onClick={handleConnect}
              disabled={isButtonDisabled(connectionStatus)}
              className="primary-button connect-button"
            >
              {getButtonText(connectionStatus)}
            </button>
            <button onClick={handleTestConnection} className="secondary-button">
              Test Connection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Model Manager Component
const ModelManager: React.FC<ModelManagerProps> = ({ stats, setStats }) => {
  return (
    <div className="model-manager">
      <div className="model-header">
        <h2 className="model-title">Model Management</h2>
        <button className="primary-button create-model-button">
          <Plus className="button-icon" />
          <span>Create Model</span>
        </button>
      </div>
      <div className="empty-state">
        <Brain className="empty-state-icon" />
        <h3 className="empty-state-title">No Models Yet</h3>
        <p className="empty-state-text">Create your first AI model to get started with Narthos.</p>
        <button className="primary-button">Create Your First Model</button>
      </div>
    </div>
  );
};

// Data Manager Component
const DataManager: React.FC = () => {
  return (
    <div className="data-manager">
      <h2 className="data-title">Data Management</h2>
      <div className="empty-state">
        <FileText className="empty-state-icon" />
        <h3 className="empty-state-title">Data Browser</h3>
        <p className="empty-state-text">Browse and manage your database tables and collections.</p>
      </div>
    </div>
  );
};

// Prediction Runner Component
const PredictionRunner: React.FC = () => {
  return (
    <div className="prediction-runner">
      <h2 className="prediction-title">Predictions</h2>
      <div className="empty-state">
        <Zap className="empty-state-icon" />
        <h3 className="empty-state-title">Run Predictions</h3>
        <p className="empty-state-text">Execute AI predictions on your data using trained models.</p>
      </div>
    </div>
  );
};

// Log Viewer Component
const LogViewer: React.FC = () => {
  return (
    <div className="log-viewer">
      <h2 className="log-title">System Logs</h2>
      <div className="activity-card">
        <div className="log-container">
          <div>[2024-01-20 10:30:15] Narthos GUI started</div>
          <div>[2024-01-20 10:30:16] Initializing components...</div>
          <div>[2024-01-20 10:30:17] Ready for connections</div>
          <div className="log-cursor">_</div>
        </div>
      </div>
    </div>
  );
};

export default NarthosGUI;