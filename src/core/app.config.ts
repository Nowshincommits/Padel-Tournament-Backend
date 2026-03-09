import cors from 'cors'
import helmet from 'helmet'

export const corsConfig = cors({
    origin: ['http://localhost:3000','*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
    maxAge: 80000,
})


export const helmetConfig = helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
      },
    },
  })