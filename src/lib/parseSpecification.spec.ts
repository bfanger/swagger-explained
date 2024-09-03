import { describe, expect, it } from "vitest";
import type { Specification } from "./types";
import parseSpecification from "./parseSpecification";

describe("parseSpecification", () => {
  const example: Specification = {
    openapi: "3.0.0",
    info: { version: "1.0.0", title: "Example api" },
  };
  it("should parse the example without errors", () => {
    const tree = parseSpecification(example);
    expect(tree.type).toBe("OPENAPI");
    expect(tree.nodes?.[0]).toEqual({
      type: "VALUE",
      name: "openapi",
      value: "3.0.0",
    });
  });
});
