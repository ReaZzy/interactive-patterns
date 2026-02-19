import { LoadableModel } from "@/lib/effect/model";
import { useModel } from "@/lib/effect/useModel";
import { PatternsService } from "@/services/patterns/patterns-service";
import { Category, type Pattern } from "@/services/patterns/data";
import { Effect } from "effect";

export const usePatterns = () =>
  useModel(
    () =>
      new LoadableModel(
        () =>
          Effect.gen(function* () {
            const service = yield* PatternsService;
            const patterns = yield* service.getPatterns();
            return Object.values(Category).reduce(
              (acc, category) => {
                const matched = patterns.filter((p) => p.category === category);
                if (matched.length > 0) acc[category] = matched;
                return acc;
              },
              {} as Record<string, Pattern[]>,
            );
          }).pipe(Effect.provide(PatternsService.Live)),
        {} as Record<string, Pattern[]>,
      ),
    [],
  );
