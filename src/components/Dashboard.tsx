import React from 'react';
import { Database, Brain, Settings, Zap } from 'lucide-react';
import type { DashboardProps } from '../types';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import SystemStatus from './SystemStatus';
import '/src/styles/Dashboard.css';

const Dashboard: React.FC<DashboardProps> = ({ stats, connectionStatus }) => {
  const activities = ['Connected to MongoDB', 'Model loaded']; // Placeholder data

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
      <div className="status-board">
        <SystemStatus connectionStatus={connectionStatus} />
      </div>
      <div className="activity-grid">
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
};

export default Dashboard;