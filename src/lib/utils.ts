import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Generate positions for text rendered to a canvas
 * Used to create particle target positions that form text
 */
export function getTextPositions(
  text: string,
  fontSize: number = 120,
  maxParticles: number = 2000
): Float32Array {
  if (typeof window === 'undefined') return new Float32Array(maxParticles * 3);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  canvas.width = 1024;
  canvas.height = 256;
  
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${fontSize}px "Space Grotesk", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  
  // Collect white pixel positions
  const whitePixels: [number, number][] = [];
  for (let y = 0; y < canvas.height; y += 2) {
    for (let x = 0; x < canvas.width; x += 2) {
      const i = (y * canvas.width + x) * 4;
      if (pixels[i] > 128) {
        whitePixels.push([x, y]);
      }
    }
  }
  
  // Sample from white pixels to match particle count
  const positions = new Float32Array(maxParticles * 3);
  const scale = 8; // Scale factor for 3D space
  
  for (let i = 0; i < maxParticles; i++) {
    const pixel = whitePixels[Math.floor(Math.random() * whitePixels.length)];
    if (pixel) {
      positions[i * 3] = (pixel[0] - canvas.width / 2) / scale;
      positions[i * 3 + 1] = -(pixel[1] - canvas.height / 2) / scale;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
  }
  
  return positions;
}

/**
 * Lerp utility
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}
