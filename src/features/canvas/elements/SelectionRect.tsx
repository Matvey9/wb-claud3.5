import { Rect } from 'react-konva';
import { Point } from '../../../types/canvas';

interface SelectionRectProps {
  start: Point;
  end: Point;
}

export const SelectionRect = ({ start, end }: SelectionRectProps) => {
  const topLeft = {
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
  };
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);

  return (
    <Rect
      x={topLeft.x}
      y={topLeft.y}
      width={width}
      height={height}
      stroke="#0096ff"
      strokeWidth={1}
      fill="rgba(0, 150, 255, 0.1)"
      dash={[4, 4]}
    />
  );
}; 