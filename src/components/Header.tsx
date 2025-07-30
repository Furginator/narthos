import React, { useState } from 'react';
import { Database, Settings } from 'lucide-react';
import type { HeaderProps } from '../types';
import ConnectionIndicator from './ConnectionIndicator';
import './styles/Header.css';

const Header: React.FC<HeaderProps> = ({ connectionStatus }) => {
  const [showStatus, setShowStatus] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <Database className="logo-icon" />
        </div>
        <div>
          <h1 className="title">SuperDuperDB</h1>
          <p className="subtitle">AI Database Framework</p>
        </div>
      </div>
      <div className="header-right">
        <div className="status-dropdown">
          <button
            className="status-button"
            onClick={() => setShowStatus(!showStatus)}
            aria-label="Toggle connection status"
          >
            <ConnectionIndicator status={connectionStatus} />
          </button>
          {showStatus && (
            <div className="status-menu">
              <p>Status: {connectionStatus}</p>
              <button className="secondary-button" onClick={() => setShowStatus(false)}>
                Close
              </button>
            </div>
          )}
        </div>
        <button
          className="settings-button"
          onClick={() => setShowSettings(true)}
          aria-label="Open settings"
        >
          <Settings className="settings-icon" />
        </button>
      </div>
      {showSettings && (
        <div className="settings-modal">
          <div className="settings-modal-content">
            <h2 className="settings-title">Settings</h2>
            <p>Configure application settings (coming soon).</p>
            <button className="primary-button" onClick={() => setShowSettings(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
