// src/types/index.ts
export interface RecentActivityProps {
  activities: string[];
}

export interface SystemStatusProps {
  connectionStatus?: string;
}

export interface HeaderProps {
  connectionStatus: string;
}

export interface DashboardProps {
  stats: {
    connectedDatabase: number;
    activeModels: number;
    componentsLoaded: number;
    predictionsRun: number;
  };
  connectionStatus: string;
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

export interface MainContentProps {
  activeTab: string;
  connectionStatus: string;
  setConnectionStatus: (status: string) => void;
  stats: {
    connectedDatabase: number;
    activeModels: number;
    componentsLoaded: number;
    predictionsRun: number;
  };
  setStats: (stats: any) => void;
}