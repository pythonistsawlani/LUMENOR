// Fragment shader for glowing particles
// Creates soft circular particles with additive glow

uniform vec3 uColor;
uniform float uProgress;

varying float vAlpha;
varying float vProgress;

void main() {
  // Distance from center of point
  float dist = length(gl_PointCoord - vec2(0.5));
  
  // Discard outside circle
  if (dist > 0.5) discard;
  
  // Soft circular falloff
  float strength = 1.0 - (dist * 2.0);
  strength = pow(strength, 1.5);
  
  // Core glow (brighter center)
  float core = 1.0 - smoothstep(0.0, 0.15, dist);
  
  // Color: warm amber in chaos, brighter white-gold when organized
  vec3 chaosColor = uColor;
  vec3 organizedColor = mix(uColor, vec3(1.0, 0.95, 0.85), 0.3);
  vec3 finalColor = mix(chaosColor, organizedColor, vProgress);
  
  // Add bright core
  finalColor += core * vec3(1.0, 0.98, 0.9) * 0.5;
  
  float alpha = strength * vAlpha;
  
  gl_FragColor = vec4(finalColor, alpha);
}
