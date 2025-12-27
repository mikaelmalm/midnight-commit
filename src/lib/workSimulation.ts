import { Consultant, Project, Stats } from '@/types';

/**
 * Calculate how well a consultant's stats match a project's requirements
 * Returns a score from 0-100
 */
export const calculateMatchScore = (consultant: Consultant, project: Project): number => {
  const { stats } = consultant;
  const { requiredStats } = project;
  
  // Calculate difference for each stat
  const diffs = {
    frontend: Math.max(0, requiredStats.frontend - stats.frontend),
    backend: Math.max(0, requiredStats.backend - stats.backend),
    devops: Math.max(0, requiredStats.devops - stats.devops),
    design: Math.max(0, requiredStats.design - stats.design),
  };
  
  // Total deficit
  const totalDeficit = Object.values(diffs).reduce((a, b) => a + b, 0);
  
  // Max possible deficit (if all stats were 0 vs 100 requirement)
  const maxDeficit = 400;
  
  // Convert to 0-100 score (higher is better)
  const score = Math.max(0, 100 - (totalDeficit / maxDeficit) * 100);
  
  return Math.round(score);
};

/**
 * Calculate progress increment per tick based on match score
 * Better matches = faster progress
 */
export const calculateProgressPerTick = (matchScore: number): number => {
  // Base progress of 1-3% per tick depending on match
  const baseProgress = 1;
  const bonusProgress = (matchScore / 100) * 2;
  return baseProgress + bonusProgress;
};

/**
 * Calculate revenue earned per tick
 * Based on project budget and match score
 */
export const calculateRevenuePerTick = (project: Project, matchScore: number): number => {
  // Revenue scales with match score
  // Perfect match = full budget / timeLimit per tick
  // Poor match = reduced revenue
  const baseRevenue = project.budget / project.timeLimit;
  const multiplier = 0.5 + (matchScore / 100) * 0.5; // 50%-100% of base
  return Math.round(baseRevenue * multiplier);
};

/**
 * Calculate energy decay per tick while working
 * Poor matches are more tiring
 */
export const calculateEnergyDecay = (matchScore: number): number => {
  // Better matches = less tiring
  // Poor match (0) = 3 energy/tick
  // Perfect match (100) = 1 energy/tick
  const baseDecay = 3;
  const reduction = (matchScore / 100) * 2;
  return Math.max(1, baseDecay - reduction);
};
