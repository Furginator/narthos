import React from 'react';
import { BarChart3, Database, Brain, FileText, Zap, Terminal } from 'lucide-react';
import QuickActionButton from './QuickActionButton';
import type { SidebarProps, Stats } from '/src/types';
import '/src/styles/Sidebar.css';

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, stats }) => {
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'connections', label: 'Connections', icon: Database },
    { id: 'models', label: 'Models', icon: Brain },
    { id: 'data', label: 'Data', icon: FileText },
    { id: 'predictions', label: 'Predictions', icon: Zap },
    { id: 'logs', label: 'Logs', icon: Terminal },
  ];

  return (
    <aside className="sidebar">
      <nav className="nav">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-button ${isActive ? 'nav-button-active' : 'nav-button-inactive'}`}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="quick-actions">
        <h3 className="quick-actions-title">Quick Actions</h3>
        <div className="quick-actions-container">
          <QuickActionButton icon={<Plus />} label="Create Model" />
          <QuickActionButton icon={<Play />} label="Run Prediction" />
          <QuickActionButton icon={<Search />} label="Query Database" />
          <QuickActionButton icon={<Upload />} label="Upload Data" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;