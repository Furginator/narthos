import React from 'react';
import type { SystemStatusProps } from '../types';
import '/src/styles/SystemStatus.css';

const SystemStatus: React.FC<SystemStatusProps> = ({ connectionStatus }) => {
  return (
    <div className="system-status">
      <h3 className="status-title">System Summary</h3>
      <p className="status-summary">Status: {connectionStatus || 'Disconnected'}</p>
    </div>
  );
};

export default SystemStatus;