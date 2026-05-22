// helminth-data-w-z.ts -- Helminth subsume data: Voruna through Zephyr Prime.
// Source: https://warframe.fandom.com/wiki/Helminth#Subsumable_Abilities
// Accessed: 2026-05-20

import type { HelminthEntry } from './helminth-types';

export const HELMINTH_DATA_W_Z: readonly HelminthEntry[] = [
  {
    slug: 'voruna',
    name: 'Voruna',
    abilities: [
      { key: '1', name: 'Shroud Of Dynar' },
      { key: '2', name: 'Fangs Of Raksh' },
      { key: '3', name: "Lycath's Hunt" },
      { key: '4', name: "Ulfrun's Descent" },
    ],
    subsumeAbility: "Lycath's Hunt",
    subsumeKey: '3',
  },
  {
    slug: 'wisp',
    name: 'Wisp',
    abilities: [
      { key: '1', name: 'Reservoirs' },
      { key: '2', name: 'Wil-O-Wisp' },
      { key: '3', name: 'Breach Surge' },
      { key: '4', name: 'Sol Gate' },
    ],
    subsumeAbility: 'Breach Surge',
    subsumeKey: '3',
  },
  {
    slug: 'wisp-prime',
    name: 'Wisp Prime',
    abilities: [
      { key: '1', name: 'Reservoirs' },
      { key: '2', name: 'Wil-O-Wisp' },
      { key: '3', name: 'Breach Surge' },
      { key: '4', name: 'Sol Gate' },
    ],
    subsumeAbility: 'Breach Surge',
    subsumeKey: '3',
  },
  {
    slug: 'wukong',
    name: 'Wukong',
    abilities: [
      { key: '1', name: 'Iron Jab' },
      { key: '2', name: 'Defy' },
      { key: '3', name: 'Cloud Walker' },
      { key: '4', name: 'Primal Fury' },
    ],
    subsumeAbility: 'Cloud Walker',
    subsumeKey: '3',
  },
  {
    slug: 'wukong-prime',
    name: 'Wukong Prime',
    abilities: [
      { key: '1', name: 'Iron Jab' },
      { key: '2', name: 'Defy' },
      { key: '3', name: 'Cloud Walker' },
      { key: '4', name: 'Primal Fury' },
    ],
    subsumeAbility: 'Cloud Walker',
    subsumeKey: '3',
  },
  {
    slug: 'xaku',
    name: 'Xaku',
    abilities: [
      { key: '1', name: "Xata's Whisper" },
      { key: '2', name: 'Grasp of Lohk' },
      { key: '3', name: 'The Lost' },
      { key: '4', name: 'The Vast Untime' },
    ],
    subsumeAbility: "Xata's Whisper",
    subsumeKey: '1',
  },
  {
    slug: 'xaku-prime',
    name: 'Xaku Prime',
    abilities: [
      { key: '1', name: "Xata's Whisper" },
      { key: '2', name: 'Grasp of Lohk' },
      { key: '3', name: 'The Lost' },
      { key: '4', name: 'The Vast Untime' },
    ],
    subsumeAbility: "Xata's Whisper",
    subsumeKey: '1',
  },
  {
    slug: 'yareli',
    name: 'Yareli',
    abilities: [
      { key: '1', name: 'Sea Snares' },
      { key: '2', name: 'Merulina' },
      { key: '3', name: 'Aquablades' },
      { key: '4', name: 'Riptide' },
    ],
    subsumeAbility: 'Aquablades',
    subsumeKey: '3',
  },
  {
    slug: 'zephyr',
    name: 'Zephyr',
    abilities: [
      { key: '1', name: 'Tail Wind' },
      { key: '2', name: 'Airburst' },
      { key: '3', name: 'Turbulence' },
      { key: '4', name: 'Tornado' },
    ],
    subsumeAbility: 'Airburst',
    subsumeKey: '2',
  },
  {
    slug: 'zephyr-prime',
    name: 'Zephyr Prime',
    abilities: [
      { key: '1', name: 'Tail Wind' },
      { key: '2', name: 'Airburst' },
      { key: '3', name: 'Turbulence' },
      { key: '4', name: 'Tornado' },
    ],
    subsumeAbility: 'Airburst',
    subsumeKey: '2',
  },
];
