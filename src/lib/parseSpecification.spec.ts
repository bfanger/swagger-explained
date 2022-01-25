import { describe, it, expect } from "vitest";
import parseSpecification from "./parseSpecification";
import type { Specification } from "./types";

describe("parseSpecification", () => {
  const example: Specification = {
    openapi: "3.0.0",
    info: { version: "1.0.0", title: "Example api" },
  };
  it("should", () => {
    const tree = parseSpecification(example);
    expect(tree.type).toBe("OPENAPI");
    expect(tree.nodes[0]).toEqual({
      type: "VALUE",
      name: "openapi",
      value: "3.0.0",
    });
  });
});
