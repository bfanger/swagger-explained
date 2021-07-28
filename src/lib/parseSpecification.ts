/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
import type { JSONValue } from "@sveltejs/kit/types/endpoint";
import type { Specification } from "./openapi.types";
import { AnyNode, ContainerNode, mapping } from "./specification.types";

function parseNode(
  type: ContainerNode["type"],
  data: JSONValue,
  name?: string
): AnyNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config: any = mapping[type] || {};
  config.props = config.props || {};
  config.maps = config.maps || {};
  config.arrays = config.arrays || {};

  if (typeof data === "object") {
    const node: ContainerNode = { type, name, nodes: [] };
    for (let key of Object.keys(data)) {
      const value = data[key];
      if (type === "ARRAY") {
        key = undefined;
      }
      if (config.props[key]) {
        node.nodes.push(parseNode(config.props[key], value, key));
      } else if (config.maps[key]) {
        const map: ContainerNode = {
          type: config.maps[key][0],
          name: key,
          nodes: [],
        };
        for (const [subkey, subvalue] of Object.entries(value)) {
          map.nodes.push(
            parseNode(config.maps[key][1], subvalue as any, subkey)
          );
        }
        node.nodes.push(map);
      } else if (config.arrays[key]) {
        const map: ContainerNode = { type: "ARRAY", name: key, nodes: [] };
        for (const subvalue of value) {
          map.nodes.push(parseNode(config.arrays[key], subvalue as any));
        }
        node.nodes.push(map);
      } else if (typeof value === "object") {
        if (Array.isArray(value)) {
          node.nodes.push(parseNode("ARRAY", value, key));
        } else {
          node.nodes.push(parseNode("OBJECT", value, key));
        }
      } else {
        node.nodes.push({ type: "VALUE", name: key, value });
      }
    }
    return node;
  }
  // eslint-disable-next-line no-console
  throw new Error(`Parsing ${type} failed`);
}

export default function parseSpecification(spec: Specification): ContainerNode {
  if (spec.openapi) {
    return parseNode("oasObject", spec) as ContainerNode;
  }
  throw new Error("Unsupported spec");
}
