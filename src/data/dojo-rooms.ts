// dojo-rooms.ts -- canonical Clan Dojo room and research data for the Dojo Planner.
// Sources:
//   https://warframe.fandom.com/wiki/Dojo (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/Research (accessed 2026-05-20)

export type RoomCategory = 'core' | 'research' | 'utility' | 'decoration';

export interface ResourceCost {
  readonly resourceSlug: string;
  readonly resourceName: string;
  readonly qty: number;
}

export interface DojoRoom {
  readonly slug: string;
  readonly name: string;
  readonly category: RoomCategory;
  readonly capacity: number | null;
  readonly resourcesToBuild: readonly ResourceCost[];
  readonly timeHours: number;
  readonly prerequisites: readonly string[];
}

export interface ResearchItem {
  readonly slug: string;
  readonly name: string;
  readonly lab: string;
  readonly labSlug: string;
  readonly credits: number;
  readonly resourcesToBuild: readonly ResourceCost[];
  readonly timeHours: number;
}

export const DOJO_ROOMS: readonly DojoRoom[] = [
  {
    slug: 'clan-hall',
    name: 'Clan Hall',
    category: 'core',
    capacity: 40,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 15000 },
      { resourceSlug: 'ferrite', resourceName: 'Ferrite', qty: 400 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 200 },
    ],
    timeHours: 6,
    prerequisites: [],
  },
  {
    slug: 'oracle',
    name: 'Oracle',
    category: 'core',
    capacity: null,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 35000 },
      { resourceSlug: 'polymer-bundle', resourceName: 'Polymer Bundle', qty: 500 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 300 },
    ],
    timeHours: 12,
    prerequisites: ['clan-hall'],
  },
  {
    slug: 'tenno-lab',
    name: 'Tenno Lab',
    category: 'research',
    capacity: null,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 100000 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 5000 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 2000 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 600 },
    ],
    timeHours: 24,
    prerequisites: ['oracle'],
  },
  {
    slug: 'energy-lab',
    name: 'Energy Lab',
    category: 'research',
    capacity: null,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 100000 },
      { resourceSlug: 'ferrite', resourceName: 'Ferrite', qty: 5000 },
      { resourceSlug: 'polymer-bundle', resourceName: 'Polymer Bundle', qty: 2500 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 500 },
    ],
    timeHours: 24,
    prerequisites: ['oracle'],
  },
  {
    slug: 'chem-lab',
    name: 'Chem Lab',
    category: 'research',
    capacity: null,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 100000 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 5000 },
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 2500 },
      { resourceSlug: 'plastids', resourceName: 'Plastids', qty: 500 },
    ],
    timeHours: 24,
    prerequisites: ['oracle'],
  },
  {
    slug: 'bio-lab',
    name: 'Bio Lab',
    category: 'research',
    capacity: null,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 100000 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 5000 },
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 2500 },
      { resourceSlug: 'neurodes', resourceName: 'Neurodes', qty: 25 },
    ],
    timeHours: 24,
    prerequisites: ['oracle'],
  },
  {
    slug: 'orokin-lab',
    name: 'Orokin Lab',
    category: 'research',
    capacity: null,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 150000 },
      { resourceSlug: 'orokin-cell', resourceName: 'Orokin Cell', qty: 20 },
      { resourceSlug: 'control-module', resourceName: 'Control Module', qty: 40 },
      { resourceSlug: 'argon-crystal', resourceName: 'Argon Crystal', qty: 10 },
    ],
    timeHours: 48,
    prerequisites: ['oracle'],
  },
  {
    slug: 'dry-dock',
    name: 'Dry Dock',
    category: 'utility',
    capacity: null,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 50000 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 5000 },
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 3500 },
      { resourceSlug: 'ferrite', resourceName: 'Ferrite', qty: 3500 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 3500 },
    ],
    timeHours: 72,
    prerequisites: ['clan-hall'],
  },
  {
    slug: 'observatory',
    name: 'Observatory',
    category: 'decoration',
    capacity: 50,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 50000 },
      { resourceSlug: 'ferrite', resourceName: 'Ferrite', qty: 2500 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 2500 },
    ],
    timeHours: 12,
    prerequisites: ['clan-hall'],
  },
  {
    slug: 'reactor',
    name: 'Reactor',
    category: 'utility',
    capacity: null,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 25000 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 600 },
      { resourceSlug: 'polymer-bundle', resourceName: 'Polymer Bundle', qty: 600 },
    ],
    timeHours: 6,
    prerequisites: ['clan-hall'],
  },
  {
    slug: 'transit-depot',
    name: 'Transit Depot',
    category: 'utility',
    capacity: 15,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 25000 },
      { resourceSlug: 'ferrite', resourceName: 'Ferrite', qty: 1500 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 1500 },
    ],
    timeHours: 6,
    prerequisites: ['clan-hall'],
  },
  {
    slug: 'sleeping-quarters',
    name: 'Sleeping Quarters',
    category: 'decoration',
    capacity: 30,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 15000 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 1500 },
      { resourceSlug: 'ferrite', resourceName: 'Ferrite', qty: 1500 },
    ],
    timeHours: 6,
    prerequisites: ['clan-hall'],
  },
  {
    slug: 'crew-quarters',
    name: 'Crew Quarters',
    category: 'decoration',
    capacity: 30,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 15000 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 1500 },
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 1000 },
    ],
    timeHours: 6,
    prerequisites: ['clan-hall'],
  },
  {
    slug: 'gardens-earth',
    name: 'Gardens (Earth)',
    category: 'decoration',
    capacity: 60,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 25000 },
      { resourceSlug: 'ferrite', resourceName: 'Ferrite', qty: 2000 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 2000 },
    ],
    timeHours: 12,
    prerequisites: ['clan-hall'],
  },
  {
    slug: 'gardens-corpus',
    name: 'Gardens (Corpus)',
    category: 'decoration',
    capacity: 60,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 25000 },
      { resourceSlug: 'polymer-bundle', resourceName: 'Polymer Bundle', qty: 2000 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 500 },
    ],
    timeHours: 12,
    prerequisites: ['clan-hall'],
  },
  {
    slug: 'gardens-grineer',
    name: 'Gardens (Grineer)',
    category: 'decoration',
    capacity: 60,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 25000 },
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 2000 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 2000 },
    ],
    timeHours: 12,
    prerequisites: ['clan-hall'],
  },
  {
    slug: 'gardens-orokin',
    name: 'Gardens (Orokin)',
    category: 'decoration',
    capacity: 60,
    resourcesToBuild: [
      { resourceSlug: 'credits', resourceName: 'Credits', qty: 50000 },
      { resourceSlug: 'orokin-cell', resourceName: 'Orokin Cell', qty: 10 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 3000 },
    ],
    timeHours: 24,
    prerequisites: ['clan-hall'],
  },
] as const;

