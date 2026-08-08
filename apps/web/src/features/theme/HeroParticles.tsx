import { AmbientLights, AtmosphereCanvas, FogLayer, ParticleField } from "@existcode/three-fx";
import { ACCENT_PRESETS, useTheme } from "@existcode/ui";

// Accent-tinted particle atmosphere behind the "showcase" layout's Home hero.
// Fixed full-viewport + negative z-index so it sits behind every page's
// existing AmbientBackdrop gradient without competing for layout space.
export function HeroParticles() {
  const { accent } = useTheme();
  const hex = ACCENT_PRESETS.find((preset) => preset.id === accent)?.hex ?? "#14b8a6";

  return (
    <AtmosphereCanvas className="-z-20 opacity-70">
      <FogLayer color="#05070c" near={4} far={12} />
      <AmbientLights accentColor={hex} intensity={6} />
      <ParticleField color={hex} count={600} radius={5} speed={0.015} />
    </AtmosphereCanvas>
  );
}
