import { useEffect, useMemo, useState } from "react";
import type { Model } from "./model";

export const useModel = <Value>(
  factory: () => Model<Value>,
  deps: React.DependencyList,
): Model<Value> => {
  const model = useMemo(factory, deps);
  const [, setTick] = useState(0);
  useEffect(() => model.subscribe(() => setTick((t) => t + 1)), [model]);
  return model;
};
