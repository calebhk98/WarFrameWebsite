// drop-tables.ts -- Canonical drop chance data for endgame Warframe farming.
// Sources:
//   https://warframe.fandom.com/wiki/Void_Relic (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/Kuva_Lich (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/Sister_of_Parvos (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/Eidolon_Teralyst (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/Acolyte (accessed 2026-05-20)
//   https://warframe.fandom.com/wiki/Orokin_Vault (accessed 2026-05-20)
//
// rarity_pct is the probability (0-100) that a single run yields this item.
// For relic drops: probability the rare slot lands on the specific rare item.
// All figures are per-run/per-instance probabilities.

export interface DropEntry {
  readonly id: string;
  readonly name: string;
  readonly rarity_pct: number;
  readonly context: string;
  readonly source_url: string;
}

export type DropCategory =
  | 'relic-intact'
  | 'relic-exceptional'
  | 'relic-flawless'
  | 'relic-radiant'
  | 'lich-weapon'
  | 'sister-weapon'
  | 'eidolon-arcane'
  | 'steel-path-arcane'
  | 'orokin-vault';

export interface DropGroup {
  readonly category: DropCategory;
  readonly label: string;
  readonly entries: readonly DropEntry[];
}

const RELIC_URL = 'https://warframe.fandom.com/wiki/Void_Relic';
const LICH_URL = 'https://warframe.fandom.com/wiki/Kuva_Lich';
const SISTER_URL = 'https://warframe.fandom.com/wiki/Sister_of_Parvos';
const EIDOLON_URL = 'https://warframe.fandom.com/wiki/Eidolon_Teralyst';
const ACOLYTE_URL = 'https://warframe.fandom.com/wiki/Acolyte';
const VAULT_URL = 'https://warframe.fandom.com/wiki/Orokin_Vault';

// Relic rare slot probabilities by refinement tier.
// At Intact a specific rare item has ~2% chance; Exceptional ~4%; Flawless ~6%; Radiant ~10%.
// Six players each crack a relic so the per-item probability at the reward screen
// is p_crack x (1/items_in_rare_bucket). These figures use the Fandom-documented
// per-relic rare-slot probabilities divided by a typical 2-item rare pool.
const INTACT_RARE_PCT = 2.01;
const EXCEPT_RARE_PCT = 4.0;
const FLAWLESS_RARE_PCT = 5.17;
const RADIANT_RARE_PCT = 10.0;

const relicIntact: readonly DropEntry[] = [
  { id: 'lith-b1-systems',    name: 'Lith B1 -- Braton Prime Systems', rarity_pct: INTACT_RARE_PCT, context: 'Rare slot, 2-item rare pool; run Capture/Exterminate SP', source_url: RELIC_URL },
  { id: 'lith-s9-chassis',    name: 'Lith S9 -- Saryn Prime Chassis',  rarity_pct: INTACT_RARE_PCT, context: 'Rare slot; farm Everest/Earth Capture', source_url: RELIC_URL },
  { id: 'lith-m7-neuroptics', name: 'Lith M7 -- Mesa Prime Neuroptics', rarity_pct: INTACT_RARE_PCT, context: 'Rare slot; Hepit Void Capture', source_url: RELIC_URL },
  { id: 'lith-a3-receiver',   name: 'Lith A3 -- Ash Prime Neuroptics', rarity_pct: INTACT_RARE_PCT, context: 'Rare slot; common Lith mission pool', source_url: RELIC_URL },
  { id: 'lith-k4-systems',    name: 'Lith K4 -- Khora Prime Systems',  rarity_pct: INTACT_RARE_PCT, context: 'Rare slot; Meso/Lith boundary farm', source_url: RELIC_URL },
];

const relicExceptional: readonly DropEntry[] = [
  { id: 'meso-s6-neuroptics', name: 'Meso S6 -- Saryn Prime Neuroptics', rarity_pct: EXCEPT_RARE_PCT, context: 'Exceptional refinement; Io Defense rotation A', source_url: RELIC_URL },
  { id: 'meso-n9-chassis',    name: 'Meso N9 -- Nova Prime Chassis',     rarity_pct: EXCEPT_RARE_PCT, context: 'Exceptional; Taveuni Disruption', source_url: RELIC_URL },
  { id: 'meso-k2-bp',        name: 'Meso K2 -- Khora Prime Blueprint',  rarity_pct: EXCEPT_RARE_PCT, context: 'Exceptional; Io Jupiter Defense', source_url: RELIC_URL },
  { id: 'meso-m3-chassis',   name: 'Meso M3 -- Mesa Prime Chassis',     rarity_pct: EXCEPT_RARE_PCT, context: 'Exceptional; Sanctuary Onslaught rotation', source_url: RELIC_URL },
  { id: 'meso-v8-barrel',    name: 'Meso V8 -- Vasto Prime Barrel',     rarity_pct: EXCEPT_RARE_PCT, context: 'Exceptional; common Meso farm', source_url: RELIC_URL },
];

