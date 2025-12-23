import { get, set } from 'idb-keyval';
import { useGameStore } from '@/store/gameStore';

const DB_KEY = 'consultancy-tycoon-save';

export const saveGame = async () => {
  const state = useGameStore.getState();
  // We only save the data parts, not functions
  const data = {
    money: state.money,
    revenue: state.revenue,
    ticks: state.ticks,
    isPlaying: false, // Always pause on load
  };
  await set(DB_KEY, data);
  console.log('Game Saved');
};

export const loadGame = async () => {
  const data = await get(DB_KEY);
  if (data) {
    useGameStore.setState(data);
    console.log('Game Loaded');
    return true;
  }
  return false;
};

// Auto-save every 30 seconds
export const initAutoSave = () => {
  const interval = setInterval(() => {
    saveGame();
  }, 30000);
  return () => clearInterval(interval);
};
