import * as fs from 'fs'
import KoaRouter from 'koa-router'
import * as oa from 'openapi3-ts'
import { RoutingControllersOptions } from 'routing-controllers'
import { buildSpec } from './builder'

export function getApiDocRoutes(
  info: oa.InfoObject,
  routingControllerOptions?: RoutingControllersOptions,
) {
  console.log(info)

  const router = new KoaRouter()
  const spec = buildSpec(info, routingControllerOptions)

  router.get('/swagger.json', (ctx: KoaRouter.IRouterContext) => {
    ctx.body = spec
  })

  router.get('/apidoc', (ctx: KoaRouter.IRouterContext) => {
    ctx.type = 'html'
    // tslint:disable-next-line: non-literal-fs-path
    ctx.body = fs.createReadStream(`${__dirname}/index.html`)
  })

  return router.routes()
}
