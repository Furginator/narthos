import React from 'react';
import type { ConnectionIndicatorProps } from '../types';
import '/src/styles/ConnectionIndicator.css';
import { CircleAlert } from 'lucide-react';

const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({ status }) => {
  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case 'connected': return 'bg-green-100 text-green-600';
      case 'connecting': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-red-100 text-red-600';
    }
  };

  return (
    <div className={`connection-indicator ${getStatusClass()}`}>
      <CircleAlert className="connection-icon" />
      <span className="connection-text">{status}</span>
    </div>
  );
};

export default ConnectionIndicator;