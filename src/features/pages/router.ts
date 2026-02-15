import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { indexRoute } from "./homepage/route";
import { patternRoute } from "./patterns/route";

const routeTree = rootRoute.addChildren([indexRoute, patternRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
