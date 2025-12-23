import { describe, it, expect } from 'vitest';
import { generateConsultant, generateProject, generateStats } from '../generator';

describe('Generator', () => {
  it('should generate stats with variance', () => {
    const stats = generateStats(1);
    expect(stats.frontend).toBeGreaterThanOrEqual(10 - 5);
    expect(stats.frontend).toBeLessThanOrEqual(10 + 5 + 10); // +10 if focused
  });

  it('should generate a consultant with valid properties', () => {
    const consultant = generateConsultant(1);
    expect(consultant).toHaveProperty('id');
    expect(consultant).toHaveProperty('name');
    expect(consultant).toHaveProperty('role');
    expect(consultant.level).toBe(1);
    expect(consultant.energy).toBe(100);
  });

  it('should generate a project with valid properties', () => {
    const project = generateProject(1);
    expect(project).toHaveProperty('id');
    expect(project).toHaveProperty('budget');
    expect(project.budget).toBeGreaterThan(0);
  });
});
