import { Image as KonvaImage } from 'react-konva';
import { ImageElement } from '../../../types/canvas';
import { useEffect, useState } from 'react';

interface ImageProps {
  element: ImageElement;
  isSelected: boolean;
}

export const Image = ({ element, isSelected }: ImageProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = element.src;
    img.onload = () => {
      setImage(img);
    };
  }, [element.src]);

  if (!image) {
    return null;
  }

  return (
    <KonvaImage
      id={element.id}
      image={image}
      x={element.position.x}
      y={element.position.y}
      width={element.width}
      height={element.height}
      shadowColor={isSelected ? '#0096ff' : undefined}
      shadowBlur={isSelected ? 10 : undefined}
      shadowEnabled={isSelected}
      draggable={isSelected}
    />
  );
}; 