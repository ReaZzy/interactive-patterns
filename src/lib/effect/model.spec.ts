import { Effect } from "effect";
import { LoadableModel, Model } from "./model";
import { describe, it, expect, mock } from "bun:test";

describe("Model", () => {
  it("should get the value", () => {
    const model = new Model(42);
    expect(model.value).toBe(42);
  });

  it("should change the value", () => {
    const model = new Model("Hello");
    model.setValue("World");
    expect(model.value).toBe("World");
  });

  it("should call listeners on value change", () => {
    const model = new Model(0);
    const listener = mock();
    model.subscribe(listener);
    model.setValue(1);
    expect(listener).toHaveBeenCalledWith(1);
    model.setValue(2);
    expect(listener).toHaveBeenCalledWith(2);
  });

  it("should not call listeners if the value does not change", () => {
    const model = new Model(0);
    const listener = mock();
    model.subscribe(listener);
    model.setValue(0);
    expect(listener).not.toHaveBeenCalled();
  });

  it("should allow unsubscribing listeners", () => {
    const model = new Model(0);
    const listener = mock();
    const unsubscribe = model.subscribe(listener);
    model.setValue(1);
    expect(listener).toHaveBeenCalledWith(1);
    unsubscribe();
    model.setValue(2);
    expect(listener).not.toHaveBeenCalledWith(2);
  });
});

describe("LoadableModel", () => {
  it("should load the value", async () => {
    const loader = Effect.succeed("Loaded Value");
    const model = new LoadableModel(() => loader, "Initial Value");
    expect(model.value).toBe("Initial Value");
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(model.value).toBe("Loaded Value");
  });
});
