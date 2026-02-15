import { Link } from "@tanstack/react-router";
import { usePatterns } from "./use-patterns";

export function HomePage() {
  const model = usePatterns();

  if (model.state === "loading") {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-12">
        Loading patterns...
      </div>
    );
  }

  if (model.state === "error") {
    return (
      <div className="border-2 border-foreground/20 p-6" role="alert">
        <p className="text-sm font-bold">Failed to load patterns</p>
        <p className="text-xs text-muted-foreground mt-1">
          An unexpected error occurred.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {Object.entries(model.result).map(([category, patterns]) => (
        <section
          key={category}
          className="space-y-5"
          aria-labelledby={`category-${category}`}
        >
          <div className="flex items-center gap-3">
            <h2
              id={`category-${category}`}
              className="text-lg font-bold tracking-wide"
            >
              {category}
            </h2>
            <div
              className="flex-1 border-t-2 border-dashed border-foreground/10"
              aria-hidden="true"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {patterns.map((pattern) => (
              <div key={pattern.id} role="listitem" className="flex">
                <Link
                  to="/pattern/$patternId"
                  params={{ patternId: pattern.id }}
                  className="no-underline group block w-full"
                  aria-label={`${pattern.name} — ${pattern.description}`}
                >
                  <div className="ascii-card h-full flex flex-col border-2 border-solid border-foreground/15 bg-card transition-colors duration-200 ease-in-out group-hover:border-dashed group-hover:border-foreground/40">
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
      ))}
    </div>
  );
}
