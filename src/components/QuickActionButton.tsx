import React from 'react';
import type { QuickActionButtonProps } from '/src/types';
import '/src/styles/QuickActionButton.css';

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ icon, label }) => (
  <button className="quick-action-button">
    {React.isValidElement(icon) ? icon : <icon className="quick-action-icon" />}
    <span>{label}</span>
  </button>
);

export default QuickActionButton;