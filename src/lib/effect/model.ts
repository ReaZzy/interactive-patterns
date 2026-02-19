import { Effect, Either, SubscriptionRef } from "effect";

export class Model<Value = unknown> {
  private valueRef: SubscriptionRef.SubscriptionRef<Value>;
  private listeners: Array<(value: Value) => void> = [];

  constructor(value: Value) {
    this.valueRef = Effect.runSync(SubscriptionRef.make(value));
  }

  public getEffect(): Effect.Effect<Value> {
    return SubscriptionRef.get(this.valueRef);
  }

  public setValueEffect(value: Value): Effect.Effect<void> {
    return Effect.gen(this, function* () {
      const currentValue = yield* SubscriptionRef.get(this.valueRef);
      if (currentValue === value) {
        return;
      }

      yield* SubscriptionRef.set(this.valueRef, value);
      yield* Effect.all(
        this.listeners.map((listener) => Effect.succeed(listener(value))),
        { concurrency: "unbounded" },
      );
    });
  }

  public setValue(value: Value): void {
    if (this.value === value) return;
    Effect.runSync(SubscriptionRef.set(this.valueRef, value));
    for (const listener of this.listeners) {
      listener(value);
    }
  }

  public subscribe(listener: (value: Value) => void): VoidFunction {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  get value(): Value {
    return Effect.runSync(this.getEffect());
  }
}

export class LoadableModel<Value = unknown, E = unknown> extends Model<
  Value | E
> {
  public status: "loading" | "loaded" | "error" = "loading";
  constructor(
    private loader: () => Effect.Effect<Value, E>,
    public initialValue: Value,
  ) {
    super(initialValue);

    Effect.runFork(
      Effect.gen(this, function* () {
        this.status = "loading";
        const value = yield* Effect.either(this.loader());
        if (Either.isLeft(value)) {
          this.status = "error";
          yield* this.setValueEffect(value.left);
          return;
        }

        this.status = "loaded";
        yield* this.setValueEffect(value.right);
      }),
    );
  }
}
