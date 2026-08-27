import { useState } from "react";
import { phases } from "./data/phases";
import SoftgoalGraph from "./components/SoftgoalGraph";
import Legend from "./components/Legend";

export default function App() {
  const [active, setActive] = useState(0);
  const phase = phases[active];

  return (
    <div className="min-h-screen w-full">
      {/* Cabeçalho institucional */}
      <header className="border-b border-border bg-card/70 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-block h-6 w-1.5 bg-primary" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                  INFORMA.BR · Lei de Acesso à Informação
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight max-w-2xl">
                Framework NFR da Jornada do Pedido de Acesso
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
                Grafos de interdependência de softgoals (SIG) mapeando requisitos
                não-funcionais — rastreabilidade, transparência e conformidade
                legal — ao longo das seis fases do fluxo LAI.
              </p>
            </div>
            <dl className="flex gap-8 font-mono text-xs">
              <Stat k="Fases" v="06" />
              <Stat k="SLA legal" v="20 dias" />
              <Stat k="Instâncias" v="04" />
            </dl>
          </div>
        </div>
      </header>

      {/* Trilha de fases */}
      <nav className="border-b border-border bg-background/60 sticky top-0 z-10 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl overflow-x-auto px-6 sm:px-10">
          <ol className="flex min-w-max">
            {phases.map((p, i) => {
              const on = i === active;
              return (
                <li key={p.id} className="flex items-center">
                  <button
                    onClick={() => setActive(i)}
                    className={`group flex items-center gap-3 py-4 pr-6 transition-colors ${
                      on ? "" : "opacity-55 hover:opacity-100"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold transition-colors ${
                        on
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground group-hover:border-foreground"
                      }`}
                    >
                      {String(p.index).padStart(2, "0")}
                    </span>
                    <span className="text-left">
                      <span className={`block text-sm font-semibold ${on ? "text-foreground" : ""}`}>
                        {p.title}
                      </span>
                    </span>
                  </button>
                  {i < phases.length - 1 && (
                    <span className="mr-6 h-px w-6 shrink-0 bg-border" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      {/* Corpo */}
      <main className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Painel descritivo */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {phase.code}
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight">
              {phase.title}
            </h2>
            <p className="mt-3 font-medium text-secondary-foreground">
              {phase.summary}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {phase.narrative}
            </p>

            <h3 className="mt-7 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Softgoals em foco
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {phase.nfrFocus.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium"
                >
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-2">
              <button
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                disabled={active === 0}
                className="flex-1 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary disabled:opacity-40 disabled:hover:bg-transparent"
              >
                ← Anterior
              </button>
              <button
                onClick={() => setActive((a) => Math.min(phases.length - 1, a + 1))}
                disabled={active === phases.length - 1}
                className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Próxima →
              </button>
            </div>
          </aside>

          {/* Grafo */}
          <section>
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Softgoal Interdependency Graph
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {phase.nodes.length} nós · {phase.edges.length} contribuições
                </span>
              </div>
              <SoftgoalGraph phase={phase} />
            </div>

            <div className="mt-6 rounded-lg border border-border bg-card/60 p-6">
              <Legend />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-10">
          <p className="font-mono text-xs text-muted-foreground">
            Notação: NFR Framework (Chung, Nixon, Yu & Mylopoulos) · Domínio: LAI
            nº 12.527/2011 · Sistema INFORMA.BR
          </p>
        </div>
      </footer>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="mt-1 text-lg font-semibold text-foreground">{v}</dd>
    </div>
  );
}
