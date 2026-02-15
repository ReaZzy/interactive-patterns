import { Context, Effect, Layer } from "effect";
import { patterns } from "./data";
import { NotFound } from "@/lib/effect/errors/not-found";

interface PatternsServiceShape {
  getPatterns: () => Effect.Effect<typeof patterns>;
  getPatternById: (
    id: string,
  ) => Effect.Effect<(typeof patterns)[number], NotFound>;
}

export class PatternsService extends Context.Tag("PatternsService")<
  PatternsService,
  PatternsServiceShape
>() {
  static Live = Layer.succeed(
    PatternsService,
    PatternsService.of({
      getPatterns: () => Effect.succeed(patterns),
      getPatternById: (id) =>
        Effect.gen(function* () {
          const pattern = patterns.find((p) => p.id === id);
          if (!pattern) {
            yield* Effect.fail(new NotFound(`Pattern with id ${id} not found`));
          }
          return pattern!;
        }),
    }),
  );
}
