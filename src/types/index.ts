export interface ConnectionManagerProps {
  connectionStatus: string;
  setConnectionStatus: (status: string) => void;
  stats: { [key: string]: number };
  setStats: (stats: { [key: string]: number }) => void;
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

export interface Stats {
  connectedDatabase: string;
  activeModels: number;
  componentsLoaded: number;
  predictionsRun: number;
}