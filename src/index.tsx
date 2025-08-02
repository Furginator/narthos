// src/index.tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import type { Stats, ConnectionStatus } from './types';
import './index.css'; // Merged CSS

const NarthosGUI = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
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
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<NarthosGUI />);