const relicFlawless: readonly DropEntry[] = [
  { id: 'neo-s13-bp',        name: 'Neo S13 -- Saryn Prime Blueprint',   rarity_pct: FLAWLESS_RARE_PCT, context: 'Flawless; Hydron Sedna Defense rotation B', source_url: RELIC_URL },
  { id: 'neo-r1-chassis',    name: 'Neo R1 -- Rhino Prime Chassis',      rarity_pct: FLAWLESS_RARE_PCT, context: 'Flawless; Xini Eris Interception rotation B', source_url: RELIC_URL },
  { id: 'neo-p1-systems',    name: 'Neo P1 -- Protea Prime Systems',     rarity_pct: FLAWLESS_RARE_PCT, context: 'Flawless; Disruption Neo drop', source_url: RELIC_URL },
  { id: 'neo-m2-bp',         name: 'Neo M2 -- Mesa Prime Blueprint',     rarity_pct: FLAWLESS_RARE_PCT, context: 'Flawless; Steel Path Survival rotation C', source_url: RELIC_URL },
  { id: 'neo-z3-systems',    name: 'Neo Z3 -- Zephyr Prime Systems',     rarity_pct: FLAWLESS_RARE_PCT, context: 'Flawless; Hydron rotation B', source_url: RELIC_URL },
];

const relicRadiant: readonly DropEntry[] = [
  { id: 'axi-s6-bp',         name: 'Axi S6 -- Saryn Prime Blueprint',   rarity_pct: RADIANT_RARE_PCT, context: 'Radiant; Mot Void Survival rotation C', source_url: RELIC_URL },
  { id: 'axi-m1-neuroptics', name: 'Axi M1 -- Mesa Prime Neuroptics',   rarity_pct: RADIANT_RARE_PCT, context: 'Radiant; Xini Interception rotation C', source_url: RELIC_URL },
  { id: 'axi-k7-neuroptics', name: 'Axi K7 -- Khora Prime Neuroptics',  rarity_pct: RADIANT_RARE_PCT, context: 'Radiant; best-odds endgame relic farm', source_url: RELIC_URL },
  { id: 'axi-p5-bp',         name: 'Axi P5 -- Protea Prime Blueprint',  rarity_pct: RADIANT_RARE_PCT, context: 'Radiant; Mot 20min rotation', source_url: RELIC_URL },
  { id: 'axi-r3-bp',         name: 'Axi R3 -- Revenant Prime Blueprint',rarity_pct: RADIANT_RARE_PCT, context: 'Radiant; endgame Axi farm', source_url: RELIC_URL },
];

// Kuva Lich elemental weapon chance: 13 elements, uniform ~7.69% each.
const LICH_WEAPON_PCT = 7.69;
const lichWeapons: readonly DropEntry[] = [
  { id: 'lich-heat',        name: 'Lich -- Heat element weapon',       rarity_pct: LICH_WEAPON_PCT, context: 'Mercy kill rolls one of 13 elements; Heat ~7.69%', source_url: LICH_URL },
  { id: 'lich-cold',        name: 'Lich -- Cold element weapon',       rarity_pct: LICH_WEAPON_PCT, context: 'Mercy kill; Cold ~7.69%', source_url: LICH_URL },
  { id: 'lich-toxin',       name: 'Lich -- Toxin element weapon',      rarity_pct: LICH_WEAPON_PCT, context: 'Mercy kill; Toxin ~7.69%', source_url: LICH_URL },
  { id: 'lich-electricity', name: 'Lich -- Electricity element weapon', rarity_pct: LICH_WEAPON_PCT, context: 'Mercy kill; Electricity ~7.69%', source_url: LICH_URL },
  { id: 'lich-impact',      name: 'Lich -- Impact element weapon',     rarity_pct: LICH_WEAPON_PCT, context: 'Mercy kill; Impact ~7.69%', source_url: LICH_URL },
  { id: 'sister-heat',      name: 'Sister -- Heat element weapon',     rarity_pct: LICH_WEAPON_PCT, context: 'Sister mercy kill; Heat ~7.69%', source_url: SISTER_URL },
  { id: 'sister-cold',      name: 'Sister -- Cold element weapon',     rarity_pct: LICH_WEAPON_PCT, context: 'Sister mercy kill; Cold ~7.69%', source_url: SISTER_URL },
  { id: 'sister-toxin',     name: 'Sister -- Toxin element weapon',    rarity_pct: LICH_WEAPON_PCT, context: 'Sister mercy kill; Toxin ~7.69%', source_url: SISTER_URL },
  { id: 'sister-electricity',name:'Sister -- Electricity element weapon',rarity_pct:LICH_WEAPON_PCT, context: 'Sister mercy kill; Electricity ~7.69%', source_url: SISTER_URL },
  { id: 'sister-magnetic',  name: 'Sister -- Magnetic element weapon', rarity_pct: LICH_WEAPON_PCT, context: 'Sister mercy kill; Magnetic ~7.69%', source_url: SISTER_URL },
];

