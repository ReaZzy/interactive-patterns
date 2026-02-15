---
name: effect-ts
description: Write Effect-TS services, errors, and React hooks following this project's conventions. Use when creating new services, defining typed errors, or integrating Effect pipelines into React components.
user_invocable: true
---

# Effect-TS Skill

When the user asks you to create or modify Effect-TS code in this project, follow the conventions below exactly.

## Project Structure

```
src/
  lib/effect/
    useRunEffect.ts        # React hook for running Effects
    errors/                # Shared error types
  services/
    <domain>/
      data.ts              # Types and static data
      <domain>-service.ts  # Effect service definition
  features/
    pages/<page>/
      use-<thing>.ts       # React hooks consuming services
```

## Defining Errors

Place shared errors in `src/lib/effect/errors/`. Use plain classes extending `Error`:

```ts
// src/lib/effect/errors/not-found.ts
export class NotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFound";
  }
}
```

For domain-specific errors, use Effect's `Data.TaggedError` for discriminated unions:

```ts
import { Data } from "effect";

export class ValidationError extends Data.TaggedError("ValidationError")<{
  field: string;
  message: string;
}> {}
```

## Defining Services

Services use `Context.Tag` for dependency injection and `Layer.succeed` for the live implementation:

```ts
import { Context, Effect, Layer } from "effect";

interface MyServiceShape {
  getAll: () => Effect.Effect<Item[]>;
  getById: (id: string) => Effect.Effect<Item, NotFound>;
}

export class MyService extends Context.Tag("MyService")<
  MyService,
  MyServiceShape
>() {
  static Live = Layer.succeed(
    MyService,
    MyService.of({
      getAll: () => Effect.succeed(items),
      getById: (id) =>
        Effect.gen(function* () {
          const item = items.find((i) => i.id === id);
          if (!item) {
            yield* Effect.fail(new NotFound(`Item with id ${id} not found`));
          }
          return item!;
        }),
    }),
  );
}
```

Key rules:
- The tag string must match the class name: `Context.Tag("MyService")`
- Define a `Shape` interface for the service contract
- Expose a `static Live` layer using `Layer.succeed`
- Use `Effect.succeed` for infallible operations
- Use `Effect.fail` inside `Effect.gen` for fallible operations
- Type the error channel in `Effect.Effect<Success, Error>` explicitly

## Consuming Services in React

Use the `useRunEffect` hook from `src/lib/effect/useRunEffect.ts`. Always provide the live layer via `.pipe(Effect.provide(...))`:

```ts
import { useRunEffect } from "@/lib/effect/useRunEffect";
import { MyService } from "@/services/my-domain/my-service";
import { Effect } from "effect";

export const useMyData = () => {
  return useRunEffect(
    Effect.gen(function* () {
      const service = yield* MyService;
      return yield* service.getAll();
    }).pipe(Effect.provide(MyService.Live)),
  );
};
```

The hook returns a discriminated union:

```ts
type Result<Success, Error> =
  | { result: Success; error: null; state: "success" }
  | { result: null; error: null; state: "loading" }
  | { result: null; error: Error; state: "error" };
```

Handle all three states in the component:

```tsx
const { result, error, state } = useMyData();

if (state === "loading") return <LoadingSkeleton />;
if (state === "error") return <ErrorDisplay error={error} />;

// result is narrowed to non-null here
return <DataView data={result} />;
```

## Composing Multiple Services

When an effect needs multiple services, provide them together using `Layer.merge`:

```ts
import { Layer } from "effect";

Effect.gen(function* () {
  const svcA = yield* ServiceA;
  const svcB = yield* ServiceB;
  // ...
}).pipe(
  Effect.provide(Layer.merge(ServiceA.Live, ServiceB.Live)),
);
```

## Effect Patterns to Use

- `Effect.gen(function* () { ... })` for sequential, imperative-style pipelines
- `Effect.map`, `Effect.flatMap` for functional composition
- `Effect.all` for running multiple effects in parallel
- `Effect.catchTag` for recovering from specific tagged errors
- `Effect.provide` / `Effect.provideService` for dependency injection
- `Effect.succeed` / `Effect.fail` for lifting values into Effect

## Rules

- Never use `Effect.runPromise` or `Effect.runSync` in React components; always use `useRunEffect`
- Never provide services at the hook level with `Effect.provideService` inline; always use the `static Live` layer pattern
- Keep service shapes as interfaces, not inline types
- One service per file, co-located with its data
- Errors that are reused across services go in `src/lib/effect/errors/`
- Domain-specific errors stay in the service file or a sibling `errors.ts`
