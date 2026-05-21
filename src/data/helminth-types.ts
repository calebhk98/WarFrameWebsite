// helminth-types.ts -- shared TypeScript interfaces for the Helminth subsystem.
// Consumed by helminth-costs.ts, helminth-synergies.ts, and helminth-data-*.ts.

export interface HelminthAbility {
  readonly key: '1' | '2' | '3' | '4';
  readonly name: string;
}

export interface HelminthEntry {
  readonly slug: string;
  readonly name: string;
  readonly abilities: readonly HelminthAbility[];
  readonly subsumeAbility: string;
  readonly subsumeKey: '1' | '2' | '3' | '4';
}

// Helminth resource costs for subsuming any ability (universal flat cost).
// Source: https://warframe.fandom.com/wiki/Helminth#Subsume
export interface HelminthResource {
  readonly name: string;
  readonly amount: number;
  readonly description: string;
}

// Known popular synergy combos between a base and a subsume frame.
export interface SynergyNote {
  readonly baseSlug: string;
  readonly subsumeSlug: string;
  readonly notes: readonly string[];
}
