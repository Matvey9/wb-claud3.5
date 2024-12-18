import { Stage, Layer } from 'react-konva';
import { useCanvasStore } from '../../store/canvasStore';
import { useToolStore } from '../../store/toolStore';
import { useElementsStore } from '../../store/elementsStore';
import { useCallback, useEffect, useState } from 'react';
import { Line } from './elements/Line';
import { Shape } from './elements/Shape';
import { Text } from './elements/Text';
import { Image } from './elements/Image';
import { SelectionRect } from './elements/SelectionRect';
import { Transformer } from './elements/Transformer';
import { Point } from '../../types/canvas';
import { createLine, createShape, createText } from '../../utils/elements';
import styles from './Canvas.module.css';

export const Canvas = () => {
  const { scale, position, isDragging, setScale, setPosition, setIsDragging } = useCanvasStore();
  const { currentTool, currentShape, strokeColor, fillColor, strokeWidth, fontSize, fontFamily } = useToolStore();
  const { elements, selectedIds, addElement, updateElement, setSelectedIds, clearSelection, deleteElements, undo, redo } = useElementsStore();
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectionStart, setSelectionStart] = useState<Point | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Point | null>(null);
  const [shapeStart, setShapeStart] = useState<Point | null>(null);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const stage = e.target as HTMLDivElement;
    const scaleBy = 1.1;
    const oldScale = scale;

    const pointer = stage.getBoundingClientRect();
    const mousePointTo = {
      x: (e.clientX - pointer.left - position.x) / oldScale,
      y: (e.clientY - pointer.top - position.y) / oldScale,
    };

    const newScale = e.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    const clampedScale = Math.min(Math.max(0.1, newScale), 5);

    const newPos = {
      x: e.clientX - pointer.left - mousePointTo.x * clampedScale,
      y: e.clientY - pointer.top - mousePointTo.y * clampedScale,
    };

    setScale(clampedScale);
    setPosition(newPos);
  }, [scale, position, setScale, setPosition]);

  const handleMouseDown = useCallback((e: any) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const scaledPoint = {
      x: (point.x - position.x) / scale,
      y: (point.y - position.y) / scale,
    };

    if (e.evt.button === 2 || (e.evt.button === 0 && e.evt.ctrlKey)) {
      setIsDragging(true);
      return;
    }

    if (currentTool === 'select') {
      if (e.target === stage) {
        clearSelection();
        setSelectionStart(scaledPoint);
        setSelectionEnd(scaledPoint);
      }
      return;
    }

    if (currentTool === 'pen' || currentTool === 'highlighter') {
      setIsDrawing(true);
      setPoints([scaledPoint]);
      const line = createLine([scaledPoint], strokeColor, strokeWidth, currentTool);
      addElement(line);
    } else if (currentTool === 'shape') {
      setShapeStart(scaledPoint);
      const shape = createShape(
        scaledPoint,
        0,
        0,
        currentShape,
        strokeColor,
        fillColor,
        strokeWidth
      );
      addElement(shape);
    } else if (currentTool === 'text') {
      const text = createText(scaledPoint, 'Двойной клик для редактирования', fontSize, fontFamily, strokeColor);
      addElement(text);
    } else if (currentTool === 'eraser') {
      const hitElement = stage.getIntersection(point);
      if (hitElement) {
        const elementId = hitElement.attrs.id;
        if (elementId) {
          deleteElements([elementId]);
        }
      }
    }
  }, [currentTool, currentShape, strokeColor, fillColor, strokeWidth, fontSize, fontFamily, scale, position, addElement, setIsDragging, clearSelection, deleteElements]);

  const handleMouseMove = useCallback((e: any) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const scaledPoint = {
      x: (point.x - position.x) / scale,
      y: (point.y - position.y) / scale,
    };

    if (isDragging) {
      const newPosition = {
        x: position.x + e.evt.movementX,
        y: position.y + e.evt.movementY,
      };
      setPosition(newPosition);
      return;
    }

    if (currentTool === 'select' && selectionStart) {
      setSelectionEnd(scaledPoint);
      return;
    }

    if (currentTool === 'eraser') {
      const hitElement = stage.getIntersection(point);
      if (hitElement) {
        const elementId = hitElement.attrs.id;
        if (elementId) {
          deleteElements([elementId]);
        }
      }
      return;
    }

    if (!isDrawing && !shapeStart) return;

    if (currentTool === 'pen' || currentTool === 'highlighter') {
      const newPoints = [...points, scaledPoint];
      setPoints(newPoints);
      const lastElement = elements[elements.length - 1];
      if (lastElement && (lastElement.type === 'line')) {
        updateElement({
          ...lastElement,
          points: newPoints,
        });
      }
    } else if (currentTool === 'shape' && shapeStart) {
      const width = scaledPoint.x - shapeStart.x;
      const height = scaledPoint.y - shapeStart.y;
      const lastElement = elements[elements.length - 1];
      if (lastElement && lastElement.type === 'shape') {
        updateElement({
          ...lastElement,
          width: Math.abs(width),
          height: Math.abs(height),
          position: {
            x: width < 0 ? scaledPoint.x : shapeStart.x,
            y: height < 0 ? scaledPoint.y : shapeStart.y,
          },
        });
      }
    }
  }, [isDragging, isDrawing, points, elements, currentTool, scale, position, selectionStart, shapeStart, updateElement, setPosition, deleteElements]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsDrawing(false);
    setPoints([]);
    setShapeStart(null);

    if (selectionStart && selectionEnd) {
      const topLeft = {
        x: Math.min(selectionStart.x, selectionEnd.x),
        y: Math.min(selectionStart.y, selectionEnd.y),
      };
      const bottomRight = {
        x: Math.max(selectionStart.x, selectionEnd.x),
        y: Math.max(selectionStart.y, selectionEnd.y),
      };

      const selectedElements = elements.filter((element) => {
        const { position, type, width = 0, height = 0 } = element;
        const elementRight = position.x + width;
        const elementBottom = position.y + height;

        // Для линий проверяем все точки
        if (type === 'line') {
          const lineElement = element as LineElement;
          return lineElement.points.some(point => 
            point.x >= topLeft.x && point.x <= bottomRight.x &&
            point.y >= topLeft.y && point.y <= bottomRight.y
          );
        }

        // Для остальных элементов проверяем пересечение прямоугольников
        return !(
          elementRight < topLeft.x ||
          position.x > bottomRight.x ||
          elementBottom < topLeft.y ||
          position.y > bottomRight.y
        );
      });

      setSelectedIds(selectedElements.map((el) => el.id));
    }

    setSelectionStart(null);
    setSelectionEnd(null);
  }, [setIsDragging, selectionStart, selectionEnd, elements, setSelectedIds]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsDragging(true);
      } else if (e.code === 'Delete' && selectedIds.length > 0) {
        deleteElements(selectedIds);
      } else if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
          e.preventDefault();
        } else if (e.key === 'y') {
          redo();
          e.preventDefault();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsDragging(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [setIsDragging, selectedIds, deleteElements, undo, redo]);

  useEffect(() => {
    clearSelection();
  }, [currentTool, clearSelection]);

  return (
    <div
      className={styles.canvasContainer}
      onWheel={handleWheel}
      onContextMenu={(e) => e.preventDefault()}
      data-tool={currentTool}
      data-dragging={isDragging}
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Layer>
          {elements.map((element) => {
            const isSelected = selectedIds.includes(element.id);

            switch (element.type) {
              case 'line':
                return <Line key={element.id} element={element} isSelected={isSelected} />;
              case 'shape':
                return <Shape key={element.id} element={element} isSelected={isSelected} />;
              case 'text':
                return (
                  <Text
                    key={element.id}
                    element={element}
                    isSelected={isSelected}
                    onTextChange={(text) => {
                      updateElement({
                        ...element,
                        text,
                      });
                    }}
                  />
                );
              case 'image':
                return <Image key={element.id} element={element} isSelected={isSelected} />;
              default:
                return null;
            }
          })}
          {selectionStart && selectionEnd && (
            <SelectionRect start={selectionStart} end={selectionEnd} />
          )}
          {selectedIds.length > 0 && <Transformer selectedIds={selectedIds} />}
        </Layer>
      </Stage>
    </div>
  );
}; 