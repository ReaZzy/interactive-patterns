import { useRunEffect } from "@/lib/effect/useRunEffect";
import { PatternsService } from "@/services/patterns/patterns-service";
import { Category } from "@/services/patterns/data";
import { Effect } from "effect";

export const usePatterns = () => {
  return useRunEffect(
    Effect.gen(function* () {
      const service = yield* PatternsService;
      const patterns = yield* service.getPatterns();

      return Object.values(Category).reduce(
        (acc, category) => {
          const matched = patterns.filter((p) => p.category === category);
          if (matched.length > 0) {
            acc[category] = matched;
          }
          return acc;
        },
        {} as Record<string, typeof patterns>,
      );
    }).pipe(Effect.provide(PatternsService.Live)),
  );
};
