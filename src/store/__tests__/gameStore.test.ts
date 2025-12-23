import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from '../gameStore';

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.getState().reset();
  });

  it('should have initial state', () => {
    const state = useGameStore.getState();
    expect(state.money).toBe(0);
    expect(state.ticks).toBe(0);
    expect(state.isPlaying).toBe(false);
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
    expect(state.money).toBe(10);
  });

  it('should add money manually', () => {
    useGameStore.getState().addMoney(100);
    expect(useGameStore.getState().money).toBe(100);
  });
});
