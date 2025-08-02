// /src/Dashboard.tsx

import React from 'react';
import { Database, Brain, Settings, Zap, CheckCircle } from 'lucide-react';
import type { DashboardProps } from '../types';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import SystemStatus from './SystemStatus';
import '/src/styles/Dashboard.css';

const Dashboard: React.FC<DashboardProps> = ({ stats, connectionStatus }) => {
  const handleGetStarted = () => {
    alert('Redirecting to onboarding guide...');
  };

  const handleViewDocs = () => {
    window.open('https://docs.superduper.io/docs/intro/', '_blank');
  };

  return (
    <div className="dashboard">
      <div className="welcome-section welcome-animate">
        <div className="brand-icon">NS</div>
        <h2 className="welcome-title">Welcome to Narthos</h2>
        <p className="welcome-text">Build end-to-end AI applications and agents on your own data</p>
        <div className="button-group">
          <button className="primary-button" onClick={handleGetStarted}>Get Started</button>
          <button className="secondary-button" onClick={handleViewDocs}>View Docs</button>
        </div>
      </div>
      <div className="stats-grid">
        <StatCard title="Database" value={stats.connectedDatabase} icon={Database} color="blue" />
        <StatCard title="Active Models" value={stats.activeModels} icon={Brain} color="green" />
        <StatCard title="Components" value={stats.componentsLoaded} icon={Settings} color="purple" />
        <StatCard title="Predictions" value={stats.predictionsRun} icon={Zap} color="orange" />
      </div>
      <div className="status-card">
        <div className="status-card-header">
          <CheckCircle className="status-icon" />
          <h3 className="status-title">System Summary</h3>
        </div>
        <div className="status-summary">
          <p>Database: {stats.connectedDatabase || 'Disconnected'}</p>
          <p>Models: {stats.activeModels}</p>
          <p>Components: {stats.componentsLoaded}</p>
          <p>Predictions: {stats.predictionsRun}</p>
          <p>Status: {connectionStatus === 'connected' ? 'Operational' : 'Disconnected'}</p>
        </div>
      </div>
      <div className="activity-grid">
        <RecentActivity />
        <SystemStatus connectionStatus={connectionStatus} />
      </div>
    </div>
  );
};

export default Dashboard;
