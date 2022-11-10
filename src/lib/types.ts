export type Specification = { [key: string]: JSONValue } & {
  openapi?: string;
  swagger?: string;
};
export type Mapping = {
  href?: string;
  props?: Record<string, string>;
  maps?: Record<string, [string, string]>;
  arrays?: Record<string, string>;
};

export type MappedNode = {
  type: string;
  href?: string;
  name?: string;
  value?: string | boolean | number;
  nodes?: MappedNode[];
};

export type JSONValue = string | number | boolean | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];
