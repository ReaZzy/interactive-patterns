import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";
import { PatternPage } from "./patterns-page";

export const patternRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pattern/$patternId",
  component: PatternRouteComponent,
});

function PatternRouteComponent() {
  const { patternId } = patternRoute.useParams();
  return <PatternPage patternId={patternId} />;
}