export const RESEARCH_ITEMS: readonly ResearchItem[] = [
  // Tenno Lab
  {
    slug: 'stradavar',
    name: 'Stradavar',
    lab: 'Tenno Lab',
    labSlug: 'tenno-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 15000 },
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 8000 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 2000 },
      { resourceSlug: 'orokin-cell', resourceName: 'Orokin Cell', qty: 3 },
    ],
    timeHours: 72,
  },
  {
    slug: 'hema',
    name: 'Hema',
    lab: 'Tenno Lab',
    labSlug: 'tenno-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'mutagen-sample', resourceName: 'Mutagen Sample', qty: 5000 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 50000 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 10000 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 1500 },
    ],
    timeHours: 72,
  },
  {
    slug: 'tenora',
    name: 'Tenora',
    lab: 'Tenno Lab',
    labSlug: 'tenno-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 12000 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 8000 },
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 6000 },
      { resourceSlug: 'orokin-cell', resourceName: 'Orokin Cell', qty: 4 },
    ],
    timeHours: 72,
  },
  {
    slug: 'pandero',
    name: 'Pandero',
    lab: 'Tenno Lab',
    labSlug: 'tenno-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 10000 },
      { resourceSlug: 'polymer-bundle', resourceName: 'Polymer Bundle', qty: 6000 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 1200 },
      { resourceSlug: 'orokin-cell', resourceName: 'Orokin Cell', qty: 2 },
    ],
    timeHours: 72,
  },
  {
    slug: 'hirudo',
    name: 'Hirudo',
    lab: 'Tenno Lab',
    labSlug: 'tenno-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 15000 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 9000 },
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 6000 },
      { resourceSlug: 'neurodes', resourceName: 'Neurodes', qty: 10 },
    ],
    timeHours: 72,
  },
  // Energy Lab
  {
    slug: 'atomos',
    name: 'Atomos',
    lab: 'Energy Lab',
    labSlug: 'energy-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'ferrite', resourceName: 'Ferrite', qty: 15000 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 2000 },
      { resourceSlug: 'polymer-bundle', resourceName: 'Polymer Bundle', qty: 6000 },
      { resourceSlug: 'neural-sensor', resourceName: 'Neural Sensor', qty: 5 },
    ],
    timeHours: 72,
  },
  {
    slug: 'dera-vandal',
    name: 'Dera Vandal',
    lab: 'Energy Lab',
    labSlug: 'energy-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'ferrite', resourceName: 'Ferrite', qty: 12000 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 2000 },
      { resourceSlug: 'polymer-bundle', resourceName: 'Polymer Bundle', qty: 5000 },
      { resourceSlug: 'orokin-cell', resourceName: 'Orokin Cell', qty: 3 },
    ],
    timeHours: 72,
  },
  {
    slug: 'cernos',
    name: 'Cernos',
    lab: 'Energy Lab',
    labSlug: 'energy-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'polymer-bundle', resourceName: 'Polymer Bundle', qty: 6000 },
      { resourceSlug: 'circuits', resourceName: 'Circuits', qty: 1800 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 8000 },
      { resourceSlug: 'control-module', resourceName: 'Control Module', qty: 5 },
    ],
    timeHours: 72,
  },
  // Chem Lab
  {
    slug: 'ignis',
    name: 'Ignis',
    lab: 'Chem Lab',
    labSlug: 'chem-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 15000 },
      { resourceSlug: 'plastids', resourceName: 'Plastids', qty: 3000 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 8000 },
      { resourceSlug: 'orokin-cell', resourceName: 'Orokin Cell', qty: 3 },
    ],
    timeHours: 72,
  },
  {
    slug: 'torid',
    name: 'Torid',
    lab: 'Chem Lab',
    labSlug: 'chem-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 12000 },
      { resourceSlug: 'plastids', resourceName: 'Plastids', qty: 2500 },
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 6000 },
      { resourceSlug: 'morphics', resourceName: 'Morphics', qty: 6 },
    ],
    timeHours: 72,
  },
  {
    slug: 'embolist',
    name: 'Embolist',
    lab: 'Chem Lab',
    labSlug: 'chem-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 10000 },
      { resourceSlug: 'plastids', resourceName: 'Plastids', qty: 2000 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 8000 },
      { resourceSlug: 'neural-sensor', resourceName: 'Neural Sensor', qty: 4 },
    ],
    timeHours: 72,
  },
  // Bio Lab
  {
    slug: 'mutalist-quanta',
    name: 'Mutalist Quanta',
    lab: 'Bio Lab',
    labSlug: 'bio-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 30000 },
      { resourceSlug: 'mutagen-sample', resourceName: 'Mutagen Sample', qty: 1500 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 8000 },
      { resourceSlug: 'neurodes', resourceName: 'Neurodes', qty: 8 },
    ],
    timeHours: 72,
  },
  {
    slug: 'pox',
    name: 'Pox',
    lab: 'Bio Lab',
    labSlug: 'bio-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 25000 },
      { resourceSlug: 'mutagen-sample', resourceName: 'Mutagen Sample', qty: 1000 },
      { resourceSlug: 'salvage', resourceName: 'Salvage', qty: 6000 },
      { resourceSlug: 'neurodes', resourceName: 'Neurodes', qty: 6 },
    ],
    timeHours: 72,
  },
  {
    slug: 'dual-toxocyst',
    name: 'Dual Toxocyst',
    lab: 'Bio Lab',
    labSlug: 'bio-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 20000 },
      { resourceSlug: 'mutagen-sample', resourceName: 'Mutagen Sample', qty: 800 },
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 5000 },
      { resourceSlug: 'morphics', resourceName: 'Morphics', qty: 5 },
    ],
    timeHours: 72,
  },
  {
    slug: 'phage',
    name: 'Phage',
    lab: 'Bio Lab',
    labSlug: 'bio-lab',
    credits: 15000,
    resourcesToBuild: [
      { resourceSlug: 'nano-spores', resourceName: 'Nano Spores', qty: 22000 },
      { resourceSlug: 'mutagen-sample', resourceName: 'Mutagen Sample', qty: 1200 },
      { resourceSlug: 'alloy-plate', resourceName: 'Alloy Plate', qty: 8000 },
      { resourceSlug: 'plastids', resourceName: 'Plastids', qty: 1500 },
    ],
    timeHours: 72,
  },
] as const;

export const CLAN_TIERS = [
  { slug: 'ghost',    name: 'Ghost',    multiplier: 1,   maxMembers: 10   },
  { slug: 'shadow',   name: 'Shadow',   multiplier: 3,   maxMembers: 30   },
  { slug: 'storm',    name: 'Storm',    multiplier: 10,  maxMembers: 100  },
  { slug: 'mountain', name: 'Mountain', multiplier: 30,  maxMembers: 300  },
  { slug: 'moon',     name: 'Moon',     multiplier: 100, maxMembers: 1000 },
] as const;
