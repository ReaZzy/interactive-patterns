import { useRunEffect } from "@/lib/effect/useRunEffect";
import { PatternsService } from "@/services/patterns/patterns-service";
import { Effect } from "effect";

export const usePattern = (id: string) => {
  return useRunEffect(
    Effect.gen(function* () {
      const service = yield* PatternsService;
      return yield* service.getPatternById(id);
    }).pipe(Effect.provide(PatternsService.Live)),
  );
};
