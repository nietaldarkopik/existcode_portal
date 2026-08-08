import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { colors, fonts, fontSize, motion, radius, zIndex } from "./tokens";

function colorVars(): string[] {
  const lines: string[] = [];
  for (const [name, shades] of Object.entries(colors)) {
    for (const [shade, value] of Object.entries(shades)) {
      lines.push(`  --color-${name}-${shade}: ${value};`);
    }
  }
  return lines;
}

function fontVars(): string[] {
  return Object.entries(fonts).map(([name, value]) => `  --font-${name}: ${value};`);
}

function fontSizeVars(): string[] {
  const lines: string[] = [];
  for (const [name, { size, lineHeight }] of Object.entries(fontSize)) {
    lines.push(`  --text-${name}: ${size};`);
    lines.push(`  --text-${name}--line-height: ${lineHeight};`);
  }
  return lines;
}

function radiusVars(): string[] {
  return Object.entries(radius).map(([name, value]) => `  --radius-${name}: ${value};`);
}

function easingVars(): string[] {
  return Object.entries(motion.easing).map(([name, value]) => `  --ease-${name}: ${value};`);
}

function runtimeVars(): string[] {
  const lines: string[] = [];
  for (const [name, value] of Object.entries(motion.duration)) {
    lines.push(`  --duration-${name}: ${value}ms;`);
  }
  for (const [name, value] of Object.entries(zIndex)) {
    lines.push(`  --z-${name}: ${value};`);
  }
  return lines;
}

const output = `/* GENERATED FILE — do not edit directly.
   Source of truth: packages/ui/src/tokens/tokens.ts
   Regenerate with: npm run generate:theme -w @existcode/ui */
@import "tailwindcss";

/* Tailwind's auto content-detection only walks from the consuming app's
   Vite root, so sibling monorepo packages need to be added explicitly. */
@source "../ui/src";

@theme {
${[...colorVars(), ...fontVars(), ...fontSizeVars(), ...radiusVars(), ...easingVars()].join("\n")}
}

:root {
${runtimeVars().join("\n")}
}
`;

const outPath = fileURLToPath(new URL("../../../config/tailwind.css", import.meta.url));
writeFileSync(outPath, output);
console.log(`Generated theme -> ${outPath}`);
