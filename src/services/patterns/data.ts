export interface Pattern {
  id: string;
  name: string;
  category: (typeof Category)[keyof typeof Category];
  description: string;
}

export const Category = {
  creational: "Creational",
  structural: "Structural",
  behavioral: "Behavioral",
} as const;

export const patterns = [
  {
    id: "singleton",
    name: "Singleton",
    category: Category.creational,
    description:
      "Ensures a class has only one instance and provides a global point of access to it.",
  },
  {
    id: "factory",
    name: "Factory",
    category: Category.creational,
    description:
      "Defines an interface for creating objects, letting subclasses decide which class to instantiate.",
  },
  {
    id: "observer",
    name: "Observer",
    category: Category.behavioral,
    description:
      "Defines a one-to-many dependency so that when one object changes state, all dependents are notified.",
  },
  {
    id: "strategy",
    name: "Strategy",
    category: Category.behavioral,
    description:
      "Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.",
  },
  {
    id: "decorator",
    name: "Decorator",
    category: Category.structural,
    description:
      "Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing.",
  },
  {
    id: "adapter",
    name: "Adapter",
    category: Category.structural,
    description:
      "Converts the interface of a class into another interface clients expect, letting incompatible classes work together.",
  },
] satisfies Pattern[];
