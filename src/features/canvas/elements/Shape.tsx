import { Rect, Circle, Line, Arrow } from 'react-konva';
import { ShapeElement } from '../../../types/canvas';

interface ShapeProps {
  element: ShapeElement;
  isSelected: boolean;
}

export const Shape = ({ element, isSelected }: ShapeProps) => {
  const sharedProps = {
    id: element.id,
    x: element.position.x,
    y: element.position.y,
    stroke: element.strokeColor,
    fill: element.fillColor,
    strokeWidth: element.strokeWidth,
    shadowColor: isSelected ? '#0096ff' : undefined,
    shadowBlur: isSelected ? 10 : undefined,
    shadowEnabled: isSelected,
    draggable: isSelected,
  };

  switch (element.shapeType) {
    case 'rectangle':
      return (
        <Rect
          {...sharedProps}
          width={element.width}
          height={element.height}
        />
      );
    case 'circle':
      return (
        <Circle
          {...sharedProps}
          radius={Math.min(element.width, element.height) / 2}
        />
      );
    case 'line':
      return (
        <Line
          {...sharedProps}
          points={[0, 0, element.width, element.height]}
        />
      );
    case 'arrow':
      return (
        <Arrow
          {...sharedProps}
          points={[0, 0, element.width, element.height]}
          pointerLength={20}
          pointerWidth={20}
        />
      );
    default:
      return null;
  }
}; 