import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { PointLight } from "three";
import { useReducedMotion } from "@existcode/hooks";

export interface AmbientLightsProps {
  accentColor?: string;
  intensity?: number;
}

export function AmbientLights({ accentColor = "#5eead4", intensity = 8 }: AmbientLightsProps) {
  const lightRef = useRef<PointLight>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    if (reducedMotion || !lightRef.current) return;
    const t = clock.getElapsedTime();
    lightRef.current.intensity = intensity + Math.sin(t * 0.6) * 2;
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight ref={lightRef} position={[3, 2, 4]} color={accentColor} intensity={intensity} />
    </>
  );
}
