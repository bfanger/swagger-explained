import type { JSONValue } from "@sveltejs/kit/types/endpoint";

/* eslint-disable no-use-before-define */
export type Specification = { [key: string]: JSONValue } & (
  | { openapi: string }
  | { swagger: string }
);
export type Mapping = {
  href?: string;
  props?: Record<string, string>;
  maps?: Record<string, [string, string]>;
  arrays?: Record<string, string>;
};
export type ValueNode = {
  type: "VALUE";
  name?: string;
  value: string | boolean | number;
};
export type ContainerNode = {
  type: string;
  href?: string;
  name?: string;
  nodes: AnyNode[];
};
export type AnyNode = ContainerNode | ValueNode;
