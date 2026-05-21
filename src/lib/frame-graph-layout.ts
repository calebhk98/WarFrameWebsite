// frame-graph-layout.ts -- Server-side SVG layout computation for /frame-graph.
// Converts the flat GRAPH_NODES list into positioned circles on a radial layout.

import { GRAPH_NODES, FRAME_RELATIONSHIPS, nodeLabel } from '../data/frame-relationships';
import type { RelationshipType } from '../data/frame-relationships';

export const SVG_W = 900;
export const SVG_H = 700;
export const NODE_R = 28;

const CENTER_X = SVG_W / 2;
const CENTER_Y = SVG_H / 2;
const ORBIT_R = 290;

export interface NodePos {
  slug: string;
  label: string;
  cx: number;
  cy: number;
}

export const TYPE_COLOR: Record<RelationshipType, string> = {
  buffs: '#f97316',
  synergy: '#22d3ee',
  'subsume-pair': '#a78bfa',
  'team-comp': '#4ade80',
};

export const nodePosArr: NodePos[] = GRAPH_NODES.map((slug, i) => {
  const angle = (2 * Math.PI * i) / GRAPH_NODES.length - Math.PI / 2;
  return {
    slug,
    label: nodeLabel(slug),
    cx: Math.round(CENTER_X + ORBIT_R * Math.cos(angle)),
    cy: Math.round(CENTER_Y + ORBIT_R * Math.sin(angle)),
  };
});

export const nodeBySlug: Record<string, NodePos> = Object.fromEntries(
  nodePosArr.map((n) => [n.slug, n]),
);

export const EDGES = FRAME_RELATIONSHIPS;
