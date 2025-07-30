import React, { useState } from 'react';
import type { StatCardProps } from '../types';
import './styles/StatCard.css';

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  const getColorConfig = (color: string) => {
    switch (color) {
      case 'blue': return 'stat-icon-blue';
      case 'green': return 'stat-icon-green';
      case 'purple': return 'stat-icon-purple';
      case 'orange': return 'stat-icon-orange';
      default: return 'stat-icon-default';
    }
  };

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div>
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className={`stat-icon ${getColorConfig(color)}`}>
          <Icon className="icon" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
