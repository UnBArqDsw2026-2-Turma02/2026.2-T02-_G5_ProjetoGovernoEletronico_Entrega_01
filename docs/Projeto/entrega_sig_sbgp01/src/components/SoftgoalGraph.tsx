import { useMemo, useState } from "react";
import {
  CONTRIB_LABEL,
  type Contribution,
  type Phase,
  type SigNode,
} from "../data/phases";

const CONTRIB_COLOR: Record<Contribution, string> = {
  make: "var(--make)",
  help: "var(--help)",
  hurt: "var(--hurt)",
  break: "var(--break)",
  and: "var(--muted-foreground)",
  or: "var(--muted-foreground)",
};

const STATUS_GLYPH: Record<string, string> = {
  satisficed: "✓",
  denied: "✗",
  weak: "◐",
  undecided: "?",
};

const STATUS_COLOR: Record<string, string> = {
  satisficed: "var(--make)",
  denied: "var(--deny)",
  weak: "var(--warn)",
  undecided: "var(--muted-foreground)",
};

// dimensões aproximadas de cada nó para cálculo de bordas
function nodeSize(n: SigNode) {
  if (n.kind === "operationalizing") return { w: n.w ?? 170, h: 46 };
  return { w: n.w ?? 156, h: 92 }; // clouds
}

// ponto na borda do nó em direção a (tx, ty)
function edgePoint(n: SigNode, tx: number, ty: number) {
  const { w, h } = nodeSize(n);
  const dx = tx - n.x;
  const dy = ty - n.y;
  const ang = Math.atan2(dy, dx);
  if (n.kind === "operationalizing") {
    const rx = w / 2;
    const ry = h / 2;
    const t = Math.min(
      rx / Math.max(Math.abs(Math.cos(ang)), 1e-6),
      ry / Math.max(Math.abs(Math.sin(ang)), 1e-6),
    );
    return { x: n.x + Math.cos(ang) * t, y: n.y + Math.sin(ang) * t };
  }
  // elipse (cloud)
  const rx = w / 2 - 2;
  const ry = h / 2 - 6;
  return { x: n.x + rx * Math.cos(ang), y: n.y + ry * Math.sin(ang) };
}

function cloudPath(cx: number, cy: number, w: number, h: number) {
  // caminho de "nuvem" NFR estilizada
  const rx = w / 2;
  const ry = h / 2;
  const l = cx - rx;
  const t = cy - ry;
  const s = w / 156;
  return `M ${l + 30 * s} ${t + 62 * s}
    a ${22 * s} ${22 * s} 0 0 1 ${-2 * s} ${-42 * s}
    a ${26 * s} ${26 * s} 0 0 1 ${44 * s} ${-16 * s}
    a ${30 * s} ${30 * s} 0 0 1 ${56 * s} ${6 * s}
    a ${22 * s} ${22 * s} 0 0 1 ${16 * s} ${40 * s}
    a ${20 * s} ${20 * s} 0 0 1 ${-30 * s} ${20 * s}
    a ${26 * s} ${26 * s} 0 0 1 ${-50 * s} ${4 * s}
    a ${24 * s} ${24 * s} 0 0 1 ${-34 * s} ${-12 * s} Z`;
}

