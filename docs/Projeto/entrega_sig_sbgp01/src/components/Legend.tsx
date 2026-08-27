const contribs = [
  { sym: "++", label: "MAKE — satisfaz plenamente", color: "var(--make)", dash: false },
  { sym: "+", label: "HELP — contribui positivamente", color: "var(--help)", dash: true },
  { sym: "−", label: "HURT — contribui negativamente", color: "var(--hurt)", dash: true },
  { sym: "−−", label: "BREAK — nega o softgoal", color: "var(--break)", dash: false },
];

const status = [
  { g: "✓", label: "Satisfeito", color: "var(--make)" },
  { g: "◐", label: "Parcialmente satisfeito", color: "var(--warn)" },
  { g: "✗", label: "Negado", color: "var(--deny)" },
];

export default function Legend() {
  return (
    <div className="grid gap-6 sm:grid-cols-3 text-sm">
      <div>
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
          Tipos de nó
        </h4>
        <ul className="space-y-2.5">
          <li className="flex items-center gap-3">
            <svg width="34" height="24" viewBox="0 0 34 24">
              <ellipse cx="17" cy="12" rx="15" ry="9" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" />
            </svg>
            <span>Softgoal (NFR)</span>
          </li>
          <li className="flex items-center gap-3">
            <svg width="34" height="24" viewBox="0 0 34 24">
              <ellipse cx="17" cy="12" rx="15" ry="9" fill="var(--card)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
            <span>Claim / justificativa</span>
          </li>
          <li className="flex items-center gap-3">
            <svg width="34" height="24" viewBox="0 0 34 24">
              <rect x="3" y="4" width="28" height="16" rx="4" fill="var(--foreground)" />
            </svg>
            <span>Operacionalização</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
          Contribuições
        </h4>
        <ul className="space-y-2.5">
          {contribs.map((c) => (
            <li key={c.sym} className="flex items-center gap-3">
              <svg width="34" height="14" viewBox="0 0 34 14">
                <line x1="2" y1="7" x2="28" y2="7" stroke={c.color} strokeWidth="2" strokeDasharray={c.dash ? "4 3" : undefined} />
                <path d="M 26 3 L 32 7 L 26 11 z" fill={c.color} />
              </svg>
              <span className="font-mono text-xs font-semibold" style={{ color: c.color }}>
                {c.sym}
              </span>
              <span className="text-xs">{c.label.split(" — ")[1]}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
          Rótulos de satisficing
        </h4>
        <ul className="space-y-2.5">
          {status.map((s) => (
            <li key={s.g} className="flex items-center gap-3">
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full border text-sm font-bold"
                style={{ color: s.color, borderColor: s.color, background: "var(--card)" }}
              >
                {s.g}
              </span>
              <span className="text-xs">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
