import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import type { Stats, ConnectionStatus } from '../types';
import '/src/styles/App.css';

const NarthosGUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [stats, setStats] = useState<Stats>({
    connectedDatabase: 'None',
    activeModels: 0,
    componentsLoaded: 0,
    predictionsRun: 0,
  });

  return (
    <div className="app">
      <Header stats={stats} setStats={setStats} connectionStatus={connectionStatus} />
      <div className="main-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} />
        <MainContent
          activeTab={activeTab}
          connectionStatus={connectionStatus}
          setConnectionStatus={setConnectionStatus} // Now matches ConnectionStatus
          stats={stats}
          setStats={setStats}
        />
      </div>
    </div>
  );
};

export default NarthosGUI;