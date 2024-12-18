import { Text as KonvaText } from 'react-konva';
import { TextElement } from '../../../types/canvas';

interface TextProps {
  element: TextElement;
  isSelected: boolean;
  onTextChange?: (text: string) => void;
}

export const Text = ({ element, isSelected, onTextChange }: TextProps) => {
  return (
    <KonvaText
      id={element.id}
      x={element.position.x}
      y={element.position.y}
      text={element.text}
      fontSize={element.fontSize}
      fontFamily={element.fontFamily}
      fill={element.color}
      width={element.width}
      height={element.height}
      shadowColor={isSelected ? '#0096ff' : undefined}
      shadowBlur={isSelected ? 10 : undefined}
      shadowEnabled={isSelected}
      draggable={isSelected}
      onDblClick={() => {
        const input = document.createElement('input');
        input.value = element.text;
        input.style.position = 'absolute';
        input.style.left = `${element.position.x}px`;
        input.style.top = `${element.position.y}px`;
        input.style.fontSize = `${element.fontSize}px`;
        input.style.fontFamily = element.fontFamily;
        input.style.color = element.color;
        input.style.border = 'none';
        input.style.padding = '0';
        input.style.margin = '0';
        input.style.background = 'none';
        input.style.outline = 'none';
        
        document.body.appendChild(input);
        input.focus();
        input.select();

        input.addEventListener('blur', () => {
          onTextChange?.(input.value);
          document.body.removeChild(input);
        });

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            input.blur();
          }
        });
      }}
    />
  );
}; 