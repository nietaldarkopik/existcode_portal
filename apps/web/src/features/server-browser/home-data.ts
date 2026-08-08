export interface FeaturedMediaItem {
  kind: "media";
  title: string;
  subtitle: string;
  toneClass: string;
  grow: number;
}

export interface FeaturedVideoItem {
  kind: "video";
  title: string;
  toneClass: string;
  grow: number;
}

export type FeaturedItem = FeaturedMediaItem | FeaturedVideoItem;

export const featuredItems: FeaturedItem[] = [
  {
    kind: "media",
    title: "Defuse All Maps",
    subtitle: "3 Results",
    toneClass: "bg-gradient-to-br from-sky-700/70 via-neutral-800 to-neutral-900",
    grow: 1.7
  },
  {
    kind: "media",
    title: "Conquest Large Operation Whiteout, Ham",
    subtitle: "22 Results",
    toneClass: "bg-gradient-to-br from-slate-500/60 via-neutral-800 to-neutral-900",
    grow: 1
  },
  {
    kind: "video",
    title: "Learn Battlefield 4 Basics with OSHY",
    toneClass: "bg-gradient-to-br from-neutral-700/70 via-neutral-800 to-neutral-900",
    grow: 1
  },
  {
    kind: "video",
    title: "Beginners Guide To Battlefield 4 by Asd",
    toneClass: "bg-gradient-to-br from-neutral-700/70 via-neutral-800 to-neutral-900",
    grow: 1
  },
  {
    kind: "media",
    title: "New Update — June Patch",
    subtitle: "Patch Notes",
    toneClass: "bg-gradient-to-br from-violet-600/50 via-neutral-800 to-neutral-900",
    grow: 1
  }
];

export const shortcutIcons = ["grid", "star", "play", "id", "settings"] as const;

export interface RecentServerItem {
  id: string;
  name: string;
  map: string;
  toneClass: string;
}

const toneClasses = [
  "bg-gradient-to-br from-sky-600/60 via-neutral-800 to-neutral-900",
  "bg-gradient-to-br from-violet-500/50 via-neutral-800 to-neutral-900",
  "bg-gradient-to-br from-amber-700/50 via-neutral-800 to-neutral-900",
  "bg-gradient-to-br from-neutral-500/50 via-neutral-800 to-neutral-900"
];

const recentRaw: Array<Omit<RecentServerItem, "id" | "toneClass">> = [
  { name: "[ Gunmaster - Vote Gun Master", map: "Dawnbreaker" },
  { name: "24/7 | DLC Conquest Conquest Large", map: "Propaganda" },
  { name: "Super@ [SiC] S6 Rush", map: "Operation Locker" },
  { name: "#3 [E4GL] 60 Hz AL Rush", map: "Lancang Dam" },
  { name: "#1 [Brazzers] - NI Conquest Large", map: "Siege Of Shanghai" },
  { name: "#1! 24/7 Rock N Ro Conquest Large", map: "Golmud Railway" }
];

export const recentServers: RecentServerItem[] = recentRaw.map((entry, i) => ({
  ...entry,
  id: String(i + 1),
  toneClass: toneClasses[i % toneClasses.length]!
}));
