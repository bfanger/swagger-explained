import type { JSONValue } from "@sveltejs/kit/types/endpoint";
import type { AnyNode, ContainerNode, Mapping, Specification } from "./types";

const openapi: Record<string, Mapping> = {
  // v3.x
  OPENAPI: {
    href: "#oasObject",
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
    href: "#infoObject",
    props: { contact: "OA_CONTACT", license: "OA_LICENSE" },
  },
  OA_CONTACT: { href: "#contactObject" },
  OA_LICENSE: { href: "#licenseObject" },
  OA_SERVER: {
    href: "#serverObject",
    maps: { variables: ["MAP", "OA_SERVER_VAR"] },
  },
  OA_SERVER_VAR: { href: "#serverVariableObject" },
  OA_COMPONENTS: {
    href: "#componentsObject",
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
  OA_PATHS: { href: "#pathsObject" },
  OA_PATH: {
    href: "#pathItemObject",
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
    href: "#operationObject",
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
      security: "securityRequirementObject",
      servers: "OA_SERVER",
    },
  },
  OA_EXTERNAL_DOCS: { href: "#externalDocumentationObject" },
  OA_PARAMS: { href: "#parameterDefinitionsObject" },
  OA_PARAM: {
    href: "#parameterObject",
    props: {
      schema: "OA_SCHEMA",
    },
    maps: { examples: ["MAP", "OA_EXAMPLE"] },
  },
  OA_REQUEST_BODY: { href: "#requestBodyObject" },
  OA_MEDIA_TYPE: {
    href: "#mediaTypeObject",
    props: { schema: "OA_SCHEMA" },
    maps: {
      examples: ["MAP", "OA_EXAMPLE"],
      encoding: ["MAP", "OA_ENCODING"],
    },
  },
  OA_ENCODING: { href: "#encodingObject" },
  OA_RESPONSES: { href: "#responsesObject" },
  OA_RESPONSE: {
    href: "#responseObject",
    maps: {
      headers: ["MAP", "OA_HEADER"],
      content: ["MAP", "OA_MEDIA_TYPE"],
      links: ["MAP", "OA_LINK"],
    },
  },
  OA_CALLBACK: { href: "#callbackObject" },
  OA_EXAMPLE: { href: "#exampleObject" },
  OA_LINK: { href: "#linkObject" },
  OA_HEADER: {
    href: "#headerObject",
    props: {
      schema: "OA_SCHEMA",
    },
    maps: { examples: ["MAP", "exampleObject"] },
  },
  OA_TAG: { href: "#tagObject" },
  OA_SCHEMA: {
    href: "#schemaObject",
    maps: { properties: ["MAP", "OA_SCHEMA"] },
  },
  OA_SECURITY_SCHEME: { href: "#securitySchemeObject" },
  OA_SECURITY_REQUIREMENT: { href: "#securityRequirementObject" },
};

// Swagger 2.0
const swagger: Record<string, Mapping> = {
  SWAGGER: {
    href: "#swaggerObject",
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
  SWG_SCHEMA: { ...openapi.OA_SCHEMA },
  SWG_DEFINITIONS: { href: "#definitionsObject" },
  SWG_PATHS: { href: "#pathsObject" },
  SWG_PATH: {
    href: "#pathItemObject",
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
    href: "#operationObject",
    arrays: { parameters: "SWG_PARAM" },
    maps: {
      responses: ["SWG_RESPONSES", "SWG_RESPONSE"],
    },
  },
  SWG_PARAM: { href: "#parameterObject" },
  SWG_HEADERS: { href: "#headersObject" },
  SWG_RESPONSE: {
    href: "#responseObject",
    maps: {
      headers: ["SWG_HEADERS", "SWG_HEADER"],
    },
  },
  SWG_HEADER: { href: "#headerObject" },
  SWG_RESPONSES: { href: "#responsesObject" },
  SWG_TAG: { href: "#tagObject" },
};
const mapping: Record<string, Mapping> = {
  // Internal
  MAP: {},
  ARRAY: {},
  REF: { href: "#referenceObject" },
  // Swagger
  ...swagger,
  // OpenAPI
  ...openapi,
};
function parseNode(
  type: ContainerNode["type"],
  data: JSONValue,
  name?: string
): AnyNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let config: any = mapping[type];
  if (!config) {
    // eslint-disable-next-line no-console
    console.warn(`Unexpected type: ${type}`);
    config = {};
  }
  config.props = config.props || {};
  config.maps = config.maps || {};
  config.arrays = config.arrays || {};

  if (typeof data === "object") {
    if (Object.keys(data).length === 1 && (<any>data).$ref) {
      return {
        type,
        name,
        href: mapping.REF.href,
        nodes: [{ type: "VALUE", name: "$ref", value: (<any>data).$ref }],
      };
    }
    const node: ContainerNode = { type, href: config.href, name, nodes: [] };
    for (let key of Object.keys(data)) {
      const value = data[key];
      if (type === "ARRAY") {
        key = undefined;
      }
      if (config.props[key]) {
        node.nodes.push(parseNode(config.props[key], value, key));
      } else if (config.maps[key]) {
        const subtype = config.maps[key][0];
        const map: ContainerNode = {
          type: subtype,
          href: mapping[subtype] ? mapping[subtype].href : undefined,
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
        const map: ContainerNode = {
          type: "ARRAY",
          name: key,
          nodes: [],
        };
        for (const subvalue of value) {
          map.nodes.push(parseNode(config.arrays[key], subvalue as any));
        }
        node.nodes.push(map);
      } else if (typeof value === "object") {
        if (Array.isArray(value)) {
          node.nodes.push(parseNode("ARRAY", value, key));
        } else {
          node.nodes.push(parseNode("MAP", value, key));
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
    return parseNode("OPENAPI", spec) as ContainerNode;
  }
  if (spec.swagger) {
    return parseNode("SWAGGER", spec) as ContainerNode;
  }
  throw new Error("Unsupported spec");
}
