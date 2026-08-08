import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import type { Points as ThreePoints } from "three";
import { useReducedMotion } from "@existcode/hooks";

export interface ParticleFieldProps {
  count?: number;
  radius?: number;
  color?: string;
  size?: number;
  speed?: number;
}

function randomInSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

export function ParticleField({
  count = 800,
  radius = 6,
  color = "#5eead4",
  size = 0.015,
  speed = 0.02
}: ParticleFieldProps) {
  const ref = useRef<ThreePoints>(null);
  const reducedMotion = useReducedMotion();
  const positions = useMemo(() => randomInSphere(count, radius), [count, radius]);

  useFrame((_, delta) => {
    if (reducedMotion || !ref.current) return;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * speed * 0.3;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}
