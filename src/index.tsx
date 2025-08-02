// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import ConnectionManager from './components/ConnectionManager';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<ConnectionManager connectionStatus="disconnected" setConnectionStatus={() => {}} stats={{ connectedDatabase: 'None', activeModels: 0, componentsLoaded: 0, predictionsRun: 0 }} setStats={() => {}} />);