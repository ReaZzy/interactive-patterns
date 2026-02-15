import { Link } from "@tanstack/react-router";
import { patterns, categories } from "@/data/patterns";

const categoryBorder = {
  creational: "border-ascii-green/30",
  structural: "border-ascii-blue/30",
  behavioral: "border-ascii-violet/30",
} as const;

const categoryDot = {
  creational: "bg-ascii-green",
  structural: "bg-ascii-blue",
  behavioral: "bg-ascii-violet",
} as const;

export function PatternPage({ patternId }: { patternId: string }) {
  const pattern = patterns.find((p) => p.id === patternId);
  const category = categories.find((c) => c.key === pattern?.category);

  if (!pattern || !category) {
    return (
      <div className="space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors no-underline font-bold"
        >
          {"<--"} back
        </Link>
        <div className="border-2 border-foreground/20 p-6" role="alert">
          <p className="text-sm font-bold">Pattern not found</p>
          <p className="text-xs text-muted-foreground mt-1">
            No pattern matches "{patternId}"
          </p>
        </div>
      </div>
    );
  }

  const siblings = patterns.filter(
    (p) => p.category === pattern.category && p.id !== pattern.id
  );

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link
          to="/"
          className="hover:text-foreground transition-colors no-underline text-muted-foreground font-bold"
        >
          Patterns
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-muted-foreground capitalize">{pattern.category}</span>
        <span aria-hidden="true">/</span>
        <span className="text-foreground font-bold" aria-current="page">{pattern.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6" role="region" aria-label="Pattern details">
          <div className={`border-2 ${categoryBorder[pattern.category]} bg-card`}>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${categoryDot[pattern.category]}`} aria-hidden="true" />
                <span className="text-xs text-muted-foreground capitalize">{category.label}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                {pattern.name}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
                {pattern.description}
              </p>
            </div>
          </div>

          <div className="border-2 border-foreground/15 bg-card" role="img" aria-label={`${pattern.name} pattern diagram`}>
            <div className="border-b-2 border-foreground/10 px-5 py-2.5 bg-secondary/50">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Diagram
              </span>
            </div>
            <div className="p-5">
              <div className="border-2 border-dashed border-foreground/15 p-5 bg-background">
                <pre className="text-xs sm:text-sm leading-relaxed text-foreground">
{pattern.ascii.trim()}
                </pre>
              </div>
            </div>
          </div>

          <div className="border-2 border-dashed border-foreground/20 bg-card/60 p-8 text-center space-y-3">
            <p className="text-sm font-bold text-foreground">
              Interactive demo coming soon
            </p>
            <p className="text-xs text-muted-foreground">
              You'll be able to run, step through, and reset a live {pattern.name} simulation here.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-5" aria-label="Pattern metadata">
          <div className="border-2 border-ascii-amber/40 bg-card">
            <div className="border-b-2 border-ascii-amber/20 px-4 py-2 bg-ascii-amber/5">
              <span className="text-[10px] font-bold text-ascii-amber uppercase tracking-widest">
                Quick Reference
              </span>
            </div>
            <dl className="p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Type</dt>
                <dd className="text-foreground font-bold capitalize">{pattern.category}</dd>
              </div>
              <div className="border-t-2 border-dashed border-foreground/10" />
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Intent</dt>
                <dd className="text-foreground font-bold">
                  {pattern.category === "creational"
                    ? "Object creation"
                    : pattern.category === "structural"
                      ? "Composition"
                      : "Communication"}
                </dd>
              </div>
              <div className="border-t-2 border-dashed border-foreground/10" />
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Scope</dt>
                <dd className="text-foreground font-bold">
                  {pattern.category === "creational"
                    ? "Class / Object"
                    : "Object"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-2 border-foreground/15 bg-card">
            <div className="border-b-2 border-foreground/10 px-4 py-2 bg-secondary/50">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                When to Use
              </span>
            </div>
            <div className="p-4">
              <ul className="text-xs text-muted-foreground space-y-1.5 list-none p-0">
                {(pattern.category === "creational"
                  ? [
                      "Need controlled instantiation",
                      "Want to hide creation logic",
                      "System should be independent of how objects are created",
                    ]
                  : pattern.category === "structural"
                    ? [
                        "Need to compose objects into larger structures",
                        "Want flexible composition over rigid inheritance",
                        "Adapting incompatible interfaces",
                      ]
                    : [
                        "Need loose coupling between interacting objects",
                        "Want to vary behavior independently",
                        "Multiple objects should react to state changes",
                      ]
                ).map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-foreground font-bold shrink-0" aria-hidden="true">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {siblings.length > 0 && (
            <nav className="border-2 border-foreground/15 bg-card" aria-label="Related patterns">
              <div className="border-b-2 border-foreground/10 px-4 py-2 bg-secondary/50">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Also in {category.label}
                </span>
              </div>
              <div className="p-2">
                {siblings.map((s) => (
                  <Link
                    key={s.id}
                    to="/pattern/$patternId"
                    params={{ patternId: s.id }}
                    className="flex items-center justify-between text-xs no-underline group px-3 py-2.5 border-2 border-transparent hover:border-foreground/15 transition-colors"
                  >
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors font-bold">
                      {s.name}
                    </span>
                    <span className="text-muted-foreground/40 group-hover:text-foreground transition-colors font-bold" aria-hidden="true">
                      {">"}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </aside>
      </div>
    </div>
  );
}
