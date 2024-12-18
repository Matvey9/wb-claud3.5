export interface Point {
  x: number;
  y: number;
}

export interface BaseElement {
  id: string;
  type: 'line' | 'shape' | 'text' | 'image';
  position: Point;
}

export interface LineElement extends BaseElement {
  type: 'line';
  points: Point[];
  strokeColor: string;
  strokeWidth: number;
  tool: 'pen' | 'highlighter';
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'line' | 'arrow';
  width: number;
  height: number;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
}

export interface TextElement extends BaseElement {
  type: 'text';
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  width: number;
  height: number;
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  width: number;
  height: number;
}

export type CanvasElement = LineElement | ShapeElement | TextElement | ImageElement;

export interface CanvasState {
  elements: CanvasElement[];
  selectedIds: string[];
} 