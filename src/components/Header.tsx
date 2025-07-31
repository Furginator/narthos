import React, { useState } from 'react';
import { Settings, Moon, Sun, User, CheckCircle, AlertCircle } from 'lucide-react';
import type { HeaderProps } from '../types';
import '/src/styles/Header.css';

const Header: React.FC<HeaderProps> = ({ connectionStatus }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const userName = "Admin";

  const handleThemeToggle = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'connected': return 'green';
      case 'connecting': return 'yellow';
      default: return 'red';
    }
  };

  const stats = {
    connection: connectionStatus,
    cpu: 'Online', // Placeholder
    memory: 'Online', // Placeholder
    storage: 'Online', // Placeholder
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/narthos-logo.png" alt="Narthos Logo" className="logo-icon" width="120" height="120" />
      </div>
      <div className="status-switchboard">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="status-box">
            <span className="status-label">{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
            {value.toLowerCase() === 'connected' || value.toLowerCase() === 'online' ? (
              <CheckCircle className="status-icon" color={getStatusColor(value)} />
            ) : (
              <AlertCircle className="status-icon" color={getStatusColor(value)} />
            )}
            <span className="status-text">{value}</span>
          </div>
        ))}
      </div>
      <div className="header-right">
        <button className="theme-toggle-button" onClick={handleThemeToggle} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
          {isDarkMode ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
        </button>
        <button className="profile-button" onClick={() => setShowProfile(!showProfile)} aria-label="Toggle user profile">
          <User className="profile-icon" />
        </button>
        {showProfile && (
          <div className="profile-menu">
            <p>User: {userName}</p>
            <button className="secondary-button" onClick={() => setShowProfile(false)}>Close</button>
          </div>
        )}
        <button className="settings-button" onClick={() => setShowSettings(true)} aria-label="Open settings">
          <Settings className="settings-icon" />
        </button>
        {showSettings && (
          <div className="settings-modal">
            <div className="settings-modal-content">
              <h2 className="settings-title">Settings</h2>
              <p>Configure application settings (coming soon).</p>
              <button className="primary-button" onClick={() => setShowSettings(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;