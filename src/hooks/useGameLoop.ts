import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';

export const useGameLoop = () => {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const tick = useGameStore((state) => state.tick);

  useEffect(() => {
    console.log("isPlaying", isPlaying);
    if (!isPlaying) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, tick]);
};
