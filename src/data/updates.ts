export interface UpdateEntry {
  title: string;
  updateNumber: string;
  date: string;
  summary: string;
  highlights: string[];
  relatedSlug?: string;
  relatedType?: string;
  fandomUrl: string;
}

export const updates: UpdateEntry[] = [
  {
    title: 'Warframe: 1999',
    updateNumber: 'Update 37',
    date: '2024-12-12',
    summary:
      'A time-slip to 1999 Lathe introduces Arthur, a new Warframe. The Hex -- six rebels with unique personalities and playstyles -- join the Tenno. A completely new open-world tile set, the Hollvania city, debuts alongside the Cavia research hub.',
    highlights: ['New Warframe: Arthur', 'New open-world hub: Hollvania', 'The Hex companion characters', 'New quest: The Hex'],
    relatedSlug: 'the-hex',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/Update_37',
  },
  {
    title: 'Jade Shadows',
    updateNumber: 'Update 36',
    date: '2024-06-18',
    summary:
      'Jade Shadows expands the post-New War narrative with a new quest centered on Jade, a Warframe who embodies light and music. The update also overhauled the Stalker encounter and introduced new Arcane categories.',
    highlights: ['New Warframe: Jade', 'New quest: Jade Shadows', 'Stalker rework', 'New Arcanes'],
    relatedSlug: 'jade-shadows',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/Update_36',
  },
  {
    title: 'Whispers in the Walls',
    updateNumber: 'Update 35',
    date: '2023-12-13',
    summary:
      'The Murmur faction arrives from the Void in search of a forbidden Orokin secret buried beneath the Deimos Undercroft. Cavia, a new research enclave, tasks Tenno with investigating. Introduces Qorvex and Dagath Warframes and the Undercroft tile set.',
    highlights: ['New Warframes: Qorvex, Dagath', 'New faction: Murmur', 'New hub: Cavia', 'Undercroft tile set', 'New quest: Whispers in the Walls'],
    relatedSlug: 'whispers-in-the-walls',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/Update_35',
  },
  {
    title: 'Abyss of Dagath',
    updateNumber: 'Update 34.1',
    date: '2023-10-18',
    summary:
      'Mid-update adding Dagath, a spectral cavalry Warframe wreathed in cursed fire. Includes the Abyss of Dagath quest that reveals her tragic past.',
    highlights: ['New Warframe: Dagath', 'New quest: Abyss of Dagath', 'New weapon: Dorrclave'],
    relatedSlug: 'dagath',
    relatedType: 'warframes',
    fandomUrl: 'https://warframe.fandom.com/wiki/Abyss_of_Dagath',
  },
  {
    title: 'Veilbreaker',
    updateNumber: 'Update 32',
    date: '2022-09-07',
    summary:
      'Styanax joins the Tenno roster. The Veilbreaker quest tasks players with breaking Narmer veils and liberating colonists, continuing the story after The New War. Archon Hunt endgame activity launches.',
    highlights: ['New Warframe: Styanax', 'New quest: Veilbreaker', 'Archon Hunts', 'Narmer Veil removal'],
    relatedSlug: 'veilbreaker',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/Veilbreaker',
  },
  {
    title: 'Angels of the Zariman',
    updateNumber: 'Update 31.5',
    date: '2022-05-18',
    summary:
      'The Zariman Ten Zero returns as an open-world hub. Tenno investigate Void corruption overtaking the colonists. Gyre and Voruna are teased; Holdfasts syndicate debuts. New Void Cascade and Void Flood endless missions.',
    highlights: ['New hub: Zariman', 'Holdfasts syndicate', 'New missions: Void Cascade, Void Flood', 'Incarnon weapon genesis system'],
    relatedSlug: 'angels-of-the-zariman',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/Angels_of_the_Zariman',
  },
  {
    title: 'The New War',
    updateNumber: 'Update 31',
    date: '2021-12-15',
    summary:
      'The saga of the Old War concludes as Ballas and the Sentients launch a full invasion of the Origin System. Players field three protagonists -- Teshin, Kahl-175, and Veso -- in a fully cinematic quest. Caliban joins the roster.',
    highlights: ['New Warframe: Caliban', 'Largest quest in Warframe history', 'Three playable protagonists', 'New weapons and cosmetics'],
    relatedSlug: 'the-new-war',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/The_New_War',
  },
  {
    title: 'The Duviri Paradox',
    updateNumber: 'Update 33',
    date: '2023-04-26',
    summary:
      'An ethereal realm outside the Origin System known as Duviri offers a roguelite experience. Players choose from randomly assigned Warframes and navigate an ever-changing world ruled by Dominus Thrax. Introduces the Drifter melee system and Incarnon genesis.',
    highlights: ['New game mode: Duviri', 'Roguelite Warframe selection', 'Drifter melee combat', 'Incarnon genesis debuts'],
    relatedSlug: 'the-duviri-paradox',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/The_Duviri_Paradox',
  },
  {
    title: 'The Sacrifice',
    updateNumber: 'Update 23',
    date: '2018-06-15',
    summary:
      'Ballas resurfaces and the Operator chases the mysterious Sentient-hybrid Warframe across the Origin System. The Sacrifice reveals the true origin of the Warframes and introduces Excalibur Umbra.',
    highlights: ['New Warframe: Excalibur Umbra', 'Warframe origin lore revealed', 'Umbra mods introduced'],
    relatedSlug: 'the-sacrifice',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/The_Sacrifice',
  },
  {
    title: 'The Second Dream',
    updateNumber: 'Update 18',
    date: '2015-12-03',
    summary:
      "A landmark quest that revealed the Tenno's true nature -- the Operators -- and introduced the Somatic Link and Transference mechanics. The Second Dream remains the pivotal lore turning point of the entire game.",
    highlights: ['Operator system revealed', 'Transference mechanic', 'Stalker boss encounter', 'Focus system introduced'],
    relatedSlug: 'the-second-dream',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/The_Second_Dream',
  },
  {
    title: 'Heart of Deimos',
    updateNumber: 'Update 29',
    date: '2020-08-25',
    summary:
      'Deimos, the Infested moon of Mars, opens as the third open-world hub. The Entrati family guards the Necralisk, a research enclave. Xaku joins the roster. Introduces Helminth chrysalis for ability subsumption.',
    highlights: ['New open world: Deimos', 'New Warframe: Xaku', 'Helminth Chrysalis system', 'Entrati syndicate'],
    relatedSlug: 'heart-of-deimos',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/Heart_of_Deimos',
  },
  {
    title: 'The Lotus Eaters',
    updateNumber: 'Update 38',
    date: '2025-03-25',
    summary:
      'Continuing the 1999 narrative, The Lotus Eaters delves deeper into the mysteries of Hollvania and the fate of the Hex. New weapons, enemies, and story chapters expand the Warframe: 1999 content block.',
    highlights: ['New quest: The Lotus Eaters', 'Expanded Hollvania map', 'New weapons', 'New Hex companion arcs'],
    relatedSlug: 'the-lotus-eaters',
    relatedType: 'quests',
    fandomUrl: 'https://warframe.fandom.com/wiki/The_Lotus_Eaters',
  },
];
