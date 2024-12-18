import { useToolStore } from '../../store/toolStore';
import styles from './Toolbar.module.css';

export const Toolbar = () => {
  const { 
    currentTool, 
    currentShape,
    strokeColor,
    fillColor,
    strokeWidth,
    setCurrentTool,
    setCurrentShape,
    setStrokeColor,
    setFillColor,
    setStrokeWidth 
  } = useToolStore();

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolGroup}>
        <button
          className={`${styles.toolButton} ${currentTool === 'select' ? styles.active : ''}`}
          onClick={() => setCurrentTool('select')}
        >
          Выделение
        </button>
        <button
          className={`${styles.toolButton} ${currentTool === 'pen' ? styles.active : ''}`}
          onClick={() => setCurrentTool('pen')}
        >
          Карандаш
        </button>
        <button
          className={`${styles.toolButton} ${currentTool === 'eraser' ? styles.active : ''}`}
          onClick={() => setCurrentTool('eraser')}
        >
          Ластик
        </button>
        <button
          className={`${styles.toolButton} ${currentTool === 'text' ? styles.active : ''}`}
          onClick={() => setCurrentTool('text')}
        >
          Текст
        </button>
        <button
          className={`${styles.toolButton} ${currentTool === 'shape' ? styles.active : ''}`}
          onClick={() => setCurrentTool('shape')}
        >
          Фигуры
        </button>
        <button
          className={`${styles.toolButton} ${currentTool === 'highlighter' ? styles.active : ''}`}
          onClick={() => setCurrentTool('highlighter')}
        >
          Маркер
        </button>
      </div>

      {currentTool === 'shape' && (
        <div className={styles.shapeGroup}>
          <button
            className={`${styles.shapeButton} ${currentShape === 'rectangle' ? styles.active : ''}`}
            onClick={() => setCurrentShape('rectangle')}
          >
            Прямоугольник
          </button>
          <button
            className={`${styles.shapeButton} ${currentShape === 'circle' ? styles.active : ''}`}
            onClick={() => setCurrentShape('circle')}
          >
            Круг
          </button>
          <button
            className={`${styles.shapeButton} ${currentShape === 'line' ? styles.active : ''}`}
            onClick={() => setCurrentShape('line')}
          >
            Линия
          </button>
          <button
            className={`${styles.shapeButton} ${currentShape === 'arrow' ? styles.active : ''}`}
            onClick={() => setCurrentShape('arrow')}
          >
            Стрелка
          </button>
        </div>
      )}

      <div className={styles.propertyGroup}>
        <div className={styles.colorPicker}>
          <label>Цвет линии:</label>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </div>
        <div className={styles.colorPicker}>
          <label>Цвет заливки:</label>
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
        </div>
        <div className={styles.strokeWidth}>
          <label>Толщина линии:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}; 