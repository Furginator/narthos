import React, { useState, useEffect } from 'react';
import { Database, Brain, Settings, Zap, CheckCircle, Loader2 } from 'lucide-react';
import type { DashboardProps } from '../types';
import StatCard from './StatCard';
import RecentActivity from './RecentActivity';
import SystemStatus from './SystemStatus';
import '/src/styles/Dashboard.css';

const Dashboard: React.FC<DashboardProps> = ({ stats, connectionStatus }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleGetStarted = () => {
    alert('Redirecting to onboarding guide...');
  };

  const handleViewDocs = () => {
    window.open('https://docs.superduperdb.com', '_blank');
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard">
      {isLoading ? (
        <div className="loading-overlay">
          <Loader2 className="spinner" />
        </div>
      ) : (
        <>
          <div className="welcome-section welcome-animate">
            <div className="brand-icon">SD</div>
            <h2 className="welcome-title">Welcome to SuperDuperDB</h2>
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
            <p className="status-text">
              Status: {connectionStatus === 'connected' ? 'Operational' : 'Disconnected'}
            </p>
          </div>
          <div className="activity-grid">
            <RecentActivity />
            <SystemStatus connectionStatus={connectionStatus} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
