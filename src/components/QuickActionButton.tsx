import React, { useState } from 'react';
import type { QuickActionButtonProps } from '../types';
import '/src/styles/QuickActionButton.css';

interface ExtendedQuickActionButtonProps extends QuickActionButtonProps {
  onClick?: () => void;
}

const QuickActionButton: React.FC<ExtendedQuickActionButtonProps> = ({ icon: Icon, label, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onClick) onClick();
    }, 1000);
  };

  return (
    <div className="quick-action-wrapper">
      <button
        className={`quick-action-button ${isLoading ? 'loading' : ''}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleClick}
        aria-label={label}
        disabled={isLoading}
      >
        <Icon className="quick-action-icon" />
        <span>{isLoading ? 'Loading...' : label}</span>
      </button>
      {showTooltip && <div className="tooltip">{label}</div>}
    </div>
  );
};

export default QuickActionButton;
