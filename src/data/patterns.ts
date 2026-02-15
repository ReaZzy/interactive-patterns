export interface Pattern {
  id: string;
  name: string;
  category: "creational" | "structural" | "behavioral";
  description: string;
  ascii: string;
}

export const patterns: Pattern[] = [
  {
    id: "singleton",
    name: "Singleton",
    category: "creational",
    description:
      "Ensures a class has only one instance and provides a global point of access to it.",
    ascii: `
    +-------------+
    |  Singleton  |
    +------+------+
           |
      .----+----.
      | instance |
      '----+----'
           |
    [only one ever]`,
  },
  {
    id: "factory",
    name: "Factory",
    category: "creational",
    description:
      "Defines an interface for creating objects, letting subclasses decide which class to instantiate.",
    ascii: `
      +----------+
      | Factory  |
      +----+-----+
           |
     .-----+------.
     |      |      |
    [A]    [B]    [C]
  product product product`,
  },
  {
    id: "observer",
    name: "Observer",
    category: "behavioral",
    description:
      "Defines a one-to-many dependency so that when one object changes state, all dependents are notified.",
    ascii: `
    +-----------+
    |  Subject  |---notify--->
    +-----+-----+
          |
    .-----+------.
    |      |      |
   [O1]  [O2]  [O3]
   sub   sub   sub`,
  },
  {
    id: "strategy",
    name: "Strategy",
    category: "behavioral",
    description:
      "Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.",
    ascii: `
    +----------+
    | Context  |
    +----+-----+
         |
    +----+-----+
    | Strategy |<----interface
    +----+-----+
    |    |     |
   [A]  [B]  [C]`,
  },
  {
    id: "decorator",
    name: "Decorator",
    category: "structural",
    description:
      "Attaches additional responsibilities to an object dynamically, providing a flexible alternative to subclassing.",
    ascii: `
    +------------+
    | Component  |
    +-----+------+
          |
    +-----+------+
    | Decorator  |--wraps-->
    +-----+------+
          |
    +-----+------+
    | ConcreteOp |
    +------------+`,
  },
  {
    id: "adapter",
    name: "Adapter",
    category: "structural",
    description:
      "Converts the interface of a class into another interface clients expect, letting incompatible classes work together.",
    ascii: `
  +---------+     +---------+
  | Client  |---->| Adapter |
  +---------+     +----+----+
                       |
                  +----+----+
                  | Adaptee |
                  +---------+
               (incompatible)`,
  },
];

export const categories = [
  { key: "creational" as const, label: "Creational" },
  { key: "structural" as const, label: "Structural" },
  { key: "behavioral" as const, label: "Behavioral" },
];
