import React, { useState } from 'react';
import { Brain, Plus, Trash2 } from 'lucide-react';
import type { ModelManagerProps } from '../types';
import '/src/styles/ModelManager.css';

const ModelManager: React.FC<ModelManagerProps> = ({ stats, setStats }) => {
  const [modelName, setModelName] = useState('');
  const [models, setModels] = useState<string[]>([]);

  const handleCreateModel = () => {
    if (modelName.trim()) {
      setModels(prev => [...prev, modelName]);
      setStats(prev => ({ ...prev, activeModels: prev.activeModels + 1 }));
      alert(`Model ${modelName} created!`);
      setModelName('');
    }
  };

  const handleDeleteModel = (model: string) => {
    setModels(prev => prev.filter(m => m !== model));
    setStats(prev => ({ ...prev, activeModels: prev.activeModels - 1 }));
    alert(`Model ${model} deleted!`);
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
      <div className="model-list">
        <h3 className="model-list-title">Created Models</h3>
        {models.length > 0 ? (
          <ul className="model-list-items">
            {models.map((model, index) => (
              <li key={index} className="model-list-item">
                <span>{model}</span>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteModel(model)}
                  aria-label={`Delete ${model}`}
                >
                  <Trash2 className="delete-icon" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <Brain className="empty-state-icon" />
            <h3 className="empty-state-title">No Models Yet</h3>
            <p className="empty-state-text">Create your first AI model to get started with Narthos.</p>
            <button className="primary-button" onClick={handleCreateModel}>Create Your First Model</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelManager;
