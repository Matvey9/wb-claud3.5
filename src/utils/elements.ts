import { v4 as uuidv4 } from 'uuid';
import { Point, LineElement, ShapeElement, TextElement, ImageElement } from '../types/canvas';

export const createLine = (
  points: Point[],
  strokeColor: string,
  strokeWidth: number,
  tool: 'pen' | 'highlighter'
): LineElement => ({
  id: uuidv4(),
  type: 'line',
  position: points[0],
  points,
  strokeColor,
  strokeWidth,
  tool,
});

export const createShape = (
  position: Point,
  width: number,
  height: number,
  shapeType: 'rectangle' | 'circle' | 'line' | 'arrow',
  strokeColor: string,
  fillColor: string,
  strokeWidth: number
): ShapeElement => ({
  id: uuidv4(),
  type: 'shape',
  position,
  shapeType,
  width,
  height,
  strokeColor,
  fillColor,
  strokeWidth,
});

export const createText = (
  position: Point,
  text: string,
  fontSize: number,
  fontFamily: string,
  color: string
): TextElement => ({
  id: uuidv4(),
  type: 'text',
  position,
  text,
  fontSize,
  fontFamily,
  color,
  width: 100, // Начальная ширина
  height: fontSize, // Начальная высота
});

export const createImage = (
  position: Point,
  src: string,
  width: number,
  height: number
): ImageElement => ({
  id: uuidv4(),
  type: 'image',
  position,
  src,
  width,
  height,
}); 