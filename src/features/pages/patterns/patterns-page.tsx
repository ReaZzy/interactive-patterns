import { Link } from "@tanstack/react-router";
import { usePattern } from "./use-pattern";

export function PatternPage({ patternId }: { patternId: string }) {
  const model = usePattern(patternId);

  if (model.state === "loading") {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground py-12">
        <span className="cursor-blink">_</span>
        Loading pattern...
      </div>
    );
  }

  if (model.state === "error") {
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
            {model.error instanceof Error
              ? model.error.message
              : `No pattern matches "${patternId}"`}
          </p>
        </div>
      </div>
    );
  }

  const pattern = model.result;

  return (
    <div className="space-y-6">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-muted-foreground"
      >
        <Link
          to="/"
          className="hover:text-foreground transition-colors no-underline text-muted-foreground font-bold"
        >
          Patterns
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-muted-foreground capitalize">
          {pattern.category}
        </span>
        <span aria-hidden="true">/</span>
        <span className="text-foreground font-bold" aria-current="page">
          {pattern.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div
          className="lg:col-span-8 space-y-6"
          role="region"
          aria-label="Pattern details"
        >
          <div className="border-2 bg-card">
            <div className="p-5 space-y-3">
              <span className="text-xs text-muted-foreground capitalize">
                {pattern.category}
              </span>
              <h1 className="text-2xl font-bold tracking-tight">
                {pattern.name}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
                {pattern.description}
              </p>
            </div>
          </div>

          <div className="border-2 border-dashed border-foreground/20 bg-card/60 p-8 text-center space-y-3">
            <p className="text-sm font-bold text-foreground">
              Interactive demo coming soon
            </p>
            <p className="text-xs text-muted-foreground">
              You'll be able to run, step through, and reset a live{" "}
              {pattern.name} simulation here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
