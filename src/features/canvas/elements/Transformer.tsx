import { Transformer as KonvaTransformer } from 'react-konva';
import { useRef, useEffect } from 'react';
import Konva from 'konva';

interface TransformerProps {
  selectedIds: string[];
}

export const Transformer = ({ selectedIds }: TransformerProps) => {
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (!transformerRef.current) return;

    const stage = transformerRef.current.getStage();
    if (!stage) return;

    const selectedNodes = selectedIds
      .map((id) => stage.findOne(`#${id}`))
      .filter(Boolean);

    transformerRef.current.nodes(selectedNodes);
    transformerRef.current.getLayer()?.batchDraw();
  }, [selectedIds]);

  return (
    <KonvaTransformer
      ref={transformerRef}
      boundBoxFunc={(oldBox, newBox) => {
        // Ограничение минимального размера
        const minSize = 5;
        if (Math.abs(newBox.width) < minSize || Math.abs(newBox.height) < minSize) {
          return oldBox;
        }
        return newBox;
      }}
      rotateEnabled={false}
      flipEnabled={false}
      borderStroke="#0096ff"
      anchorFill="#fff"
      anchorStroke="#0096ff"
      anchorSize={8}
      keepRatio={false}
    />
  );
}; 