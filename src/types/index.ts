export type ConnectionStatus = 'connected' | 'connecting' | 'disconnected';
export type SystemItemStatus = 'healthy' | 'disabled' | 'disconnected' | 'connecting' | 'pending';

export interface Stats {
  connectedDatabase: string;
  activeModels: number;
  componentsLoaded: number;
  predictionsRun: number;
}

export interface HeaderProps {
  connectionStatus: ConnectionStatus;
}

export interface ConnectionIndicatorProps {
  status: ConnectionStatus;
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stats?: { activeModels: number }; // Add stats prop
}

export interface QuickActionButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}

export interface MainContentProps {
  activeTab: string;
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (status: ConnectionStatus) => void;
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
}

export interface DashboardProps {
  stats: Stats;
  connectionStatus: ConnectionStatus;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

export interface SystemStatusProps {
  connectionStatus: ConnectionStatus;
}

export interface ConnectionManagerProps {
  connectionStatus: ConnectionStatus;
  setConnectionStatus: (status: ConnectionStatus) => void;
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
}

export interface ModelManagerProps {
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
}

export interface ConnectionForm {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
}

export interface DatabaseProvider {
  id: string;
  name: string;
  icon: string;
  defaultPort: string;
}