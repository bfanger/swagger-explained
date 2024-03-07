import type { JSONValue, MappedNode, Mapping, Specification } from "./types";

function createRef(ref: string, part: unknown) {
  const escaped = `${part}`.replace("~", "~0").replace("/", "~1");
  return `${ref}/${escaped}`;
}

const openapi: Record<string, Mapping> = {
  // v3.x
  OPENAPI: {
    href: "#oas-object",
    props: {
      info: "OA_INFO",
      parameters: "OA_PARAMS",
      components: "OA_COMPONENTS",
    },
    maps: { paths: ["OA_PATHS", "OA_PATH"] },
    arrays: {
      servers: "OA_SERVER",
      tags: "OA_TAG",
      security: "OA_SECURITY_REQUIREMENT",
    },
  },
  OA_INFO: {
    href: "#info-object",
    props: { contact: "OA_CONTACT", license: "OA_LICENSE" },
  },
  OA_CONTACT: { href: "#contact-object" },
  OA_LICENSE: { href: "#license-object" },
  OA_SERVER: {
    href: "#server-object",
    maps: { variables: ["MAP", "OA_SERVER_VAR"] },
  },
  OA_SERVER_VAR: { href: "#server-variable-object" },
  OA_COMPONENTS: {
    href: "#components-object",
    maps: {
      schemas: ["MAP", "OA_SCHEMA"],
      responses: ["MAP", "OA_RESPONSE"],
      parameters: ["MAP", "OA_PARAM"],
      examples: ["MAP", "OA_EXAMPLE"],
      requestBodies: ["MAP", "OA_REQUEST_BODY"],
      headers: ["MAP", "OA_HEADER"],
      securitySchemes: ["MAP", "OA_SECURITY_SCHEME"],
      links: ["MAP", "OA_LINK"],
      callbacks: ["MAP", "OA_CALLBACK"],
    },
  },
  OA_PATHS: { href: "#paths-object" },
  OA_PATH: {
    href: "#path-item-object",
    props: {
      get: "OA_OPERATION",
      put: "OA_OPERATION",
      post: "OA_OPERATION",
      delete: "OA_OPERATION",
      options: "OA_OPERATION",
      head: "OA_OPERATION",
      patch: "OA_OPERATION",
      trace: "OA_OPERATION",
    },
    arrays: { servers: "OA_SERVER", parameters: "OA_PARAM" },
  },
  OA_OPERATION: {
    href: "#operation-object",
    props: {
      externalDocs: "OA_EXTERNAL_DOCS",
      requestBody: "OA_REQUEST_BODY",
    },
    maps: {
      responses: ["OA_RESPONSES", "OA_RESPONSE"],
      callbacks: ["MAP", "OA_CALLBACK"],
    },
    arrays: {
      parameters: "OA_PARAM",
      security: "OA_SECURITY_REQUIREMENT",
      servers: "OA_SERVER",
    },
  },
  OA_EXTERNAL_DOCS: { href: "#external-documentation-object" },
  OA_PARAMS: { href: "#parameter-definitions-object" },
  OA_PARAM: {
    href: "#parameter-object",
    props: {
      schema: "OA_SCHEMA",
    },
    maps: { examples: ["MAP", "OA_EXAMPLE"] },
  },
  OA_REQUEST_BODY: { href: "#request-body-object" },
  OA_MEDIA_TYPE: {
    href: "#media-type-object",
    props: { schema: "OA_SCHEMA" },
    maps: {
      examples: ["MAP", "OA_EXAMPLE"],
      encoding: ["MAP", "OA_ENCODING"],
    },
  },
  OA_ENCODING: { href: "#encoding-object" },
  OA_RESPONSES: { href: "#responses-object" },
  OA_RESPONSE: {
    href: "#response-object",
    maps: {
      headers: ["MAP", "OA_HEADER"],
      content: ["MAP", "OA_MEDIA_TYPE"],
      links: ["MAP", "OA_LINK"],
    },
  },
  OA_CALLBACK: { href: "#callback-object" },
  OA_EXAMPLE: { href: "#example-object" },
  OA_LINK: { href: "#link-object" },
  OA_HEADER: {
    href: "#header-object",
    props: {
      schema: "OA_SCHEMA",
    },
    maps: { examples: ["MAP", "OA_EXAMPLE"] },
  },
  OA_TAG: { href: "#tag-object" },
  OA_SCHEMA: {
    href: "#schema-object",
    props: { items: "OA_SCHEMA" },
    maps: {
      properties: ["MAP", "OA_SCHEMA"],
      additionalProperties: ["MAP", "OA_SCHEMA"],
    },
    arrays: {
      allOf: "OA_SCHEMA",
    },
  },
  OA_SECURITY_SCHEME: { href: "#security-scheme-object" },
  OA_SECURITY_REQUIREMENT: { href: "#security-requirement-object" },
};

