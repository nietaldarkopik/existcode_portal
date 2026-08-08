export interface ServerEntry {
  id: string;
  name: string;
  flag: string;
  mode: string;
  map: string;
  ruleset: string;
  tickrate: string;
  players: number;
  slots: number;
  ping: number;
  toneClass: string;
}

const toneClasses = [
  "bg-gradient-to-br from-sky-600/60 via-neutral-800 to-neutral-900",
  "bg-gradient-to-br from-violet-500/50 via-neutral-800 to-neutral-900",
  "bg-gradient-to-br from-amber-700/50 via-neutral-800 to-neutral-900",
  "bg-gradient-to-br from-neutral-500/50 via-neutral-800 to-neutral-900"
];

const raw: Array<Omit<ServerEntry, "id" | "toneClass">> = [
  {
    name: "#1| NASA | Noobs Welcome | Conquest 40Hz",
    flag: "🇺🇸",
    mode: "CONQUEST LARGE",
    map: "SIEGE OF SHANGHAI",
    ruleset: "NORMAL",
    tickrate: "40 HZ",
    players: 63,
    slots: 64,
    ping: 47
  },
  {
    name: "+1 ANARCHY HARDCORE! 60Hz",
    flag: "🇷🇺",
    mode: "CONQUEST LARGE",
    map: "HAMMERHEAD",
    ruleset: "HARDCORE",
    tickrate: "60 HZ",
    players: 63,
    slots: 64,
    ping: 47
  },
  {
    name: "SUPER@ [SiC] S2 Operation Locker - EPS - 60Hz",
    flag: "🇩🇪",
    mode: "CONQUEST LARGE",
    map: "OPERATION LOCKER",
    ruleset: "NORMAL",
    tickrate: "60 HZ",
    players: 63,
    slots: 64,
    ping: 47
  },
  {
    name: "FEAR CLAN__ Mbl u3 70x__ NO CHEATERS 150%** 25RUS**//_MX_/",
    flag: "🇲🇽",
    mode: "CONQUEST LARGE",
    map: "GOLMUD RAILWAY",
    ruleset: "HARDCORE",
    tickrate: "30 HZ",
    players: 62,
    slots: 64,
    ping: 47
  },
  {
    name: ",#4 [E4GL] 60Hz - Locker only - Limited Explosives",
    flag: "🇩🇪",
    mode: "CONQUEST LARGE",
    map: "OPERATION LOCKER",
    ruleset: "NORMAL",
    tickrate: "60 HZ",
    players: 61,
    slots: 64,
    ping: 47
  },
  {
    name: "!!,;(WHG):.!! #1 LOCKER !.(60HZ).!",
    flag: "🇩🇪",
    mode: "CONQUEST LARGE",
    map: "OPERATION LOCKER",
    ruleset: "CUSTOM",
    tickrate: "60 HZ",
    players: 61,
    slots: 64,
    ping: 186
  },
  {
    name: "!1 [AE51] The Madhouse [ CQL | Fast Spawn | Map Voting ]",
    flag: "🇩🇪",
    mode: "CONQUEST LARGE",
    map: "LANCANG DAM",
    ruleset: "NORMAL",
    tickrate: "30 HZ",
    players: 61,
    slots: 64,
    ping: 47
  },
  {
    name: "[JGP] - Secound Assault (BF4DM,VOTE,CMD,SPECTATE,RULES)",
    flag: "🇩🇪",
    mode: "CONQUEST LARGE",
    map: "LANCANG DAM",
    ruleset: "NORMAL",
    tickrate: "60 HZ",
    players: 61,
    slots: 64,
    ping: 47
  },
  {
    name: "SUPER@ [SiC] S7 Conquest Vanilla Maps",
    flag: "🇩🇪",
    mode: "CONQUEST LARGE",
    map: "GOLMUD RAILWAY",
    ruleset: "NORMAL",
    tickrate: "30 HZ",
    players: 61,
    slots: 64,
    ping: 47
  },
  {
    name: "SUPER@ [SiC] S9 Conquest Propaganda",
    flag: "🇩🇪",
    mode: "CONQUEST LARGE",
    map: "PROPAGANDA",
    ruleset: "NORMAL",
    tickrate: "30 HZ",
    players: 61,
    slots: 64,
    ping: 47
  },
  {
    name: ",#1 [JAH] Warriors - Metro Only - No Weapon Rules - 64 Slots",
    flag: "🇩🇪",
    mode: "CONQUEST LARGE",
    map: "SIEGE OF SHANGHAI",
    ruleset: "NORMAL",
    tickrate: "30 HZ",
    players: 60,
    slots: 64,
    ping: 47
  },
  {
    name: "! [vQ37] LOCKER DEUX | TDM | ALL WEAPONS | STATS | vQ37.ORG",
    flag: "🇺🇸",
    mode: "TEAM DEATHMATCH",
    map: "OPERATION LOCKER",
    ruleset: "NORMAL",
    tickrate: "60 HZ",
    players: 60,
    slots: 64,
    ping: 107
  },
  {
    name: "! Flubber",
    flag: "🇩🇪",
    mode: "CONQUEST LARGE",
    map: "PROPAGANDA",
    ruleset: "NORMAL",
    tickrate: "40 HZ",
    players: 60,
    slots: 64,
    ping: 107
  },
  {
    name: "! RC3-BASEMAPS",
    flag: "🇺🇸",
    mode: "CONQUEST LARGE",
    map: "LANCANG DAM",
    ruleset: "CUSTOM",
    tickrate: "60 HZ",
    players: 60,
    slots: 64,
    ping: 107
  }
];

export const servers: ServerEntry[] = raw.map((entry, i) => ({
  ...entry,
  id: String(i + 1),
  toneClass: toneClasses[i % toneClasses.length]!
}));
