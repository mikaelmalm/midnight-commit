import { Project, Consultant, Role, Stats, Rank } from '@/types';

const ROLES: Role[] = ['Frontend', 'Backend', 'DevOps', 'Design'];
const RANKS: Rank[] = ['Junior', 'Mid', 'Senior', 'Lead', 'Architect'];

const generateId = () => Math.random().toString(36).substr(2, 9);

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateStats = (level: number, focus?: Role): Stats => {
  const base = level * 10;
  const variance = 5;
  
  return {
    frontend: Math.min(100, Math.max(0, base + randomInt(-variance, variance) + (focus === 'Frontend' ? 10 : 0))),
    backend: Math.min(100, Math.max(0, base + randomInt(-variance, variance) + (focus === 'Backend' ? 10 : 0))),
    devops: Math.min(100, Math.max(0, base + randomInt(-variance, variance) + (focus === 'DevOps' ? 10 : 0))),
    design: Math.min(100, Math.max(0, base + randomInt(-variance, variance) + (focus === 'Design' ? 10 : 0))),
  };
};

const getRankFromLevel = (level: number): Rank => {
  if (level <= 2) return 'Junior';
  if (level <= 4) return 'Mid';
  if (level <= 6) return 'Senior';
  if (level <= 8) return 'Lead';
  return 'Architect';
};

export const generateConsultant = (level: number): Consultant => {
  const role = ROLES[randomInt(0, ROLES.length - 1)];
  const stats = generateStats(level, role);
  
  return {
    id: generateId(),
    name: `Dev ${generateId()}`, // TODO: Better name generation
    role,
    rank: getRankFromLevel(level),
    stats,
    energy: 100,
    maxEnergy: 100,
    level,
    salary: level * 100,
  };
};

export const generateProject = (level: number): Project => {
  const requiredStats = generateStats(level);
  
  // Calculate budget based on difficulty
  const totalStats = Object.values(requiredStats).reduce((a, b) => a + b, 0);
  
  return {
    id: generateId(),
    name: `Project ${generateId()}`, // TODO: Better name generation
    requiredStats,
    budget: totalStats * 15,
    timeLimit: 100, // Ticks
    progress: 0,
  };
};
