// eslint-disable-next-line prettier/prettier
import 'reflect-metadata'
import 'babel-polyfill'
import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import gracefulShutdown from 'http-graceful-shutdown'
import config from './config'
import logger from './libraries/logger'
import useRoutingController from './bootstrap/useRoutingController'

var app = new Koa()

app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb',
  }),
)
app.use(compress())
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id'],
  }),
)

useRoutingController(app)

const server = app.listen(config.port, () => {
  logger.info({ event: 'execute' }, `API server listening on ${config.port}`)
})

gracefulShutdown(server)

export default server
