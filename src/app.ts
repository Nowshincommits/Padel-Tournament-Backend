import express from 'express'
import { corsConfig, helmetConfig } from './core/'


const app = express()

// cors
app.use(corsConfig)
app.use(helmetConfig)

// helmet

app.get('/', (req, res) => {
  return res.json({
    messages: 'Server is Running',
    data: {
      version: env.API_VERSION,
      environment: env.NODE_ENV,
    },
  })
})

app.use('/api/v1', routerV1)

export default app