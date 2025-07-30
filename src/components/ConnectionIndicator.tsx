import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import type { ConnectionIndicatorProps } from '../types';
import './styles/ConnectionIndicator.css';

const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({ status }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getStatusConfig = (status: ConnectionIndicatorProps['status']) => {
    switch (status) {
      case 'connected':
        return { 
          color: 'text-green-600', 
          bg: 'bg-green-100', 
          icon: CheckCircle, 
          text: 'Connected',
          animation: 'pulse-green',
          tooltip: 'System is connected to the database'
        };
      case 'connecting':
        return { 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-100', 
          icon: Clock, 
          text: 'Connecting...',
          animation: 'pulse-yellow',
          tooltip: 'Attempting to connect to the database'
        };
      default:
        return { 
          color: 'text-red-600', 
          bg: 'bg-red-100', 
          icon: AlertCircle, 
          text: 'Disconnected',
          animation: 'pulse-red',
          tooltip: 'No database connection'
        };
    }
  };
  
  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  return (
    <div
      className={`connection-indicator ${config.bg} ${config.color} ${config.animation}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Icon className="connection-icon" />
      <span className="connection-text">{config.text}</span>
      {showTooltip && <div className="tooltip">{config.tooltip}</div>}
    </div>
  );
};

export default ConnectionIndicator;
