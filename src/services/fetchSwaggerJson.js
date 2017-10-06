export default async function fetchSwaggerJson (url) {
  const swagger = await (await window.fetch(url)).json()
  augment(swagger)
  return swagger
}
const method2annotation = {
  get: '@SWG\\Get',
  post: '@SWG\\Post',
  put: '@SWG\\Put',
  patch: '@SWG\\Patch',
  delete: '@SWG\\Delete',
  head: '@SWG\\Head',
  options: '@SWG\\Options'
}
function augment (swagger) {
  // augment data with explanations
  swagger._explained = {
    annotation: '@SWG\\Swagger',
    spec: 'swaggerObject'
  }
  if (swagger.info) {
    swagger.info._explained = {
      annotation: '@SWG\\Info',
      spec: 'infoObject'
    }
    if (swagger.info.contact) {
      swagger.info.contact._explained = {
        annotation: '@SWG\\Contact',
        spec: 'contactObject'
      }
    }
    if (swagger.info.license) {
      swagger.info.license._explained = {
        annotation: '@SWG\\License',
        spec: 'licenseObject'
      }
    }
  }
  if (swagger.paths) {
    for (const pathItem of Object.values(swagger.paths)) {
      pathItem._explained = {
        annotation: '@SWG\\Path',
        spec: 'pathItemObject'
      }

      for (const method in pathItem) {
        const operation = pathItem[method]
        operation._explained = {
          spec: 'operationObject',
          annotation: method2annotation[method]
        }
        if (operation.parameters) {
          for (const parameter of operation.parameters) {
            parameter._explained = {
              spec: 'parameterObject',
              annotation: '@SWG\\Parameter'
            }
            explainJsonSpec(parameter, 'parameter')
          }
        }
        if (operation.responses) {
          for (const response of Object.values(operation.responses)) {
            response._explained = {
              spec: 'responseObject',
              annotation: '@SWG\\Response'
            }
            explainJsonSpec(response, 'response')
            if (response.headers) {
              for (const header of Object.values(response.headers)) {
                header._explained = {
                  spec: 'headerObject',
                  annotation: '@SWG\\Header'
                }
                explainJsonSpec(header, 'header')
              }
            }
          }
          operation.responses._explained = {
            spec: 'responsesObject'
          }
        }
      }
    }
    swagger.paths._explained = {
      spec: 'pathsObject'
    }
  }
  if (swagger.definitions) {
    for (const definition of Object.values(swagger.definitions)) {
      definition._explained = {
        spec: 'schemaObject',
        annotation: '@SWG\\Definition'
      }
      explainJsonSpec(definition, 'definition')
    }
    swagger.definitions._explained = {
      spec: 'definitionsObject'
    }
  }
  if (swagger.securityDefinitions) {
    for (const securityDefinition of Object.values(swagger.securityDefinitions)) {
      securityDefinition._explained = {
        annotation: '@SWG\\SecurityScheme',
        spec: 'securitySchemeObject'
      }
    }
  }
  if (swagger.tags) {
    for (const tag of swagger.tags) {
      tag._explained = {
        annotation: '@SWG\\Tag',
        spec: 'tagObject'
      }
    }
  }
}

function explainJsonSpec (object, type) {
  if (object.items) {
    if (type === 'parameter' && object.in !== 'body' || type === 'header') {
      object.items._explained = {
        annotation: '@SWG\\Items',
        spec: 'itemsObject'
      }
      explainJsonSpec(object.items, 'items')
    } else {
      object.items._explained = {
        annotation: '@SWG\\Items',
        spec: 'schemaObject'
      }
      explainJsonSpec(object.items, 'items')
    }
  }
  if (object.schema) {
    object.schema._explained = {
      annotation: '@SWG\\Schema',
      spec: 'schemaObject'
    }
    explainJsonSpec(object.schema, 'schema')
  }
  if (object.properties) {
    for (const property of Object.values(object.properties)) {
      property._explained = {
        annotation: '@SWG\\Property',
        spec: 'schemaObject'
      }
      explainJsonSpec(property, 'property')
    }
  }
  if (object.allOf) {
    for (const schema of object.allOf) {
      schema._explained = {
        spec: 'schemaObject'
      }
      explainJsonSpec(schema, 'schema')
    }
  }
  if (object.externalDocs) {
    object.externalDocs._explained = {
      annotation: '@SWG\\ExternalDocumentation',
      spec: 'externalDocumentationObject'
    }
  }
  if (object.xml) {
    object.xml._explained = {
      annotation: '@SWG\\Xml',
      spec: 'xmlObject'
    }
  }
}
