import { createServer } from 'node:http'
import app from './app'
import { Logger } from './utils/logger'

const portNumber: number = 8000

async function server(port: number): Promise<void> {
  const nodeServer = createServer(app)

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