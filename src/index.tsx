import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '/src/components/Header';
import Sidebar from '/src/components/Sidebar';
import MainContent from '/src/components/MainContent';
import type { Stats, ConnectionStatus } from '/src/types';
import './index.css';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Error occurred</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

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
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);