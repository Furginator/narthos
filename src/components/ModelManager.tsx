import React, { useState } from 'react';
import { Brain, Plus } from 'lucide-react';
import type { ModelManagerProps } from '../types';
import './styles/ModelManager.css';

const ModelManager: React.FC<ModelManagerProps> = ({ stats, setStats }) => {
  const [modelName, setModelName] = useState('');
  const handleCreateModel = () => {
    if (modelName.trim()) {
      setStats(prev => ({ ...prev, activeModels: prev.activeModels + 1 }));
      alert(`Model ${modelName} created!`);
      setModelName('');
    }
  };

  return (
    <div className="model-manager">
      <div className="model-header">
        <h2 className="model-title">Model Management</h2>
        <button className="primary-button create-model-button" onClick={handleCreateModel}>
          <Plus className="button-icon" />
          <span>Create Model</span>
        </button>
      </div>
      <div className="model-form">
        <label htmlFor="modelName" className="form-label">Model Name</label>
        <input
          id="modelName"
          type="text"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          className="form-input"
          placeholder="Enter model name"
          aria-label="Model Name"
        />
      </div>
      <div className="empty-state">
        <Brain className="empty-state-icon" />
        <h3 className="empty-state-title">No Models Yet</h3>
        <p className="empty-state-text">Create your first AI model to get started with SuperDuperDB.</p>
        <button className="primary-button" onClick={handleCreateModel}>Create Your First Model</button>
      </div>
    </div>
  );
};

export default ModelManager;
