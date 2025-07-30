import React, { useState } from 'react';
import type { StatCardProps } from '../types';
import './styles/StatCard.css';

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getColorConfig = (color: string) => {
    switch (color) {
      case 'blue': return 'stat-icon-blue';
      case 'green': return 'stat-icon-green';
      case 'purple': return 'stat-icon-purple';
      case 'orange': return 'stat-icon-orange';
      default: return 'stat-icon-default';
    }
  };

  const getDetails = (title: string) => {
    switch (title) {
      case 'Database': return `Connected to ${value || 'None'}`;
      case 'Active Models': return `${value || 0} models loaded`;
      case 'Components': return `${value || 0} components active`;
      case 'Predictions': return `${value || 0} predictions executed`;
      default: return '';
    }
  };

  return (
    <div
      className="stat-card"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="stat-card-header">
        <div>
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className={`stat-icon ${getColorConfig(color)}`}>
          <Icon className="icon" />
        </div>
      </div>
      {showTooltip && <div className="stat-tooltip">{getDetails(title)}</div>}
    </div>
  );
};

export default StatCard;
