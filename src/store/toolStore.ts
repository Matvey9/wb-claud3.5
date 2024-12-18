import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Tool = 'select' | 'pen' | 'eraser' | 'text' | 'shape' | 'highlighter';
export type Shape = 'rectangle' | 'circle' | 'line' | 'arrow';

interface ToolState {
  currentTool: Tool;
  currentShape: Shape;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  fontSize: number;
  fontFamily: string;
  setCurrentTool: (tool: Tool) => void;
  setCurrentShape: (shape: Shape) => void;
  setStrokeColor: (color: string) => void;
  setFillColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (font: string) => void;
}

export const useToolStore = create<ToolState>()(
  devtools(
    (set) => ({
      currentTool: 'select',
      currentShape: 'rectangle',
      strokeColor: '#000000',
      fillColor: '#ffffff',
      strokeWidth: 2,
      fontSize: 16,
      fontFamily: 'Arial',
      setCurrentTool: (tool) => set({ currentTool: tool }),
      setCurrentShape: (shape) => set({ currentShape: shape }),
      setStrokeColor: (color) => set({ strokeColor: color }),
      setFillColor: (color) => set({ fillColor: color }),
      setStrokeWidth: (width) => set({ strokeWidth: width }),
      setFontSize: (size) => set({ fontSize: size }),
      setFontFamily: (font) => set({ fontFamily: font }),
    }),
    { name: 'Tool Store' }
  )
); 