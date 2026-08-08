export interface MapRotationEntry {
  mode: string;
  name: string;
  toneClass: string;
}

const toneClasses = [
  "bg-gradient-to-br from-sky-600/60 via-neutral-800 to-neutral-900",
  "bg-gradient-to-br from-violet-500/50 via-neutral-800 to-neutral-900",
  "bg-gradient-to-br from-amber-700/50 via-neutral-800 to-neutral-900",
  "bg-gradient-to-br from-neutral-500/50 via-neutral-800 to-neutral-900"
];

const rotationBase: Array<Pick<MapRotationEntry, "mode" | "name">> = [
  { mode: "CONQUEST LARGE", name: "DAWNBREAKER" },
  { mode: "CONQUEST LARGE", name: "PROPAGANDA" },
  { mode: "CONQUEST LARGE", name: "OPERATION LOCKER" },
  { mode: "CONQUEST LARGE", name: "LANCANG DAM" },
  { mode: "CONQUEST LARGE", name: "SIEGE OF SHANGHAI" },
  { mode: "CONQUEST LARGE", name: "GOLMUD RAILWAY" },
  { mode: "CONQUEST LARGE", name: "PROPAGANDA" },
  { mode: "CONQUEST LARGE", name: "SIEGE OF SHANGHAI" }
];

// Server browser shows the upcoming rotation on loop — reference file repeats
// the same 8-map cycle twice to fill a 4x4 grid.
export const mapRotation: MapRotationEntry[] = [...rotationBase, ...rotationBase].map((entry, i) => ({
  ...entry,
  toneClass: toneClasses[i % toneClasses.length]!
}));
