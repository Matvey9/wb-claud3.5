import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { CanvasElement, CanvasState } from '../types/canvas';
import { History } from '../utils/history';

interface ElementsStore extends CanvasState {
  addElement: (element: CanvasElement) => void;
  updateElement: (element: CanvasElement) => void;
  deleteElements: (ids: string[]) => void;
  setSelectedIds: (ids: string[]) => void;
  clearSelection: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const history = new History<CanvasElement[]>([]);

export const useElementsStore = create<ElementsStore>()(
  devtools(
    (set, get) => ({
      elements: [],
      selectedIds: [],
      canUndo: false,
      canRedo: false,
      addElement: (element) =>
        set((state) => {
          const newElements = [...state.elements, element];
          history.add(newElements);
          return { 
            elements: newElements,
            canUndo: history.canUndo,
            canRedo: history.canRedo,
          };
        }),
      updateElement: (element) =>
        set((state) => {
          const newElements = state.elements.map((el) =>
            el.id === element.id ? element : el
          );
          history.add(newElements);
          return { 
            elements: newElements,
            canUndo: history.canUndo,
            canRedo: history.canRedo,
          };
        }),
      deleteElements: (ids) =>
        set((state) => {
          const newElements = state.elements.filter((el) => !ids.includes(el.id));
          history.add(newElements);
          return {
            elements: newElements,
            selectedIds: state.selectedIds.filter((id) => !ids.includes(id)),
            canUndo: history.canUndo,
            canRedo: history.canRedo,
          };
        }),
      setSelectedIds: (ids) =>
        set({
          selectedIds: ids,
        }),
      clearSelection: () =>
        set({
          selectedIds: [],
        }),
      undo: () => {
        const previousState = history.undo();
        if (previousState) {
          set({ 
            elements: previousState,
            canUndo: history.canUndo,
            canRedo: history.canRedo,
          });
        }
      },
      redo: () => {
        const nextState = history.redo();
        if (nextState) {
          set({ 
            elements: nextState,
            canUndo: history.canUndo,
            canRedo: history.canRedo,
          });
        }
      },
    }),
    { name: 'Elements Store' }
  )
); 