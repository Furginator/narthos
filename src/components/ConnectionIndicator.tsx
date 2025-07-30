import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import type { ConnectionIndicatorProps } from '../types';
import './styles/ConnectionIndicator.css';

const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({ status }) => {
  const getStatusConfig = (status: ConnectionIndicatorProps['status']) => {
    switch (status) {
      case 'connected':
        return { 
          color: 'text-green-600', 
          bg: 'bg-green-100', 
          icon: CheckCircle, 
          text: 'Connected' 
        };
      case 'connecting':
        return { 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-100', 
          icon: Clock, 
          text: 'Connecting...' 
        };
      default:
        return { 
          color: 'text-red-600', 
          bg: 'bg-red-100', 
          icon: AlertCircle, 
          text: 'Disconnected' 
        };
    }
  };
  
  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  return (
    <div className={`connection-indicator ${config.bg} ${config.color}`}>
      <Icon className="connection-icon" />
      <span className="connection-text">{config.text}</span>
    </div>
  );
};

export default ConnectionIndicator;
