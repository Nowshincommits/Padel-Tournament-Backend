import { createServer } from 'node:http'
import app from './app'
import { Logger } from './utils/logger'
import { connecttoDB } from './libs/mongodb'

const portNumber: number = 8000

async function server(port: number): Promise<void> {
  const nodeServer = createServer(app)
  // db connection
  // async function
  // we will wait till the connection
  await connecttoDB()
  nodeServer.listen(port, () => {
    // console.log(`Server is started at http://localhost:${port}`)
    Logger.info(`Server is started at http://localhost:${port}`)
  })

  nodeServer.on('error', (error: NodeJS.ErrnoException) => {
    Logger.error(`error: ${error}`)
    nodeServer.close()
  })
}

(async () => {
  await server(portNumber)
})()