// helminth-costs.ts -- Helminth subsume resource costs.
// Source: https://warframe.fandom.com/wiki/Helminth#Subsume
// Accessed: 2026-05-20
//
// Minimum cost per subsume is 1500 of one resource type. The Helminth will
// consume the cheapest available resource first. Exact per-frame costs may
// vary by Helminth rank. See the in-game Helminth Segment menu for current values.

import type { HelminthResource } from './helminth-types';

export const HELMINTH_SUBSUME_COST: readonly HelminthResource[] = [
  { name: 'Bile', amount: 1500, description: 'Yellow ichor from the Infestation' },
  { name: 'Calx', amount: 1500, description: 'Mineral secretion from Fortuna' },
  { name: 'Synthetics', amount: 1500, description: 'Orokin-era synthetic compounds' },
  { name: 'Pheromones', amount: 1500, description: 'Biological attractants from the Plains' },
  { name: 'Oxides', amount: 1500, description: 'Oxidised matter from the Void' },
  { name: 'Biotics', amount: 1500, description: 'Biological material from any mission' },
];
