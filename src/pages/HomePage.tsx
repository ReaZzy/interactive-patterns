import { Link } from "@tanstack/react-router";
import { patterns, categories } from "@/data/patterns";

const categoryDot = {
  creational: "bg-ascii-green",
  structural: "bg-ascii-blue",
  behavioral: "bg-ascii-violet",
} as const;

export function HomePage() {
  return (
    <div className="space-y-14">
      <section className="py-8 space-y-4 text-center" aria-labelledby="hero-title">
        <h1 id="hero-title" className="text-3xl sm:text-4xl font-bold tracking-tight">
          Interactive Patterns
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Design patterns you can see and play with.
          Pick one, poke around, break things.
        </p>
      </section>

      {categories.map((cat) => {
        const catPatterns = patterns.filter((p) => p.category === cat.key);

        return (
          <section key={cat.key} className="space-y-5" aria-labelledby={`cat-${cat.key}`}>
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${categoryDot[cat.key]}`} aria-hidden="true" />
              <h2 id={`cat-${cat.key}`} className="text-lg font-bold tracking-wide">
                {cat.label}
              </h2>
              <div className="flex-1 border-t-2 border-dashed border-foreground/10" aria-hidden="true" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
              {catPatterns.map((pattern) => (
                <div key={pattern.id} role="listitem" className="flex">
                  <Link
                    to="/pattern/$patternId"
                    params={{ patternId: pattern.id }}
                    className="no-underline group block w-full"
                    aria-label={`${pattern.name} — ${pattern.description}`}
                  >
                    <div className="ascii-card h-full flex flex-col border-2 border-foreground/15 bg-card transition-colors group-hover:border-foreground/40">
                      <div className="p-4 pb-3 border-b-2 border-foreground/8 bg-background">
                        <pre
                          className="text-[10px] leading-snug text-foreground/70 overflow-hidden"
                          aria-hidden="true"
                        >
{pattern.ascii.trim()}
                        </pre>
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col">
                        <h3 className="text-sm font-bold text-foreground">
                          {pattern.name}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                          {pattern.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