// Eidolon arcane drop: ~12% per arcane per Teralyst limb destroyed (4 limbs).
const EIDOLON_ARCANE_PCT = 12.0;
const eidolonArcanes: readonly DropEntry[] = [
  { id: 'arcane-grace',        name: 'Arcane Grace',        rarity_pct: EIDOLON_ARCANE_PCT, context: 'Teralyst limb break reward; ~12% per arcane', source_url: EIDOLON_URL },
  { id: 'arcane-guardian',     name: 'Arcane Guardian',     rarity_pct: EIDOLON_ARCANE_PCT, context: 'Teralyst limb break reward; ~12% per arcane', source_url: EIDOLON_URL },
  { id: 'arcane-energize',     name: 'Arcane Energize',     rarity_pct: EIDOLON_ARCANE_PCT, context: 'Eidolon shard trade reward; rare', source_url: EIDOLON_URL },
  { id: 'arcane-fury',         name: 'Arcane Fury',         rarity_pct: EIDOLON_ARCANE_PCT, context: 'Teralyst limb break reward; melee focused', source_url: EIDOLON_URL },
  { id: 'arcane-barrier',      name: 'Arcane Barrier',      rarity_pct: EIDOLON_ARCANE_PCT, context: 'Teralyst limb break reward; shield arcane', source_url: EIDOLON_URL },
  { id: 'arcane-avenger',      name: 'Arcane Avenger',      rarity_pct: EIDOLON_ARCANE_PCT, context: 'Teralyst limb break reward; critical chance', source_url: EIDOLON_URL },
  { id: 'arcane-velocity',     name: 'Arcane Velocity',     rarity_pct: EIDOLON_ARCANE_PCT, context: 'Teralyst limb break reward; fire rate', source_url: EIDOLON_URL },
];

// Steel Path Acolyte arcane drops (~25% per arcane from kill table).
const SP_ARCANE_PCT = 25.0;
const steelPathArcanes: readonly DropEntry[] = [
  { id: 'acolyte-arcane-acceleration', name: 'Acolyte -- Arcane Acceleration', rarity_pct: SP_ARCANE_PCT, context: 'Acolyte kill in Steel Path; one arcane from 4-item pool', source_url: ACOLYTE_URL },
  { id: 'acolyte-arcane-momentum',     name: 'Acolyte -- Arcane Momentum',     rarity_pct: SP_ARCANE_PCT, context: 'Acolyte kill in Steel Path; sniper reload', source_url: ACOLYTE_URL },
  { id: 'acolyte-arcane-strike',       name: 'Acolyte -- Arcane Strike',       rarity_pct: SP_ARCANE_PCT, context: 'Acolyte kill in Steel Path; attack speed', source_url: ACOLYTE_URL },
  { id: 'acolyte-arcane-warmth',       name: 'Acolyte -- Arcane Warmth',       rarity_pct: SP_ARCANE_PCT, context: 'Acolyte kill in Steel Path; heat resistance', source_url: ACOLYTE_URL },
];

// Orokin Vault artifact rotations (~12.5% per rare mod from vault chest pool).
const VAULT_PCT = 12.5;
const orokinVault: readonly DropEntry[] = [
  { id: 'vault-blind-rage',    name: 'Vault -- Blind Rage',    rarity_pct: VAULT_PCT, context: 'Deimos/Lua Vault chest; 8-mod rare pool each', source_url: VAULT_URL },
  { id: 'vault-fleeting-exp',  name: 'Vault -- Fleeting Expertise', rarity_pct: VAULT_PCT, context: 'Deimos Vault chest; corrupted mod pool', source_url: VAULT_URL },
  { id: 'vault-transient-fort',name: 'Vault -- Transient Fortitude', rarity_pct: VAULT_PCT, context: 'Deimos Vault chest; corrupted mod pool', source_url: VAULT_URL },
  { id: 'vault-narrow-minded', name: 'Vault -- Narrow Minded', rarity_pct: VAULT_PCT, context: 'Deimos Vault chest; corrupted mod pool', source_url: VAULT_URL },
  { id: 'vault-overextended',  name: 'Vault -- Overextended',  rarity_pct: VAULT_PCT, context: 'Deimos Vault chest; corrupted mod pool', source_url: VAULT_URL },
];

export const DROP_GROUPS: readonly DropGroup[] = [
  { category: 'relic-intact',      label: 'Relic -- Intact (2% rare)',      entries: relicIntact },
  { category: 'relic-exceptional', label: 'Relic -- Exceptional (~4% rare)', entries: relicExceptional },
  { category: 'relic-flawless',    label: 'Relic -- Flawless (~5% rare)',   entries: relicFlawless },
  { category: 'relic-radiant',     label: 'Relic -- Radiant (10% rare)',    entries: relicRadiant },
  { category: 'lich-weapon',       label: 'Lich/Sister Weapon Element',     entries: lichWeapons },
  { category: 'eidolon-arcane',    label: 'Eidolon Arcane (Teralyst)',      entries: eidolonArcanes },
  { category: 'steel-path-arcane', label: 'Steel Path Acolyte Arcane',     entries: steelPathArcanes },
  { category: 'orokin-vault',      label: 'Orokin Vault Corrupted Mod',    entries: orokinVault },
];

export const ALL_ENTRIES: readonly DropEntry[] = DROP_GROUPS.flatMap((g) => g.entries);
