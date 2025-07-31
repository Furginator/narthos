import React from 'react';
import type { QuickActionButtonProps } from '../types';
import '/src/styles/QuickActionButton.css';

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label, onClick, disabled = false }) => {
  return (
    <button
      className="quick-action-button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {icon}
      <span className="button-label">{label}</span>
    </button>
  );
};

export default QuickActionButton;