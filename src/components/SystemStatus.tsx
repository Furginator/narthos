import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { SystemStatusProps, SystemItemStatus, ConnectionStatus } from '../types';
import '/src/styles/SystemStatus.css';

const SystemStatus: React.FC<SystemStatusProps> = ({ connectionStatus }) => {
  const [refreshCount, setRefreshCount] = useState(0);

  const getStatus = (status: ConnectionStatus, isPredictionEngine: boolean = false): SystemItemStatus => {
    if (isPredictionEngine) {
      switch (status) {
        case 'connected': return 'healthy';
        case 'connecting': return 'pending';
        case 'disconnected': return 'disabled';
        default: return 'disabled';
      }
    }
    switch (status) {
      case 'connected': return 'healthy';
      case 'connecting': return 'connecting';
      case 'disconnected': return 'disconnected';
      default: return 'disconnected';
    }
  };

  const statusItems = [
    { label: 'Database Connection', status: getStatus(connectionStatus), details: 'Connected to primary node' },
    { label: 'SuperDuperDB Core', status: 'healthy' as SystemItemStatus, details: 'Core services running' },
    { label: 'Model Registry', status: 'healthy' as SystemItemStatus, details: 'All models registered' },
    { label: 'Prediction Engine', status: getStatus(connectionStatus, true), details: 'Engine ready for predictions' },
  ];

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
    alert('System status refreshed');
  };

  return (
    <div className="activity-card">
      <div className="system-status-header">
        <h3 className="activity-title">System Status (Refreshed {refreshCount} times)</h3>
        <button
          className="secondary-button"
          onClick={handleRefresh}
          aria-label="Refresh status"
        >
          <RefreshCw className="refresh-icon" />
        </button>
      </div>
      <div>
        {statusItems.map((item, index) => (
          <div key={index} className="status-item">
            <span className="status-label">{item.label}</span>
            <span
              className={`status-badge ${
                item.status === 'healthy'
                  ? 'status-badge-healthy'
                  : item.status === 'connecting' || item.status === 'pending'
                  ? 'status-badge-pending'
                  : 'status-badge-disconnected'
              }`}
            >
              {item.status}
            </span>
            <p className="status-details">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;
