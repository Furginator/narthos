import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '/src/components/Header';
import Sidebar from '/src/components/Sidebar';
import MainContent from '/src/components/MainContent';
import type { Stats, ConnectionStatus } from '/src/types';
import './index.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [stats, setStats] = useState<Stats>({
    connectedDatabase: 'None',
    activeModels: 0,
    componentsLoaded: 0,
    predictionsRun: 0,
  });

  return (
    <Router>
      <div className="app">
        <Header stats={stats} setStats={setStats} connectionStatus={connectionStatus} />
        <div className="main-layout">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} />
          <MainContent
            activeTab={activeTab}
            connectionStatus={connectionStatus}
            setConnectionStatus={setConnectionStatus}
            stats={stats}
            setStats={setStats}
          />
        </div>
      </div>
    </Router>
);
}