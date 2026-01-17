export const DRAG_TOLERANCE = 8;
export const POP_DURATION_MS = 420;
export const RETURN_DURATION_MS = 260;

export type Point = {
  x: number;
  y: number;
};

export const getDistance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

export const isDrag = (a: Point, b: Point) => getDistance(a, b) > DRAG_TOLERANCE;

export const isPointInRect = (point: Point, rect: DOMRect) =>
  point.x >= rect.left &&
  point.x <= rect.right &&
  point.y >= rect.top &&
  point.y <= rect.bottom;
