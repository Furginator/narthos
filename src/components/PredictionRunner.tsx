import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import './styles/PredictionRunner.css';

const PredictionRunner: React.FC = () => {
  const [modelName, setModelName] = useState('');
  const [inputData, setInputData] = useState('');

  const handleRunPrediction = () => {
    if (modelName.trim() && inputData.trim()) {
      alert(`Running prediction with model ${modelName} on input: ${inputData}`);
      setInputData('');
    }
  };

  return (
    <div className="prediction-runner">
      <h2 className="prediction-title">Predictions</h2>
      <div className="prediction-form">
        <div>
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
        <div>
          <label htmlFor="inputData" className="form-label">Input Data</label>
          <input
            id="inputData"
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="form-input"
            placeholder="Enter input data"
            aria-label="Input Data"
          />
        </div>
        <button className="primary-button" onClick={handleRunPrediction}>Run Prediction</button>
      </div>
      <div className="empty-state">
        <Zap className="empty-state-icon" />
        <h3 className="empty-state-title">Run Predictions</h3>
        <p className="empty-state-text">Execute AI predictions on your data using trained models.</p>
      </div>
    </div>
  );
};

export default PredictionRunner;
