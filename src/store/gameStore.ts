import { create } from 'zustand';
import { GameState } from '@/types';

interface GameStore extends GameState {
  tick: () => void;
  setPaused: (paused: boolean) => void;
  addMoney: (amount: number) => void;
  setRevenue: (amount: number) => void;
  reset: () => void;
}

const initialState: GameState = {
  money: 0,
  revenue: 0,
  ticks: 0,
  isPlaying: false,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,
  tick: () =>
    set((state) => ({
      ticks: state.ticks + 1,
      money: state.money + state.revenue,
    })),
  setPaused: (paused) => set({ isPlaying: !paused }),
  addMoney: (amount) => set((state) => ({ money: state.money + amount })),
  setRevenue: (amount) => set({ revenue: amount }),
  reset: () => set(initialState),
}));
