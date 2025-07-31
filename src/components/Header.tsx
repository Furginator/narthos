import React, { useState, useEffect } from 'react';
import { Settings, Moon, Sun, User, CheckCircle, AlertCircle } from 'lucide-react';
import type { HeaderProps } from '../types';
import '/src/styles/Header.css';

const Header: React.FC<HeaderProps> = ({ stats, setStats }) => {
  useEffect(() => {
    fetch('/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Stats fetch error:', err));
  }, [setStats]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'connected': case 'online': return 'green';
      case 'connecting': return 'yellow';
      default: return 'red';
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <img src="/narthos-logo.png" alt="Narthos Logo" className="logo-icon" />
        </div>
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
        <button className="theme-toggle-button" onClick={() => {
          const isDarkMode = document.documentElement.classList.toggle('dark');
          document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        }} aria-label={document.documentElement.classList.contains('dark') ? 'Switch to light mode' : 'Switch to dark mode'}>
          {document.documentElement.classList.contains('dark') ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
        </button>
        {/* ... rest of component ... */}
      </div>
    </header>
  );
};

export default Header;