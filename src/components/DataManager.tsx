import React, { useState } from 'react';
import { FileText, Trash2, RefreshCw } from 'lucide-react';
import '/src/styles/DataManager.css';

const DataManager: React.FC = () => {
  const [collections, setCollections] = useState([
    { id: 1, name: 'users', size: '1.2 MB', records: 1000 },
    { id: 2, name: 'products', size: '3.5 MB', records: 5000 },
  ]);
  const [refreshCount, setRefreshCount] = useState(0);

  const handleDelete = (id: number) => {
    setCollections(prev => prev.filter(collection => collection.id !== id));
    alert(`Deleted collection with ID ${id}`);
  };

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
    alert('Refreshed collections');
  };

  return (
    <div className="data-manager">
      <div className="data-header">
        <h2 className="data-title">Data Management (Refreshed {refreshCount} times)</h2>
        <button
          className="secondary-button"
          onClick={handleRefresh}
          aria-label="Refresh collections"
        >
          <RefreshCw className="refresh-icon" />
        </button>
      </div>
      <div className="collection-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Records</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection.id}>
                <td>{collection.name}</td>
                <td>{collection.size}</td>
                <td>{collection.records}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(collection.id)}
                    aria-label={`Delete ${collection.name}`}
                  >
                    <Trash2 className="delete-icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="empty-state">
        <FileText className="empty-state-icon" />
        <h3 className="empty-state-title">Data Browser</h3>
        <p className="empty-state-text">Browse and manage your database tables and collections.</p>
      </div>
    </div>
  );
};

export default DataManager;
