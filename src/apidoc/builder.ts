import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import * as oa from 'openapi3-ts'
import 'reflect-metadata'
import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'

export function buildSpec(
  info: oa.InfoObject,
  routingControllerOptions?: RoutingControllersOptions,
) {
  // Parse class-validator classes into JSON Schema:
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  })

  // Parse routing-controllers classes into OpenAPI spec:
  const storage = getMetadataArgsStorage()
  return routingControllersToSpec(storage, routingControllerOptions, {
    components: {
      schemas,
    },
    info,
  })
}