// Swagger 2.0
const swagger: Record<string, Mapping> = {
  SWAGGER: {
    href: "#swagger-object",
    props: { info: "SWG_INFO" },
    maps: {
      paths: ["SWG_PATHS", "SWG_PATH"],
      definitions: ["SWG_DEFINITIONS", "SWG_SCHEMA"],
    },
    arrays: {
      tags: "SWG_TAG",
    },
  },
  SWG_INFO: { ...openapi.OA_INFO },
  SWG_SCHEMA: {
    href: "#schema-object",
    props: { items: "SWG_SCHEMA" },
    maps: {
      properties: ["MAP", "SWG_SCHEMA"],
    },
  },
  SWG_DEFINITIONS: { href: "#definitions-object" },
  SWG_PATHS: { href: "#paths-object" },
  SWG_PATH: {
    href: "#path-item-object",
    props: {
      get: "SWG_OPERATION",
      put: "SWG_OPERATION",
      post: "SWG_OPERATION",
      delete: "SWG_OPERATION",
      options: "SWG_OPERATION",
      head: "SWG_OPERATION",
      patch: "SWG_OPERATION",
    },
  },
  SWG_OPERATION: {
    href: "#operation-object",
    arrays: { parameters: "SWG_PARAM" },
    maps: {
      responses: ["SWG_RESPONSES", "SWG_RESPONSE"],
    },
  },
  SWG_PARAM: { href: "#parameter-object" },
  SWG_HEADERS: { href: "#headers-object" },
  SWG_RESPONSE: {
    href: "#response-object",
    props: { schema: "SWG_SCHEMA" },
    maps: {
      headers: ["SWG_HEADERS", "SWG_HEADER"],
    },
  },
  SWG_HEADER: { href: "#header-object" },
  SWG_RESPONSES: { href: "#responses-object" },
  SWG_TAG: { href: "#tag-object" },
};
const mapping: Record<string, Mapping> = {
  // Internal
  MAP: {},
  ARRAY: {},
  REF: { href: "#reference-object" },
  // Swagger
  ...swagger,
  // OpenAPI
  ...openapi,
};
function parseNode(
  ref: string,
  type: MappedNode["type"],
  data: JSONValue,
  name?: string,
): MappedNode {
  let config = mapping[type];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!config) {
    console.warn(`Unexpected type: ${type}`);
    config = {};
  }
  config.props = config.props || {};
  config.maps = config.maps || {};
  config.arrays = config.arrays || {};

  if (typeof data === "object") {
    const node: MappedNode = { type, href: config.href, name, nodes: [] };
    for (let key of Object.keys(data as any)) {
      const value = (data as any)[key];
      if (type === "ARRAY") {
        key = "";
      }
      node.nodes = node.nodes || [];
      if (config.props[key]) {
        node.nodes.push(
          parseNode(createRef(ref, key), config.props[key], value, key),
        );
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      } else if (config.maps[key]) {
        const subtype = config.maps[key][0];
        const map: MappedNode = {
          type: subtype,
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          href: mapping[subtype] ? mapping[subtype].href : undefined,
          name: key,
        };
        map.nodes = [];
        for (const [subkey, subvalue] of Object.entries(value)) {
          map.nodes.push(
            parseNode(
              createRef(createRef(ref, key), subkey),
              config.maps[key][1],
              subvalue as any,
              subkey,
            ),
          );
        }
        node.nodes.push(map);
      } else if (config.arrays[key]) {
        const map: MappedNode = {
          type: "ARRAY",
          name: key,
          nodes: [],
        };
        for (const subvalue of value) {
          map.nodes = map.nodes || [];
          map.nodes.push(
            parseNode(
              createRef(ref, subvalue),
              config.arrays[key],
              subvalue as any,
            ),
          );
        }
        node.nodes.push(map);
      } else if (typeof value === "object") {
        if (Array.isArray(value)) {
          node.nodes.push(parseNode(createRef(ref, key), "ARRAY", value, key));
        } else {
          node.nodes.push(parseNode(createRef(ref, key), "MAP", value, key));
        }
      } else {
        node.nodes.push({ type: "VALUE", name: key, value });
      }
    }
    return node;
  }
  throw new Error(`Parsing ${type} failed for ${ref}`);
}

export default function parseSpecification(spec: Specification): MappedNode {
  if (spec.openapi) {
    return parseNode("#", "OPENAPI", spec) as MappedNode;
  }
  if (spec.swagger) {
    return parseNode("#", "SWAGGER", spec) as MappedNode;
  }
  throw new Error("Unsupported spec");
}
