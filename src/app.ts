import cookieParser from 'cookie-parser'
import express from 'express'
import { corsConfig, helmetConfig } from './core'
import env from './core/env'
import routerV1 from './routers'

const app = express()

// cors
app.use(corsConfig)
app.use(helmetConfig)

// helmet

app.use(cookieParser())
app.use(express.json())
app.get('/', (req, res) => {
  return res.json({
    messages: 'Server is Running',
    data: {
      version: env.API_VERSION,
      environment: env.NODE_ENV,
      url: env.MONGODB_URL
    },
  })
})
console.log(env.MONGODB_URL)
app.use('/api/v1', routerV1)

export default app