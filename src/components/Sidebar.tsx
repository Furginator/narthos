// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { BarChart3, Database, Brain, FileText, Zap, Terminal, Plus, Play, Search, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import type { SidebarProps } from '../types';
import QuickActionButton from './QuickActionButton';
import '/src/styles/Sidebar.css';

const Sidebar: React.FC<SidebarProps & { stats: { activeModels: number } }> = ({ activeTab, setActiveTab, stats }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'connections', label: 'Connections', icon: Database },
    { id: 'models', label: 'Models', icon: Brain, badge: stats.activeModels },
    { id: 'data', label: 'Data', icon: FileText },
    { id: 'predictions', label: 'Predictions', icon: Zap },
    { id: 'logs', label: 'Logs', icon: Terminal },
  ];
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'Create Model': setActiveTab('models'); break;
      case 'Run Prediction': setActiveTab('predictions'); break;
      case 'Query Database': alert('Query Database not implemented yet'); break;
      case 'Upload Data': alert('Upload Data not implemented yet'); break;
    }
  };
  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <button className="collapse-button" onClick={() => setIsCollapsed(!isCollapsed)} aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        {isCollapsed ? <ChevronRight className="collapse-icon" /> : <ChevronLeft className="collapse-icon" />}
      </button>
      <nav className="nav">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`nav-button ${isActive ? 'nav-button-active' : 'nav-button-inactive'}`} aria-label={item.label}>
              <Icon className="nav-icon" />
              {!isCollapsed && (
                <span className="nav-label">
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && <span className="badge">{item.badge}</span>}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      {!isCollapsed && (
        <div className="quick-actions">
          <h3 className="quick-actions-title">Quick Actions</h3>
          <div className="quick-actions-container">
            <QuickActionButton icon={Plus} label="Create Model" onClick={() => handleQuickAction('Create Model')} />
            <QuickActionButton icon={Play} label="Run Prediction" onClick={() => handleQuickAction('Run Prediction')} />
            <QuickActionButton icon={Search} label="Query Database" onClick={() => handleQuickAction('Query Database')} />
            <QuickActionButton icon={Upload} label="Upload Data" onClick={() => handleQuickAction('Upload Data')} />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;