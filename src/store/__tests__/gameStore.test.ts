import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../gameStore';

const INITIAL_MONEY = 1000; // Starting capital for new players

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });

  it('should have initial state', () => {
    const state = useGameStore.getState();
    expect(state.money).toBe(INITIAL_MONEY);
    expect(state.ticks).toBe(0);
    expect(state.isPlaying).toBe(false);
    expect(state.consultants).toEqual([]);
    expect(state.projects).toEqual([]);
    expect(state.desks).toHaveLength(2); // Garage tier starts with 2 desks
  });

  it('should start and stop playing', () => {
    useGameStore.getState().setPaused(false);
    expect(useGameStore.getState().isPlaying).toBe(true);
    
    useGameStore.getState().setPaused(true);
    expect(useGameStore.getState().isPlaying).toBe(false);
  });

  it('should increment money and ticks on tick', () => {
    useGameStore.setState({ revenue: 10 });
    useGameStore.getState().tick();
    
    const state = useGameStore.getState();
    expect(state.ticks).toBe(1);
    expect(state.money).toBe(INITIAL_MONEY + 10);
  });

  it('should add money manually', () => {
    useGameStore.getState().addMoney(100);
    expect(useGameStore.getState().money).toBe(INITIAL_MONEY + 100);
  });

  it('should assign consultant to desk', () => {
    const consultant = { 
      id: 'test-1', 
      name: 'Test Dev', 
      role: 'Frontend' as const,
      rank: 'Junior' as const,
      stats: { frontend: 50, backend: 30, devops: 20, design: 10 },
      energy: 100,
      maxEnergy: 100,
      level: 1,
      salary: 100,
    };
    
    useGameStore.getState().addConsultant(consultant);
    useGameStore.getState().assignConsultantToDesk('test-1', 'desk-1');
    
    const desk = useGameStore.getState().desks.find(d => d.id === 'desk-1');
    expect(desk?.consultantId).toBe('test-1');
  });

  it('should assign project to desk', () => {
    const project = {
      id: 'proj-1',
      name: 'Test Project',
      requiredStats: { frontend: 30, backend: 30, devops: 20, design: 20 },
      budget: 1000,
      timeLimit: 50,
      progress: 0,
    };
    
    useGameStore.getState().addProject(project);
    useGameStore.getState().assignProjectToDesk('proj-1', 'desk-1');
    
    const desk = useGameStore.getState().desks.find(d => d.id === 'desk-1');
    expect(desk?.projectId).toBe('proj-1');
  });
});
