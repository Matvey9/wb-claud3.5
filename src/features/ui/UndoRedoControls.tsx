import { useElementsStore } from '../../store/elementsStore';
import styles from './UndoRedoControls.module.css';

export const UndoRedoControls = () => {
  const { undo, redo, canUndo, canRedo } = useElementsStore();

  return (
    <div className={styles.undoRedoControls}>
      <button
        className={styles.controlButton}
        onClick={undo}
        disabled={!canUndo}
        title="Отменить (Ctrl+Z)"
      >
        ↩
      </button>
      <button
        className={styles.controlButton}
        onClick={redo}
        disabled={!canRedo}
        title="Повторить (Ctrl+Y)"
      >
        ↪
      </button>
    </div>
  );
}; 