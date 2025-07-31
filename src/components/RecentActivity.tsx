import React from 'react';
import type { RecentActivityProps } from '../types';
import '/src/styles/RecentActivity.css';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong in Recent Activity.</div>;
    }
    return this.props.children;
  }
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities = [] }) => {
  return (
    <ErrorBoundary>
      <div className="recent-activity">
        <h3 className="activity-title">Recent Activity</h3>
        <ul className="activity-list">
          {activities.length > 0 ? (
            activities.map((activity: string, index: number) => (
              <li key={index} className="activity-item">{activity}</li>
            ))
          ) : (
            <li className="activity-item">No recent activity</li>
          )}
        </ul>
      </div>
    </ErrorBoundary>
  );
};

export default RecentActivity;