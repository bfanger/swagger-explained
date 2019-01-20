export default async function fetchSwaggerJson(url) {
  const swagger = await (await window.fetch(url)).json();
  augment(swagger);
  return swagger;
}
const method2annotation = {
  get: "@SWG\\Get",
  post: "@SWG\\Post",
  put: "@SWG\\Put",
  patch: "@SWG\\Patch",
  delete: "@SWG\\Delete",
  head: "@SWG\\Head",
  options: "@SWG\\Options"
};
function augment(swagger) {
  // augment data with explanations
  swagger._explained = {
    annotation: "@SWG\\Swagger",
    specification: "swaggerObject"
  };
  if (swagger.info) {
    swagger.info._explained = {
      annotation: "@SWG\\Info",
      specification: "infoObject"
    };
    if (swagger.info.contact) {
      swagger.info.contact._explained = {
        annotation: "@SWG\\Contact",
        specification: "contactObject"
      };
    }
    if (swagger.info.license) {
      swagger.info.license._explained = {
        annotation: "@SWG\\License",
        specification: "licenseObject"
      };
    }
  }
  if (swagger.paths) {
    for (const pathItem of Object.values(swagger.paths)) {
      pathItem._explained = {
        annotation: "@SWG\\Path",
        specification: "pathItemObject"
      };

      for (const method in pathItem) {
        const operation = pathItem[method];
        operation._explained = {
          specification: "operationObject",
          annotation: method2annotation[method]
        };
        if (operation.parameters) {
          for (const parameter of operation.parameters) {
            parameter._explained = {
              specification: "parameterObject",
              annotation: "@SWG\\Parameter"
            };
            explainJsonSpec(parameter, "parameter");
          }
        }
        if (operation.responses) {
          for (const response of Object.values(operation.responses)) {
            response._explained = {
              specification: "responseObject",
              annotation: "@SWG\\Response"
            };
            explainJsonSpec(response, "response");
            if (response.headers) {
              for (const header of Object.values(response.headers)) {
                header._explained = {
                  specification: "headerObject",
                  annotation: "@SWG\\Header"
                };
                explainJsonSpec(header, "header");
              }
            }
          }
          operation.responses._explained = {
            specification: "responsesObject"
          };
        }
      }
    }
    swagger.paths._explained = {
      specification: "pathsObject"
    };
  }
  if (swagger.definitions) {
    for (const definition of Object.values(swagger.definitions)) {
      definition._explained = {
        specification: "schemaObject",
        annotation: "@SWG\\Definition"
      };
      explainJsonSpec(definition, "definition");
    }
    swagger.definitions._explained = {
      specification: "definitionsObject"
    };
  }
  if (swagger.securityDefinitions) {
    for (const securityDefinition of Object.values(
      swagger.securityDefinitions
    )) {
      securityDefinition._explained = {
        annotation: "@SWG\\SecurityScheme",
        specification: "securitySchemeObject"
      };
    }
  }
  if (swagger.tags) {
    for (const tag of swagger.tags) {
      tag._explained = {
        annotation: "@SWG\\Tag",
        specification: "tagObject"
      };
    }
  }
}

function explainJsonSpec(object, type) {
  if (object.items) {
    if ((type === "parameter" && object.in !== "body") || type === "header") {
      object.items._explained = {
        annotation: "@SWG\\Items",
        specification: "itemsObject"
      };
      explainJsonSpec(object.items, "items");
    } else {
      object.items._explained = {
        annotation: "@SWG\\Items",
        specification: "schemaObject"
      };
      explainJsonSpec(object.items, "items");
    }
  }
  if (object.schema) {
    object.schema._explained = {
      annotation: "@SWG\\Schema",
      specification: "schemaObject"
    };
    explainJsonSpec(object.schema, "schema");
  }
  if (object.properties) {
    for (const property of Object.values(object.properties)) {
      property._explained = {
        annotation: "@SWG\\Property",
        specification: "schemaObject"
      };
      explainJsonSpec(property, "property");
    }
  }
  if (object.allOf) {
    for (const schema of object.allOf) {
      schema._explained = {
        specification: "schemaObject"
      };
      explainJsonSpec(schema, "schema");
    }
  }
  if (object.externalDocs) {
    object.externalDocs._explained = {
      annotation: "@SWG\\ExternalDocumentation",
      specification: "externalDocumentationObject"
    };
  }
  if (object.xml) {
    object.xml._explained = {
      annotation: "@SWG\\Xml",
      specification: "xmlObject"
    };
  }
}
