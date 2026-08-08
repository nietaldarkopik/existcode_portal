export interface FogLayerProps {
  color?: string;
  near?: number;
  far?: number;
}

export function FogLayer({ color = "#050507", near = 4, far = 14 }: FogLayerProps) {
  return <fog attach="fog" args={[color, near, far]} />;
}
