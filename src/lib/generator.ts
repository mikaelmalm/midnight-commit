import { Project, Consultant, Role, Stats } from '@/types';

const ROLES: Role[] = ['Frontend', 'Backend', 'DevOps', 'Design'];

const generateId = () => Math.random().toString(36).substr(2, 9);

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateStats = (level: number, focus?: Role): Stats => {
  const base = level * 10;
  const variance = 5;
  
  return {
    frontend: base + randomInt(-variance, variance) + (focus === 'Frontend' ? 10 : 0),
    backend: base + randomInt(-variance, variance) + (focus === 'Backend' ? 10 : 0),
    devops: base + randomInt(-variance, variance) + (focus === 'DevOps' ? 10 : 0),
    design: base + randomInt(-variance, variance) + (focus === 'Design' ? 10 : 0),
  };
};

export const generateConsultant = (level: number): Consultant => {
  const role = ROLES[randomInt(0, ROLES.length - 1)];
  const stats = generateStats(level, role);
  
  return {
    id: generateId(),
    name: `Dev ${generateId()}`, // TODO: Better name generation
    role,
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
