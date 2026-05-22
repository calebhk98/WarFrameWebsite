export type WatchlistCategory = 'Primed Mods' | 'Arcanes' | 'Prime Sets' | 'Prime Parts';

export interface WatchlistItem {
  urlName: string;
  displayName: string;
  category: WatchlistCategory;
}

export const MARKET_WATCHLIST: WatchlistItem[] = [
  // Primed Mods
  { urlName: 'primed_continuity', displayName: 'Primed Continuity', category: 'Primed Mods' },
  { urlName: 'primed_flow', displayName: 'Primed Flow', category: 'Primed Mods' },
  { urlName: 'primed_pressure_point', displayName: 'Primed Pressure Point', category: 'Primed Mods' },
  { urlName: 'primed_point_blank', displayName: 'Primed Point Blank', category: 'Primed Mods' },
  { urlName: 'primed_ravage', displayName: 'Primed Ravage', category: 'Primed Mods' },
  { urlName: 'primed_cryo_rounds', displayName: 'Primed Cryo Rounds', category: 'Primed Mods' },
  { urlName: 'primed_heated_charge', displayName: 'Primed Heated Charge', category: 'Primed Mods' },
  { urlName: 'primed_reach', displayName: 'Primed Reach', category: 'Primed Mods' },

  // Arcanes
  { urlName: 'arcane_energize', displayName: 'Arcane Energize', category: 'Arcanes' },
  { urlName: 'arcane_grace', displayName: 'Arcane Grace', category: 'Arcanes' },
  { urlName: 'arcane_guardian', displayName: 'Arcane Guardian', category: 'Arcanes' },
  { urlName: 'arcane_avenger', displayName: 'Arcane Avenger', category: 'Arcanes' },
  { urlName: 'arcane_ultimatum', displayName: 'Arcane Ultimatum', category: 'Arcanes' },
  { urlName: 'arcane_blessing', displayName: 'Arcane Blessing', category: 'Arcanes' },
  { urlName: 'arcane_strike', displayName: 'Arcane Strike', category: 'Arcanes' },
  { urlName: 'arcane_fury', displayName: 'Arcane Fury', category: 'Arcanes' },

  // Prime Sets
  { urlName: 'saryn_prime_set', displayName: 'Saryn Prime Set', category: 'Prime Sets' },
  { urlName: 'mesa_prime_set', displayName: 'Mesa Prime Set', category: 'Prime Sets' },
  { urlName: 'octavia_prime_set', displayName: 'Octavia Prime Set', category: 'Prime Sets' },
  { urlName: 'khora_prime_set', displayName: 'Khora Prime Set', category: 'Prime Sets' },
  { urlName: 'protea_prime_set', displayName: 'Protea Prime Set', category: 'Prime Sets' },
  { urlName: 'nova_prime_set', displayName: 'Nova Prime Set', category: 'Prime Sets' },

  // Prime Parts
  { urlName: 'saryn_prime_neuroptics', displayName: 'Saryn Prime Neuroptics', category: 'Prime Parts' },
  { urlName: 'mesa_prime_chassis', displayName: 'Mesa Prime Chassis', category: 'Prime Parts' },
  { urlName: 'octavia_prime_systems', displayName: 'Octavia Prime Systems', category: 'Prime Parts' },
  { urlName: 'khora_prime_neuroptics', displayName: 'Khora Prime Neuroptics', category: 'Prime Parts' },
  { urlName: 'nova_prime_neuroptics', displayName: 'Nova Prime Neuroptics', category: 'Prime Parts' },
  { urlName: 'protea_prime_neuroptics', displayName: 'Protea Prime Neuroptics', category: 'Prime Parts' },
  { urlName: 'glaive_prime', displayName: 'Glaive Prime', category: 'Prime Parts' },
  { urlName: 'nikana_prime', displayName: 'Nikana Prime', category: 'Prime Parts' },
];
