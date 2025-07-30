import React, { useState } from 'react';
import '/src/styles/LogViewer.css';

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState([
    '[2024-01-20 10:30:15] SuperDuperDB GUI started',
    '[2024-01-20 10:30:16] Initializing components...',
    '[2024-01-20 10:30:17] Ready for connections',
  ]);

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="log-viewer">
      <div className="log-header">
        <h2 className="log-title">System Logs</h2>
        <button className="secondary-button" onClick={handleClearLogs}>
          Clear Logs
        </button>
      </div>
      <div className="activity-card">
        <div className="log-container">
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
          <div className="log-cursor">_</div>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;
