// helminth-synergies.ts -- curated Helminth subsume synergy notes.
// Keys are "baseSlug|subsumeSlug" pairs shown in the "Synergy Notes" panel
// when both frame selections match on the Helminth Planner page.
// Source: https://warframe.fandom.com/wiki/Helminth#Subsumable_Abilities
// Accessed: 2026-05-20

import type { SynergyNote } from './helminth-types';

export const SYNERGY_NOTES: readonly SynergyNote[] = [
  {
    baseSlug: 'mag',
    subsumeSlug: 'rhino',
    notes: [
      "Roar amplifies all of Mag's damage including Spore procs and Magnetize detonations.",
      'Pull + Roar + Magnetize is a staple damage combo for Corpus-heavy missions.',
      'Replace Pull (1) with Roar to gain a team-wide buff without losing core kit.',
    ],
  },
  {
    baseSlug: 'mesa',
    subsumeSlug: 'saryn',
    notes: [
      "Gloom from Sevagoth is the more common pick, but Spores pairs well with Peacemaker's fire rate.",
      "Mesa's high damage output detonates Spores rapidly across grouped enemies.",
    ],
  },
  {
    baseSlug: 'mesa',
    subsumeSlug: 'sevagoth',
    notes: [
      'Gloom provides life-leech and a slow aura while Peacemaker is active.',
      'Mesa is normally immobile during Peacemaker; Gloom healing mitigates incoming damage.',
      'Replace Ballistic Battery (1) with Gloom for maximum survivability.',
    ],
  },
  {
    baseSlug: 'saryn',
    subsumeSlug: 'rhino',
    notes: [
      "Roar multiplicatively stacks with Saryn's Spore damage scaling.",
      "Replacing Spores on your second Saryn with Roar lets a duo cover both roles in ESO.",
    ],
  },
  {
    baseSlug: 'nova',
    subsumeSlug: 'rhino',
    notes: [
      'Roar amplifies the Molecular Prime detonation multiplier.',
      'Nova already slows or speeds enemies; Roar fills the missing damage-amp role.',
    ],
  },
  {
    baseSlug: 'octavia',
    subsumeSlug: 'rhino',
    notes: [
      'Roar combines with Mallet + Resonator for very high ambient damage output.',
      "Octavia's kit buffs Roar through Amp (Mallet) doubling friendly damage.",
    ],
  },
  {
    baseSlug: 'hildryn',
    subsumeSlug: 'saryn',
    notes: [
      "Spores spread via Hildryn's Pillage shield-strip, enabling rapid propagation.",
      "Hildryn's high shield pool supports Spore energy via Pillage restores.",
    ],
  },
  {
    baseSlug: 'protea',
    subsumeSlug: 'rhino',
    notes: [
      "Roar pairs with Protea's Dispensary for a self-sustaining damage amp loop.",
      'Replace Grenade Fan (1) with Roar to free up a kit slot without losing turrets.',
    ],
  },
];

export function findSynergyNotes(
  baseSlug: string,
  subsumeSlug: string,
): readonly string[] {
  const match = SYNERGY_NOTES.find(
    (s) => s.baseSlug === baseSlug && s.subsumeSlug === subsumeSlug,
  );
  return match?.notes ?? [];
}
