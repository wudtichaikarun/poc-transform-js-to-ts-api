import 'dotenv/config'

export default {
  database: {
    uri: process.env.MONGO_URI,
    dbName: process.env.MONGO_DATABASE_NAME,
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
  },
  env: process.env.NODE_ENV || 'localhost',
  port: process.env.PORT || 3000,
  log: {
    name: process.env.APP_NAME || '4pl-fleet-api',
    streams: [
      {
        type: 'stream',
        stream: process.stdout,
        level: 'debug',
      },
    ],
  },
}
