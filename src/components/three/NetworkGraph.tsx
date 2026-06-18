'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks';

interface NetworkGraphProps {
  nodeCount?: number;
  connectionDistance?: number;
}

export default function NetworkGraph({ nodeCount = 100, connectionDistance = 2.5 }: NetworkGraphProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePosRef = useMousePosition();
  const groupRef = useRef<THREE.Group>(null);

  // Generate node positions and velocities
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const velocities = [];

    for (let i = 0; i < nodeCount; i++) {
      // Spread across a wide volume
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        )
      );
    }
    return { positions, velocities };
  }, [nodeCount]);

  // Geometry for lines
  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  
  // Dummy object for instanced mesh updates
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current || !groupRef.current) return;

    // 1. Mouse Parallax (subtle tilt based on cursor)
    const targetRotationX = mousePosRef.normalizedY * 0.1;
    const targetRotationY = mousePosRef.normalizedX * 0.1;
    
    groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
    
    // Auto rotation
    groupRef.current.rotation.y += 0.001;

    // 2. Update Node Positions (living network)
    const linePositions = [];
    const lineOpacities = [];
    let lineCount = 0;

    for (let i = 0; i < nodeCount; i++) {
      const i3 = i * 3;
      
      // Move particles
      positions[i3] += velocities[i].x;
      positions[i3 + 1] += velocities[i].y;
      positions[i3 + 2] += velocities[i].z;

      // Bounce off invisible boundaries
      if (Math.abs(positions[i3]) > 8) velocities[i].x *= -1;
      if (Math.abs(positions[i3 + 1]) > 8) velocities[i].y *= -1;
      if (Math.abs(positions[i3 + 2]) > 4) velocities[i].z *= -1;

      // Update instance matrix
      dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      
      // Pulse node size slightly
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // 3. Calculate Connections
      for (let j = i + 1; j < nodeCount; j++) {
        const j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < connectionDistance * connectionDistance) {
          linePositions.push(
            positions[i3], positions[i3 + 1], positions[i3 + 2],
            positions[j3], positions[j3 + 1], positions[j3 + 2]
          );
          
          // Fade lines based on distance
          const alpha = 1.0 - Math.sqrt(distSq) / connectionDistance;
          // Apply some pulsing to the lines too
          const linePulse = 0.5 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.5;
          const finalAlpha = alpha * linePulse * 0.5; // Max opacity 0.5
          
          lineOpacities.push(finalAlpha, finalAlpha);
          lineCount++;
        }
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update line geometry
    if (lineCount > 0) {
      lineGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      // We'd use vertexColors for opacity, but for simplicity in LineBasicMaterial 
      // we use a generic material. In a production build, a ShaderMaterial for lines 
      // is better for per-segment opacity.
      linesRef.current.visible = true;
    } else {
      linesRef.current.visible = false;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, nodeCount]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#f5a623" transparent opacity={0.8} />
      </instancedMesh>

      {/* Connections */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#e8930c"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
