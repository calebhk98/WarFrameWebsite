// frame-graph-client.ts -- client-side interaction logic for /frame-graph.
// Reads NODES, EDGES, TYPE_COLOR injected by the Astro page via window globals.

interface NodePos {
  slug: string;
  label: string;
  cx: number;
  cy: number;
}

interface Edge {
  from: string;
  to: string;
  type: string;
  note: string;
}

interface FrameGraphGlobals {
  NODES: NodePos[];
  EDGES: Edge[];
  TYPE_COLOR: Record<string, string>;
}

const g = window as Window & typeof globalThis & FrameGraphGlobals;
const NODES: NodePos[] = g.NODES;
const EDGES: Edge[] = g.EDGES;
const TYPE_COLOR: Record<string, string> = g.TYPE_COLOR;

let activeFilter = 'all';
let selectedSlug: string | null = null;

const tooltip = document.getElementById('tooltip');
const panelHint = document.getElementById('panel-hint');
const panelContent = document.getElementById('panel-content');
const panelName = document.getElementById('panel-name');
const panelOutgoing = document.getElementById('panel-outgoing');
const panelIncoming = document.getElementById('panel-incoming');

function escHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function typeLabel(t: string): string {
  const map: Record<string, string> = {
    buffs: 'Buffs',
    synergy: 'Synergy',
    'subsume-pair': 'Subsume pair',
    'team-comp': 'Team comp',
  };
  return map[t] ?? t;
}

function nodeLabel(slug: string): string {
  const n = NODES.find((node) => node.slug === slug);
  return n ? n.label : slug;
}

function applyFilter(type: string): void {
  activeFilter = type;
  document.querySelectorAll<SVGLineElement>('.fg-edge').forEach((e) => {
    const et = e.getAttribute('data-type');
    const show = type === 'all' || et === type;
    e.classList.toggle('hidden', !show);
  });
  document.querySelectorAll<HTMLElement>('.filter-chip').forEach((chip) => {
    const ct = chip.getAttribute('data-type') ?? '';
    chip.setAttribute('aria-pressed', ct === type ? 'true' : 'false');
    if (ct === type) {
      chip.style.background = ct === 'all' ? '#4a3f38' : (TYPE_COLOR[ct] ?? '#888') + '33';
      chip.style.fontWeight = '700';
    } else {
      chip.style.background = '';
      chip.style.fontWeight = '';
    }
  });
}

function buildEdgeHtml(edges: Edge[], dir: 'out' | 'in'): string {
  if (!edges.length) return '';
  const heading = dir === 'out' ? 'Outgoing' : 'Incoming';
  const items = edges.map((e) => {
    const col = TYPE_COLOR[e.type] ?? '#888';
    const label = dir === 'out'
      ? `${typeLabel(e.type)} &rarr; ${escHtml(nodeLabel(e.to))}`
      : `${escHtml(nodeLabel(e.from))} &rarr; ${typeLabel(e.type)}`;
    return `<div class="mb-3 border-l-2 pl-3" style="border-color:${escHtml(col)}">`
      + `<p class="text-xs font-semibold" style="color:${escHtml(col)}">${label}</p>`
      + `<p class="text-xs text-brand-cream/60 mt-0.5">${escHtml(e.note)}</p>`
      + `</div>`;
  }).join('');
  const marginTop = dir === 'in' ? ' mt-3' : '';
  return `<h3 class="text-xs uppercase tracking-widest text-brand-cream/50 font-semibold mb-2${marginTop}">${heading}</h3>${items}`;
}

function showPanel(slug: string): void {
  selectedSlug = slug;
  if (panelHint) panelHint.style.display = 'none';
  panelContent?.classList.remove('hidden');
  if (panelName) panelName.textContent = nodeLabel(slug);

  const outEdges = EDGES.filter((e) => e.from === slug);
  const inEdges = EDGES.filter((e) => e.to === slug);
  if (panelOutgoing) panelOutgoing.innerHTML = buildEdgeHtml(outEdges, 'out');
  if (panelIncoming) panelIncoming.innerHTML = buildEdgeHtml(inEdges, 'in');

  document.querySelectorAll('.fg-circle').forEach((c) => c.classList.remove('selected'));
  const group = document.querySelector(`[data-slug="${slug}"]`);
  group?.querySelector('.fg-circle')?.classList.add('selected');
}

function showTooltip(e: MouseEvent, note: string): void {
  if (!tooltip) return;
  tooltip.style.display = 'block';
  tooltip.textContent = note;
  tooltip.style.left = `${e.clientX + 14}px`;
  tooltip.style.top = `${e.clientY - 8}px`;
}

function hideTooltip(): void {
  if (tooltip) tooltip.style.display = 'none';
}

// Node interactions
document.querySelectorAll<HTMLElement>('.fg-node').forEach((g) => {
  const slug = g.getAttribute('data-slug');
  if (!slug) return;
  g.addEventListener('click', () => showPanel(slug));
  g.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    ev.preventDefault();
    showPanel(slug);
  });
});

// Arrow-key navigation between nodes
document.addEventListener('keydown', (ev) => {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
  if (!selectedSlug) return;
  ev.preventDefault();
  const idx = NODES.findIndex((n) => n.slug === selectedSlug);
  if (idx < 0) return;
  const isForward = ev.key === 'ArrowRight' || ev.key === 'ArrowDown';
  const next = isForward ? (idx + 1) % NODES.length : (idx - 1 + NODES.length) % NODES.length;
  const nextNode = NODES[next];
  if (!nextNode) return;
  const nextSlug = nextNode.slug;
  showPanel(nextSlug);
  document.querySelector<HTMLElement>(`[data-slug="${nextSlug}"]`)?.focus();
});

// Edge transparent hit-area + tooltip
document.querySelectorAll<SVGLineElement>('.fg-edge').forEach((el) => {
  const note = el.getAttribute('data-note') ?? '';
  const wrapper = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  wrapper.setAttribute('x1', el.getAttribute('x1') ?? '0');
  wrapper.setAttribute('y1', el.getAttribute('y1') ?? '0');
  wrapper.setAttribute('x2', el.getAttribute('x2') ?? '0');
  wrapper.setAttribute('y2', el.getAttribute('y2') ?? '0');
  wrapper.setAttribute('stroke', 'transparent');
  wrapper.setAttribute('stroke-width', '12');
  wrapper.style.cursor = 'pointer';
  wrapper.addEventListener('mousemove', (ev) => showTooltip(ev, note));
  wrapper.addEventListener('mouseleave', hideTooltip);
  el.parentNode?.insertBefore(wrapper, el.nextSibling);
});

// Filter chips
document.querySelectorAll<HTMLElement>('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const t = chip.getAttribute('data-type') ?? 'all';
    applyFilter(t);
  });
});

applyFilter('all');
