// src/components/ConnectionIndicator.tsx
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { BrowserRouter as Router } from 'react-router-dom'; // For routing
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import type { ConnectionIndicatorProps, ConnectionStatus, Stats } from '../types';
import '/src/styles/ConnectionIndicator.css';

const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({ status: initialStatus }) => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(initialStatus || 'disconnected');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [stats, setStats] = useState<Stats>({
    connectedDatabase: 'None',
    activeModels: 0,
    componentsLoaded: 0,
    predictionsRun: 0,
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const getStatusConfig = (status: ConnectionStatus) => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-green-600',
          bg: 'bg-green-100',
          icon: CheckCircle,
          text: 'Connected',
          animation: 'pulse-green',
          tooltip: 'System is connected to the database',
        };
      case 'connecting':
        return {
          color: 'text-yellow-600',
          bg: 'bg-yellow-100',
          icon: Clock,
          text: 'Connecting...',
          animation: 'pulse-yellow',
          tooltip: 'Attempting to connect to the database',
        };
      default:
        return {
          color: 'text-red-600',
          bg: 'bg-red-100',
          icon: AlertCircle,
          text: 'Disconnected',
          animation: 'pulse-red',
          tooltip: 'No database connection',
        };
    }
  };

  const config = getStatusConfig(connectionStatus);
  const Icon = config.icon;

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
        <div
          className={`connection-indicator ${config.bg} ${config.color} ${config.animation}`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Icon className="connection-icon" />
          <span className="connection-text">{config.text}</span>
          {showTooltip && <div className="tooltip">{config.tooltip}</div>}
        </div>
      </div>
    </Router>
  );
};

export default ConnectionIndicator;