import React, { useState } from 'react';
import '/src/styles/RecentActivity.css';

const RecentActivity: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [activities, setActivities] = useState([
    { action: 'Model created', target: 'text-classifier-v1', time: '2 minutes ago', type: 'success' },
    { action: 'Prediction run', target: 'sentiment-analyzer', time: '5 minutes ago', type: 'info' },
    { action: 'Data uploaded', target: 'training_dataset.csv', time: '10 minutes ago', type: 'info' },
    { action: 'Connection established', target: 'MongoDB Atlas', time: '1 hour ago', type: 'success' }
  ]);

  const filteredActivities = activities.filter(activity => 
    activity.action.toLowerCase().includes(filter.toLowerCase()) ||
    activity.target.toLowerCase().includes(filter.toLowerCase())
  );

  const handleClearActivities = () => {
    setActivities([]);
  };

  return (
    <div className="activity-card">
      <div className="activity-header">
        <h3 className="activity-title">Recent Activity</h3>
        <button className="secondary-button" onClick={handleClearActivities}>
          Clear Activities
        </button>
      </div>
      <div className="activity-filter">
        <label htmlFor="activityFilter" className="form-label">Filter Activities</label>
        <input
          id="activityFilter"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-input"
          placeholder="Search activities"
          aria-label="Filter Activities"
        />
      </div>
      <div>
        {filteredActivities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className={`activity-dot ${activity.type === 'success' ? 'activity-dot-success' : 'activity-dot-info'}`} />
            <div className="activity-content">
              <p className="activity-text">
                <span className="activity-action">{activity.action}</span>{' '}
                <span className="activity-target">{activity.target}</span>
              </p>
              <p className="activity-time">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
