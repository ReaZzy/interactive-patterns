import { Effect, Either, Fiber } from "effect";
import { useEffect, useRef, useState } from "react";

type Result<Result, Error> =
  | {
      result: Result;
      error: null;
      state: "success";
    }
  | {
      result: null;
      error: null;
      state: "loading";
    }
  | {
      result: null;
      error: Error;
      state: "error";
    };

export const useRunEffect = <Success, Error>(
  effect: Effect.Effect<Success, Error, never>,
): Result<Success, Error> => {
  const effectRef = useRef(effect);
  effectRef.current = effect;

  const [result, setResult] = useState<Success | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] =
    useState<Result<Success, Error>["state"]>("loading");

  useEffect(() => {
    const program = Effect.gen(function* () {
      const failureOrSuccess = yield* Effect.either(effectRef.current);
      if (Either.isLeft(failureOrSuccess)) {
        setError(failureOrSuccess.left);
        setState("error");
        return;
      }

      setResult(failureOrSuccess.right);
      setState("success");
    });

    const fiber = Effect.runFork(program);
    return () => {
      Effect.runFork(Fiber.interrupt(fiber));
    };
  }, []);

  return {
    result,
    error,
    state,
  } as Result<Success, Error>;
};
