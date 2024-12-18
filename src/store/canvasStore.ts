import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CanvasState {
  scale: number;
  position: { x: number; y: number };
  isDragging: boolean;
  setScale: (scale: number) => void;
  setPosition: (position: { x: number; y: number }) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export const useCanvasStore = create<CanvasState>()(
  devtools(
    (set) => ({
      scale: 1,
      position: { x: 0, y: 0 },
      isDragging: false,
      setScale: (scale) => set({ scale }),
      setPosition: (position) => set({ position }),
      setIsDragging: (isDragging) => set({ isDragging }),
    }),
    { name: 'Canvas Store' }
  )
); 