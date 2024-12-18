import { Canvas } from './features/canvas/Canvas';
import { Toolbar } from './features/tools/Toolbar';
import { ZoomControls } from './features/ui/ZoomControls';
import { UndoRedoControls } from './features/ui/UndoRedoControls';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Canvas />
      <Toolbar />
      <ZoomControls />
      <UndoRedoControls />
    </div>
  );
}

export default App;
