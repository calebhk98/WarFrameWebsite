// dojo-types.ts -- shared TypeScript interfaces for Dojo Planner data.

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
