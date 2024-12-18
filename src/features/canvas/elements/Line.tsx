import { Line as KonvaLine } from 'react-konva';
import { LineElement } from '../../../types/canvas';

interface LineProps {
  element: LineElement;
  isSelected: boolean;
}

export const Line = ({ element, isSelected }: LineProps) => {
  return (
    <KonvaLine
      id={element.id}
      points={element.points.flatMap((point) => [point.x, point.y])}
      stroke={element.strokeColor}
      strokeWidth={element.strokeWidth}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation={
        element.tool === 'highlighter' ? 'multiply' : 'source-over'
      }
      opacity={element.tool === 'highlighter' ? 0.4 : 1}
      shadowColor={isSelected ? '#0096ff' : undefined}
      shadowBlur={isSelected ? 10 : undefined}
      shadowEnabled={isSelected}
      draggable={isSelected}
    />
  );
}; 