// progression-types.ts -- shared TypeScript interfaces for progression track data.

export interface RecommendationItem {
  readonly name: string;
  readonly why: string;
  readonly link?: string;
}

export interface RecommendationSection {
  readonly title: string;
  readonly items: readonly RecommendationItem[];
}

export interface MilestoneNote {
  readonly mr: number;
  readonly label: string;
}

export interface ProgressionTrack {
  readonly mr_min: number;
  readonly mr_max: number;
  readonly label: string;
  readonly tagline: string;
  readonly nextMilestone: MilestoneNote;
  readonly sections: readonly RecommendationSection[];
}