export default function SoftgoalGraph({ phase }: { phase: Phase }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const nodeById = useMemo(
    () => Object.fromEntries(phase.nodes.map((n) => [n.id, n])),
    [phase],
  );

  return (
    <svg
      viewBox="0 0 960 600"
      className="w-full h-auto select-none"
      role="img"
      aria-label={`Grafo de interdependência de softgoals — ${phase.title}`}
    >
      <defs>
        {(["make", "help", "hurt", "break"] as Contribution[]).map((k) => (
          <marker
            key={k}
            id={`arrow-${phase.id}-${k}`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={CONTRIB_COLOR[k]} />
          </marker>
        ))}
      </defs>

      {/* arestas de contribuição */}
      {phase.edges.map((e, i) => {
        const from = nodeById[e.from];
        const to = nodeById[e.to];
        if (!from || !to) return null;
        const p1 = edgePoint(from, to.x, to.y);
        const p2 = edgePoint(to, from.x, from.y);
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const active =
          hovered === e.from || hovered === e.to || hovered === null;
        const dashed = e.kind === "help" || e.kind === "hurt";
        return (
          <g key={i} opacity={active ? 1 : 0.18} className="transition-opacity">
            <line
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={CONTRIB_COLOR[e.kind]}
              strokeWidth={e.kind === "make" || e.kind === "break" ? 2 : 1.5}
              strokeDasharray={dashed ? "5 4" : undefined}
              markerEnd={`url(#arrow-${phase.id}-${e.kind})`}
            />
            <g>
              <circle cx={mx} cy={my} r={11} fill="var(--card)" stroke={CONTRIB_COLOR[e.kind]} strokeWidth={1} />
              <text
                x={mx}
                y={my + 3.5}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={CONTRIB_LABEL[e.kind].length > 1 ? 9 : 12}
                fontWeight={600}
                fill={CONTRIB_COLOR[e.kind]}
              >
                {CONTRIB_LABEL[e.kind]}
              </text>
            </g>
          </g>
        );
      })}

      {/* nós */}
      {phase.nodes.map((n) => {
        const { w, h } = nodeSize(n);
        const status = n.status ?? "undecided";
        const dim = hovered !== null && hovered !== n.id;
        return (
          <g
            key={n.id}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            opacity={dim ? 0.4 : 1}
            className="transition-opacity cursor-default"
          >
            {n.kind === "operationalizing" ? (
              <rect
                x={n.x - w / 2}
                y={n.y - h / 2}
                width={w}
                height={h}
                rx={7}
                fill="var(--foreground)"
                stroke="var(--foreground)"
              />
            ) : (
              <path
                d={cloudPath(n.x, n.y, w, h)}
                fill="var(--card)"
                stroke="var(--border)"
                strokeWidth={1.5}
                strokeDasharray={n.kind === "claim" ? "4 3" : undefined}
              />
            )}

            {/* rótulo */}
            <text
              x={n.x}
              y={n.kind === "operationalizing" ? n.y + 4 : n.topic ? n.y - 3 : n.y + 3}
              textAnchor="middle"
              fontFamily="var(--font-sans)"
              fontSize={n.kind === "operationalizing" ? 11.5 : 12.5}
              fontWeight={600}
              fill={n.kind === "operationalizing" ? "var(--card)" : "var(--foreground)"}
            >
              {wrapLabel(n.label, n.kind === "operationalizing" ? (w - 16) / 6.2 : 18).map(
                (line, li, arr) => (
                  <tspan
                    key={li}
                    x={n.x}
                    dy={li === 0 ? -(arr.length - 1) * 6 : 13}
                  >
                    {line}
                  </tspan>
                ),
              )}
            </text>
            {n.topic && n.kind !== "operationalizing" && (
              <text
                x={n.x}
                y={n.y + 16}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize={9.5}
                fill="var(--muted-foreground)"
              >
                {n.topic}
              </text>
            )}

            {/* selo de status (satisficing) */}
            {n.kind !== "operationalizing" && (
              <g>
                <circle
                  cx={n.x + w / 2 - 20}
                  cy={n.y - h / 2 + 22}
                  r={9}
                  fill="var(--card)"
                  stroke={STATUS_COLOR[status]}
                  strokeWidth={1.5}
                />
                <text
                  x={n.x + w / 2 - 20}
                  y={n.y - h / 2 + 26}
                  textAnchor="middle"
                  fontSize={11}
                  fontWeight={700}
                  fill={STATUS_COLOR[status]}
                >
                  {STATUS_GLYPH[status]}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function wrapLabel(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}
