// star-chart.ts -- planet metadata for the Star Chart visualization page.
// Each entry describes one planetary location in the Origin System progression.

export interface PlanetEntry {
  readonly slug: string;
  readonly name: string;
  readonly faction: string;
  readonly level_range_min: number;
  readonly level_range_max: number;
  readonly junction_from: string | null;
  readonly special_features: readonly string[];
  readonly node_count_estimate: number;
  /** SVG canvas position (viewBox 0 0 1200 600) */
  readonly cx: number;
  readonly cy: number;
}

export const PLANETS: readonly PlanetEntry[] = [
  {
    slug: 'mercury',
    name: 'Mercury',
    faction: 'Grineer',
    level_range_min: 1,
    level_range_max: 6,
    junction_from: null,
    special_features: ['Starting planet', 'Maroo market'],
    node_count_estimate: 11,
    cx: 100,
    cy: 300,
  },
  {
    slug: 'venus',
    name: 'Venus',
    faction: 'Corpus',
    level_range_min: 3,
    level_range_max: 10,
    junction_from: 'mercury',
    special_features: ['Orb Vallis open world', 'Fortuna hub'],
    node_count_estimate: 15,
    cx: 220,
    cy: 420,
  },
  {
    slug: 'earth',
    name: 'Earth',
    faction: 'Grineer',
    level_range_min: 1,
    level_range_max: 15,
    junction_from: 'mercury',
    special_features: ['Plains of Eidolon', 'Cetus hub', 'Assassination: Vor+Lech'],
    node_count_estimate: 16,
    cx: 220,
    cy: 190,
  },
  {
    slug: 'mars',
    name: 'Mars',
    faction: 'Grineer',
    level_range_min: 8,
    level_range_max: 16,
    junction_from: 'venus',
    special_features: ['Assassination: Tyl Regor precursor'],
    node_count_estimate: 18,
    cx: 360,
    cy: 350,
  },
  {
    slug: 'phobos',
    name: 'Phobos',
    faction: 'Corpus',
    level_range_min: 8,
    level_range_max: 13,
    junction_from: 'earth',
    special_features: ['Assassination: Councilor Vay Hek precursor'],
    node_count_estimate: 11,
    cx: 360,
    cy: 210,
  },
  {
    slug: 'deimos',
    name: 'Deimos',
    faction: 'Infested',
    level_range_min: 10,
    level_range_max: 30,
    junction_from: 'mars',
    special_features: ['Cambion Drift open world', 'Entrati lab', 'Necramech'],
    node_count_estimate: 15,
    cx: 480,
    cy: 440,
  },
  {
    slug: 'ceres',
    name: 'Ceres',
    faction: 'Grineer',
    level_range_min: 12,
    level_range_max: 20,
    junction_from: 'mars',
    special_features: ['Assassination: Sargas Ruk'],
    node_count_estimate: 14,
    cx: 480,
    cy: 300,
  },
  {
    slug: 'jupiter',
    name: 'Jupiter',
    faction: 'Corpus',
    level_range_min: 16,
    level_range_max: 22,
    junction_from: 'ceres',
    special_features: ['Ropalolyst assassination', 'Gas City tileset'],
    node_count_estimate: 16,
    cx: 600,
    cy: 390,
  },
  {
    slug: 'lua',
    name: 'Lua',
    faction: 'Orokin',
    level_range_min: 25,
    level_range_max: 35,
    junction_from: 'earth',
    special_features: ['Orokin Moon tileset', 'Conjunction Survival', 'Drift challenges'],
    node_count_estimate: 10,
    cx: 360,
    cy: 90,
  },
  {
    slug: 'europa',
    name: 'Europa',
    faction: 'Corpus',
    level_range_min: 21,
    level_range_max: 30,
    junction_from: 'jupiter',
    special_features: ['Assassination: Ambulas'],
    node_count_estimate: 14,
    cx: 720,
    cy: 300,
  },
  {
    slug: 'saturn',
    name: 'Saturn',
    faction: 'Grineer',
    level_range_min: 24,
    level_range_max: 34,
    junction_from: 'ceres',
    special_features: ['Assassination: Tyl Regor', 'Cassini capture'],
    node_count_estimate: 15,
    cx: 600,
    cy: 210,
  },
  {
    slug: 'uranus',
    name: 'Uranus',
    faction: 'Grineer',
    level_range_min: 28,
    level_range_max: 34,
    junction_from: 'saturn',
    special_features: ['Assassination: Tyl Regor (Uranus)', 'Ophelia endless'],
    node_count_estimate: 14,
    cx: 720,
    cy: 120,
  },
  {
    slug: 'neptune',
    name: 'Neptune',
    faction: 'Corpus',
    level_range_min: 30,
    level_range_max: 38,
    junction_from: 'europa',
    special_features: ['Assassination: Ambulas variant', 'Hydron Sedna gateway'],
    node_count_estimate: 13,
    cx: 840,
    cy: 390,
  },
  {
    slug: 'pluto',
    name: 'Pluto',
    faction: 'Corpus',
    level_range_min: 34,
    level_range_max: 40,
    junction_from: 'neptune',
    special_features: ['Assassination: Ambulas (Pluto)', 'Cerberus gateway'],
    node_count_estimate: 13,
    cx: 960,
    cy: 450,
  },
  {
    slug: 'sedna',
    name: 'Sedna',
    faction: 'Grineer',
    level_range_min: 30,
    level_range_max: 45,
    junction_from: 'uranus',
    special_features: ['Assassination: Kela De Thaym', 'Adaro stealth farm', 'Hydron wave defense'],
    node_count_estimate: 16,
    cx: 960,
    cy: 210,
  },
  {
    slug: 'eris',
    name: 'Eris',
    faction: 'Infested',
    level_range_min: 30,
    level_range_max: 45,
    junction_from: 'pluto',
    special_features: ['Assassination: Mutalist Alad V', 'Akkad farm'],
    node_count_estimate: 11,
    cx: 1060,
    cy: 360,
  },
  {
    slug: 'void',
    name: 'Void',
    faction: 'Orokin',
    level_range_min: 25,
    level_range_max: 40,
    junction_from: 'saturn',
    special_features: ['Orokin Tower tileset', 'Relic farming', 'Neo/Axi fissures'],
    node_count_estimate: 13,
    cx: 840,
    cy: 120,
  },
  {
    slug: 'kuva-fortress',
    name: 'Kuva Fortress',
    faction: 'Grineer',
    level_range_min: 25,
    level_range_max: 35,
    junction_from: 'sedna',
    special_features: ['Fortress tileset', 'Kuva Siphon', 'Kuva Flood'],
    node_count_estimate: 8,
    cx: 1100,
    cy: 120,
  },
] as const;

/** Edge list for junction lines drawn on the SVG canvas. */
export interface JunctionEdge {
  readonly from: string;
  readonly to: string;
}

export const JUNCTIONS: readonly JunctionEdge[] = PLANETS.filter(
  (p): p is PlanetEntry & { junction_from: string } => p.junction_from !== null,
).map((p) => ({ from: p.junction_from, to: p.slug }));

/** Faction to hex color map used by both SVG and legend. */
export const FACTION_COLORS: Readonly<Record<string, string>> = {
  Grineer: '#cc4444',
  Corpus: '#44cc88',
  Infested: '#88cc44',
  Sentient: '#cc44cc',
  Orokin: '#ccaa44',
  Mixed: '#cccc44',
  Murmur: '#888888',
} as const;

export function factionColor(faction: string): string {
  return FACTION_COLORS[faction] ?? '#666666';
}
