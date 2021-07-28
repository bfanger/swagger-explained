/* eslint-disable no-use-before-define */
export const mapping = {
  oasObject: {
    props: { info: "infoObject" },
    maps: { paths: ["pathsObject", "pathItemObject"] },
    arrays: { servers: "serverObject" },
  },
  infoObject: {
    props: { contact: "contactoObject", license: "licenseObject" },
  },
  pathItemObject: {
    props: {
      get: "operationObject",
      put: "operationObject",
      post: "operationObject",
      delete: "operationObject",
      options: "operationObject",
      head: "operationObject",
      patch: "operationObject",
      trace: "operationObject",
    },
  },
} as const;

export type ValueNode = {
  type: "VALUE";
  name?: string;
  value: string | boolean | number;
};
export type ContainerNode = {
  type: keyof typeof mapping | "OBJECT" | "ARRAY";
  name?: string;
  nodes: AnyNode[];
};
export type AnyNode = ContainerNode | ValueNode;
