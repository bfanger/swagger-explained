type Contact = {
  name: string;
  url: string;
  email: string;
};
type Info = {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  // license?: License;
  version: string;
};

// v3.x spec
export type OpenApi = {
  openapi: string;
  info: Info;
};
export type Specification = OpenApi;
