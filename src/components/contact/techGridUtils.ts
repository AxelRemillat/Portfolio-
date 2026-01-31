export type GridPoint = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
};

export const MAX_COLS = 70;
export const MAX_ROWS = 40;

export const getGridSize = (width: number, height: number) => {
  const cols = Math.min(MAX_COLS, Math.max(18, Math.floor(width / 22)));
  const rows = Math.min(MAX_ROWS, Math.max(12, Math.floor(height / 22)));
  return { cols, rows };
};

export const buildGrid = (
  points: GridPoint[],
  width: number,
  height: number,
  cols: number,
  rows: number
) => {
  const stepX = width / Math.max(cols - 1, 1);
  const stepY = height / Math.max(rows - 1, 1);
  points.length = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = col * stepX;
      const y = row * stepY;
      points.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
    }
  }
};

export const drawGrid = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  points: GridPoint[],
  cols: number,
  rows: number
) => {
  context.clearRect(0, 0, width, height);
  context.strokeStyle = "rgba(11, 18, 32, 0.12)";
  context.lineWidth = 1;

  for (let row = 0; row < rows; row += 1) {
    context.beginPath();
    for (let col = 0; col < cols; col += 1) {
      const point = points[row * cols + col];
      if (!point) {
        continue;
      }
      if (col === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }
    context.stroke();
  }

  for (let col = 0; col < cols; col += 1) {
    context.beginPath();
    for (let row = 0; row < rows; row += 1) {
      const point = points[row * cols + col];
      if (!point) {
        continue;
      }
      if (row === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }
    context.stroke();
  }

  context.fillStyle = "rgba(11, 18, 32, 0.18)";
  for (const point of points) {
    context.beginPath();
    context.arc(point.x, point.y, 1, 0, Math.PI * 2);
    context.fill();
  }
};
