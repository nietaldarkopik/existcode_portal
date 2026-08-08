import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

export interface AtmosphereCanvasProps {
  children: ReactNode;
  className?: string;
}

// dpr capped at 1.5 so atmosphere effects never become the page's frame-rate bottleneck
export function AtmosphereCanvas({ children, className }: AtmosphereCanvasProps) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
