import React from 'react';
import type { QuickActionButtonProps } from '/src/types';
import '/src/styles/QuickActionButton.css';

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label }) => (
  <button className="quick-action-button">
    {React.isValidElement(icon) ? (
      icon
    ) : (
      <span className="quick-action-icon">{icon}</span>
    )}
    <span>{label}</span>
  </button>
);

export default QuickActionButton;