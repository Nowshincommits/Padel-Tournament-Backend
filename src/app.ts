import cookieParser from 'cookie-parser'
import express from 'express'
import { corsConfig, helmetConfig } from './core'
import env from './core/env'
import routerV1 from './routers'
import { SendResponse } from './core/response'

const app = express()

// cors
app.use(corsConfig)
app.use(helmetConfig)

//  global error for duplicate key error 

// helmet

app.use(cookieParser())
app.use(express.json())
app.get('/', (req, res) => {
  // return res.json({
  //   messages: 'Server is Running',
  //   data: {
  //     version: env.API_VERSION,
  //     environment: env.NODE_ENV,
  //     url: env.MONGODB_URL
  //   },
  // })
  SendResponse.success({
    res,
    success: true,
     messages: 'Server is Running',
     data: {
      version: env.API_VERSION,
      environment: env.NODE_ENV,
    },
  })
})
console.log(env.MONGODB_URL)
app.use('/api/v1', routerV1)

export default app