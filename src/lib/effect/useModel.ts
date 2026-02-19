import { useEffect, useMemo, useState } from "react";
import type { LoadableModel, Model } from "./model";

export const useModel = <TModel extends Model<any> | LoadableModel<any>>(
  factory: () => TModel,
  deps: React.DependencyList,
): TModel => {
  const model = useMemo(factory, deps);
  const [, setTick] = useState(0);
  useEffect(() => model.subscribe(() => setTick((t) => t + 1)), [model]);
  return model;
};
