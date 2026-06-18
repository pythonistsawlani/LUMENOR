// Vertex shader for particle morphing system
// Morphs between random chaos positions and organized target positions

attribute vec3 aTarget;
attribute float aSize;
attribute float aAlpha;
attribute float aSpeed;

uniform float uProgress;
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

varying float vAlpha;
varying float vProgress;

// Simplex-inspired noise for organic movement
float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

void main() {
  // Interpolate between chaos and organized positions
  float individualProgress = clamp(uProgress * 1.4 - hash(aSpeed) * 0.4, 0.0, 1.0);
  
  // Smooth easing
  float easedProgress = individualProgress * individualProgress * (3.0 - 2.0 * individualProgress);
  
  vec3 pos = mix(position, aTarget, easedProgress);
  
  // Add organic floating motion
  float timeOffset = aSpeed * 6.28;
  pos.x += sin(uTime * aSpeed * 0.5 + timeOffset) * (1.0 - easedProgress) * 0.3;
  pos.y += cos(uTime * aSpeed * 0.7 + timeOffset) * (1.0 - easedProgress) * 0.2;
  pos.z += sin(uTime * aSpeed * 0.3 + timeOffset * 0.5) * (1.0 - easedProgress) * 0.15;
  
  // Subtle breathing even when organized
  pos.x += sin(uTime * 0.5 + aSpeed * 10.0) * easedProgress * 0.02;
  pos.y += cos(uTime * 0.4 + aSpeed * 8.0) * easedProgress * 0.02;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Size: larger when chaotic, smaller when organized
  float chaosSize = aSize * uSize * (0.8 + sin(uTime * aSpeed * 2.0) * 0.3);
  float organizedSize = aSize * uSize * 0.6;
  float finalSize = mix(chaosSize, organizedSize, easedProgress);
  
  gl_PointSize = finalSize * uPixelRatio * (1.0 / -mvPosition.z);
  
  // Pass to fragment shader
  vAlpha = aAlpha * (0.5 + easedProgress * 0.5);
  vProgress = easedProgress;
}
