import React, { useState } from 'react';
import { Database, Settings, Moon, Sun, User } from 'lucide-react';
import type { HeaderProps } from '../types';
import ConnectionIndicator from './ConnectionIndicator';
import './styles/Header.css';

const Header: React.FC<HeaderProps> = ({ connectionStatus }) => {
  const [showStatus, setShowStatus] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

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
          className="theme-toggle-button"
          onClick={handleThemeToggle}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
        </button>
        <button
          className="profile-button"
          onClick={() => setShowProfile(!showProfile)}
          aria-label="Toggle user profile"
        >
          <User className="profile-icon" />
        </button>
        {showProfile && (
          <div className="profile-menu">
            <p>User: Admin</p>
            <button className="secondary-button" onClick={() => setShowProfile(false)}>
              Close
            </button>
          </div>
        )}
        <button
          className="settings-button"
          onClick={() => setShowSettings(true)}
          aria-label="Open settings"
        >
          <Settings className="settings-icon" />
        </button>
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
      </div>
    </header>
  );
};

export default Header;
