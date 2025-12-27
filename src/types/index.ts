export type Role = 'Frontend' | 'Backend' | 'DevOps' | 'Design';
export type Rank = 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Architect';

export interface Stats {
  frontend: number;
  backend: number;
  devops: number;
  design: number;
}

export interface Consultant {
  id: string;
  name: string;
  role: Role;
  rank: Rank;
  stats: Stats;
  energy: number; // 0-100
  maxEnergy: number;
  level: number;
  salary: number; // per tick cost
}

export interface Desk {
  id: string;
  consultantId: string | null;
  projectId: string | null;
}

export interface Project {
  id: string;
  name: string;
  requiredStats: Stats;
  budget: number; // Total reward
  timeLimit: number; // Ticks to complete
  progress: number; // 0-100
}

export interface GameState {
  money: number;
  revenue: number;
  ticks: number;
  isPlaying: boolean;
}
