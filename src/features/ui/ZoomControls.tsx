import { useCanvasStore } from '../../store/canvasStore';
import styles from './ZoomControls.module.css';

export const ZoomControls = () => {
  const { scale, setScale } = useCanvasStore();

  const handleZoomIn = () => {
    setScale(Math.min(scale * 1.1, 5));
  };

  const handleZoomOut = () => {
    setScale(Math.max(scale / 1.1, 0.1));
  };

  return (
    <div className={styles.zoomControls}>
      <button onClick={handleZoomOut} className={styles.zoomButton}>
        -
      </button>
      <span className={styles.zoomLevel}>{Math.round(scale * 100)}%</span>
      <button onClick={handleZoomIn} className={styles.zoomButton}>
        +
      </button>
    </div>
  );
}; 