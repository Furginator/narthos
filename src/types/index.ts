// src/types/index.ts
export interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ExtendedQuickActionButtonProps extends QuickActionButtonProps {
  // Add any additional props if needed
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface RecentActivityProps {
  activities: string[];
}

export interface SystemStatusProps {
  connectionStatus: string;
}

export interface HeaderProps {
  stats: { [key: string]: string };
  setStats: (stats: { [key: string]: string }) => void;
}

export interface DashboardProps {
  stats: { [key: string]: number };
  setStats: (stats: { [key: string]: number }) => void;
  connectionStatus: string;
}

export interface MainContentProps {
  activeTab: string;
  connectionStatus: string;
  setConnectionStatus: (status: string) => void;
  stats: { [key: string]: string };
  setStats: (stats: { [key: string]: string }) => void;
}