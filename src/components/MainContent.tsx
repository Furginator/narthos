import React from 'react';
import type { MainContentProps,} from '../types';
import Dashboard from './Dashboard';
import ConnectionManager from './ConnectionManager';
import ModelManager from './ModelManager';
import DataManager from './DataManager';
import PredictionRunner from './PredictionRunner';
import LogViewer from './LogViewer';
import '/src/styles/MainContent.css';

const MainContent: React.FC<MainContentProps> = ({ activeTab, connectionStatus, setConnectionStatus, stats, setStats }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} connectionStatus={connectionStatus} setStats={setStats} />;
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
        return <Dashboard stats={stats} connectionStatus={connectionStatus} setStats={setStats} />;
    }
  };

  return (
    <main className="main-content">
      <div className="tab-content" key={activeTab}>
        {renderContent()}
      </div>
    </main>
  );
};

// ... (existing code)
export default MainContent;