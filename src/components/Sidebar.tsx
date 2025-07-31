import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChartColumn, Database, Brain, Table, Zap, FileText } from 'lucide-react';
import type { SidebarProps } from '../types';
// Remove or comment out: import '/src/styles/Sidebar.css';
import QuickActionButton from './QuickActionButton';

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { path: '/dashboard', icon: ChartColumn, label: 'Dashboard' },
    { path: '/connections', icon: Database, label: 'Connections' },
    { path: '/models', icon: Brain, label: 'Models' },
    { path: '/data', icon: Table, label: 'Data' },
    { path: '/predictions', icon: Zap, label: 'Predictions' },
    { path: '/logs', icon: FileText, label: 'Logs' },
  ];

  return (
    <aside className="sidebar">
      <nav className="nav">
        {tabs.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }: { isActive: boolean }) => `nav-button ${isActive ? 'nav-button-active' : ''}`}
            onClick={() => setActiveTab(label.toLowerCase())}
          >
            <Icon className="nav-icon" />
            <span>{label}</span>
          </NavLink>
        ))}
        <QuickActionButton
          icon={<ChartColumn />}
          label="Quick Action"
          onClick={() => alert('Action triggered')}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;