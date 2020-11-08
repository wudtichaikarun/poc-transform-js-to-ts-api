import 'reflect-metadata'
import 'babel-polyfill'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import gracefulShutdown from 'http-graceful-shutdown'
import config from './config'
import logger from './libraries/logger'
import mongoConnection from './libraries/mongo/mongoConnection'
import useRoutingController from './bootstrap/useRoutingController'

const app = new Koa()

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

mongoConnection(config.database)
  .then((dbClient) => {
    logger.info(
      { event: 'execute' },
      `Connected to ${dbClient.host}:${dbClient.port}/${dbClient.name}`,
    )
  })
  .catch((err) => {
    logger.error({ err, event: 'error' }, 'Unable to connect to database server!')
    process.exit(1)
  })

useRoutingController(app)

const server = app.listen(config.port, () => {
  logger.info({ event: 'execute' }, `API server listening on ${config.port}`)
})

gracefulShutdown(server)

export default server
