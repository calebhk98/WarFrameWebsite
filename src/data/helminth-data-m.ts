// helminth-data-m.ts -- Helminth subsume data: Mag through Mirage Prime.
// Source: https://warframe.fandom.com/wiki/Helminth#Subsumable_Abilities
// Accessed: 2026-05-20

import type { HelminthEntry } from './helminth-types';

export const HELMINTH_DATA_M: readonly HelminthEntry[] = [
  {
    slug: 'mag',
    name: 'Mag',
    abilities: [
      { key: '1', name: 'Pull' },
      { key: '2', name: 'Magnetize' },
      { key: '3', name: 'Polarize' },
      { key: '4', name: 'Crush' },
    ],
    subsumeAbility: 'Pull',
    subsumeKey: '1',
  },
  {
    slug: 'mag-prime',
    name: 'Mag Prime',
    abilities: [
      { key: '1', name: 'Pull' },
      { key: '2', name: 'Magnetize' },
      { key: '3', name: 'Polarize' },
      { key: '4', name: 'Crush' },
    ],
    subsumeAbility: 'Pull',
    subsumeKey: '1',
  },
  {
    slug: 'mesa',
    name: 'Mesa',
    abilities: [
      { key: '1', name: 'Ballistic Battery' },
      { key: '2', name: 'Shooting Gallery' },
      { key: '3', name: 'Shatter Shield' },
      { key: '4', name: 'Peacemaker' },
    ],
    subsumeAbility: 'Shooting Gallery',
    subsumeKey: '2',
  },
  {
    slug: 'mesa-prime',
    name: 'Mesa Prime',
    abilities: [
      { key: '1', name: 'Ballistic Battery' },
      { key: '2', name: 'Shooting Gallery' },
      { key: '3', name: 'Shatter Shield' },
      { key: '4', name: 'Peacemaker' },
    ],
    subsumeAbility: 'Shooting Gallery',
    subsumeKey: '2',
  },
  {
    slug: 'mirage',
    name: 'Mirage',
    abilities: [
      { key: '1', name: 'Hall of Malevolence' },
      { key: '2', name: 'Sleight of Hand' },
      { key: '3', name: 'Eclipse' },
      { key: '4', name: 'Total Eclipse' },
    ],
    subsumeAbility: 'Eclipse',
    subsumeKey: '3',
  },
  {
    slug: 'mirage-prime',
    name: 'Mirage Prime',
    abilities: [
      { key: '1', name: 'Hall of Malevolence' },
      { key: '2', name: 'Sleight of Hand' },
      { key: '3', name: 'Eclipse' },
      { key: '4', name: 'Total Eclipse' },
    ],
    subsumeAbility: 'Eclipse',
    subsumeKey: '3',
  },
];
