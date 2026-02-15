import { createRootRoute, Outlet, Link } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-background dot-grid flex flex-col">
      <header
        className="border-b-2 border-foreground/10 bg-background/90 backdrop-blur-sm"
        role="banner"
      >
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
          <Link
            to="/"
            className="no-underline text-foreground flex items-center gap-3"
            aria-label="Interactive Patterns home"
          >
            <span className="text-sm text-muted-foreground" aria-hidden="true">
              {">"}
            </span>
            <span className="font-bold text-sm tracking-wide uppercase">
              interactive-patterns
            </span>
          </Link>
          <span
            className="text-xs text-muted-foreground hidden sm:block"
            aria-hidden="true"
          >
            {"// design patterns, visualized"}
          </span>
        </div>
      </header>
      <main
        id="main-content"
        className="mx-auto max-w-6xl px-6 py-8 flex-1 w-full"
        role="main"
      >
        <Outlet />
      </main>
    </div>
  );
}
