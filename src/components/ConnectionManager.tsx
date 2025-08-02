// src/components/ConnectionManager.tsx
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { BrowserRouter as Router } from 'react-router-dom'; // For routing
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import type { ConnectionManagerProps, ConnectionForm, DatabaseProvider, Stats } from '../types';
import '/src/styles/ConnectionManager.css';

const ConnectionManager: React.FC<ConnectionManagerProps> = ({ connectionStatus: initialConnectionStatus, setConnectionStatus: initialSetConnectionStatus, stats: initialStats, setStats: initialSetStats }) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('mongodb');
  const [connectionForm, setConnectionForm] = useState<ConnectionForm>({
    host: 'localhost',
    port: '27017',
    database: 'narthos_db',
    username: '',
    password: '',
  });
  const [connectionLog, setConnectionLog] = useState<string[]>([]);
  const [savedConnections, setSavedConnections] = useState<ConnectionForm[]>([]);
  const [activeTab, setActiveTab] = useState<string>('connections'); // From App.tsx
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(initialConnectionStatus || 'disconnected');
  const [stats, setStats] = useState<Stats>(initialStats || {
    connectedDatabase: 'None',
    activeModels: 0,
    componentsLoaded: 0,
    predictionsRun: 0,
  });

  const providers: DatabaseProvider[] = [
    { id: 'mongodb', name: 'MongoDB', icon: '🍃', defaultPort: '27017' },
    { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', defaultPort: '5432' },
    { id: 'mysql', name: 'MySQL', icon: '🐬', defaultPort: '3306' },
    { id: 'sqlite', name: 'SQLite', icon: '📄', defaultPort: '' },
    { id: 'duckdb', name: 'DuckDB', icon: '🦆', defaultPort: '' },
    { id: 'snowflake', name: 'Snowflake', icon: '❄️', defaultPort: '443' },
  ];

  const handleConnect = async () => {
    setConnectionStatus('connecting');
    setConnectionLog(prev => [...prev, `[${new Date().toLocaleString()}] Connecting to ${connectionForm.database}`]);
    try {
      const response = await fetch('http://localhost:8000/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conn_string: `${selectedProvider}://${connectionForm.username && `${connectionForm.username}:${connectionForm.password}@`}${connectionForm.host}:${connectionForm.port}/${connectionForm.database}`,
        }),
      });
      const result = await response.json();
      if (result.status === 'connected') {
        setConnectionStatus('connected');
        setStats((prev: Stats) => ({ ...prev, connectedDatabase: connectionForm.database }));
        setConnectionLog(prev => [...prev, `[${new Date().toLocaleString()}] Connected to ${connectionForm.database}`]);
      } else {
        setConnectionStatus('disconnected');
        setConnectionLog(prev => [...prev, `[${new Date().toLocaleString()}] Connection failed: ${result.message}`]);
        alert(`Connection failed: ${result.message}`);
      }
    } catch (e) {
      setConnectionStatus('disconnected');
      setConnectionLog(prev => [...prev, `[${new Date().toLocaleString()}] Connection failed: ${e}`]);
      alert(`Connection failed: ${e}`);
    }
  };

  const handleTestConnection = async () => {
    setConnectionLog(prev => [...prev, `[${new Date().toLocaleString()}] Testing connection to ${connectionForm.database}`]);
    try {
      const response = await fetch('http://localhost:8000/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conn_string: `${selectedProvider}://${connectionForm.username && `${connectionForm.username}:${connectionForm.password}@`}${connectionForm.host}:${connectionForm.port}/${connectionForm.database}`,
        }),
      });
      const result = await response.json();
      if (result.status === 'connected') {
        alert('Test connection successful!');
      } else {
        alert(`Test connection failed: ${result.message}`);
      }
    } catch (e) {
      alert(`Test connection failed: ${e}`);
    }
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
    setConnectionLog(prev => [...prev, `[${new Date().toLocaleString()}] Disconnected from ${connectionForm.database}`]);
  };

  const handleSaveConnection = () => {
    setSavedConnections(prev => [...prev, { ...connectionForm }]);
    alert(`Saved connection: ${connectionForm.database}`);
  };

  const handleLoadConnection = (conn: ConnectionForm) => {
    setConnectionForm(conn);
    setSelectedProvider(conn.database.split('_')[0] || 'mongodb');
  };

  const getButtonText = (status: ConnectionManagerProps['connectionStatus']): string => {
    switch (status) {
      case 'connecting': return 'Connecting...';
      default: return 'Connect';
    }
  };

  const isButtonDisabled = (status: ConnectionManagerProps['connectionStatus']): boolean => status === 'connecting';

  return (
    <Router>
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
        <div className="connection-manager">
          <div className="connection-header">
            <h2 className="connection-title">Database Connections</h2>
            {connectionStatus === 'connected' && (
              <button onClick={handleDisconnect} className="disconnect-button">Disconnect</button>
            )}
          </div>
          {connectionStatus === 'connected' ? (
            <div className="activity-card">
              <div className="connection-success">
                <CheckCircle className="success-icon" />
                <h3 className="activity-title">Connected Successfully</h3>
              </div>
              <div className="connection-details">
                <div><span className="detail-label">Provider:</span><span className="detail-value">{selectedProvider.toUpperCase()}</span></div>
                <div><span className="detail-label">Host:</span><span className="detail-value">{connectionForm.host}:{connectionForm.port}</span></div>
                <div><span className="detail-label">Database:</span><span className="detail-value">{connectionForm.database}</span></div>
                <div><span className="detail-label">Status:</span><span className="detail-value-active">Active</span></div>
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
                <div><label htmlFor="host" className="form-label">Host</label><input id="host" type="text" value={connectionForm.host} onChange={(e) => setConnectionForm(prev => ({ ...prev, host: e.target.value }))} className="form-input" placeholder="Enter host" aria-label="Host" /></div>
                <div><label htmlFor="port" className="form-label">Port</label><input id="port" type="text" value={connectionForm.port} onChange={(e) => setConnectionForm(prev => ({ ...prev, port: e.target.value }))} className="form-input" placeholder="Enter port" aria-label="Port" /></div>
                <div><label htmlFor="database" className="form-label">Database</label><input id="database" type="text" value={connectionForm.database} onChange={(e) => setConnectionForm(prev => ({ ...prev, database: e.target.value }))} className="form-input" placeholder="Enter database name" aria-label="Database" /></div>
                <div><label htmlFor="username" className="form-label">Username</label><input id="username" type="text" value={connectionForm.username} onChange={(e) => setConnectionForm(prev => ({ ...prev, username: e.target.value }))} className="form-input" placeholder="Enter username" aria-label="Username" /></div>
                <div className="form-full-width"><label htmlFor="password" className="form-label">Password</label><input id="password" type="password" value={connectionForm.password} onChange={(e) => setConnectionForm(prev => ({ ...prev, password: e.target.value }))} className="form-input" placeholder="Enter password" aria-label="Password" /></div>
              </div>
              <div className="connection-string">
                <label className="form-label">Connection String</label>
                <div className="connection-string-value">
                  {selectedProvider}://{connectionForm.username && `${connectionForm.username}:***@`}{connectionForm.host}:{connectionForm.port}/{connectionForm.database}
                </div>
              </div>
              <div className="button-group">
                <button onClick={handleConnect} disabled={isButtonDisabled(connectionStatus)} className="primary-button connect-button">{getButtonText(connectionStatus)}</button>
                <button onClick={handleTestConnection} className="secondary-button">Test Connection</button>
                <button onClick={handleSaveConnection} className="secondary-button">Save Connection</button>
              </div>
            </div>
          )}
          <div className="connection-log">
            <h3 className="activity-title">Connection Log</h3>
            <div className="log-container">
              {connectionLog.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </div>
          {savedConnections.length > 0 && (
            <div className="saved-connections">
              <h3 className="activity-title">Saved Connections</h3>
              <ul className="saved-connections-list">
                {savedConnections.map((conn, index) => (
                  <li key={index}>
                    <button className="saved-connection-button" onClick={() => handleLoadConnection(conn)}>
                      {conn.database} ({conn.host}:{conn.port})
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Router>
  );

export default ConnectionManager;