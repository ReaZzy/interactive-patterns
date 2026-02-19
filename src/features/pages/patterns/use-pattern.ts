import { LoadableModel } from "@/lib/effect/model";
import { useModel } from "@/lib/effect/useModel";
import { PatternsService } from "@/services/patterns/patterns-service";
import { type Pattern } from "@/services/patterns/data";
import { Effect } from "effect";

export const usePattern = (id: string) =>
  useModel(
    () =>
      new LoadableModel(
        () =>
          Effect.gen(function* () {
            const service = yield* PatternsService;
            return yield* service.getPatternById(id);
          }).pipe(Effect.provide(PatternsService.Live)),
        null as Pattern | null,
      ),
    [id],
  );
