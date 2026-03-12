import mongoose from "mongoose";
import { Logger } from "../../utils/logger";
import env from "../../core/env";



mongoose.set('strictQuery', true)

mongoose.connection.on('Connected', () => {
    Logger.info('Mongodb Connection established')
})

mongoose.connection.on('reconnected', () => {
    Logger.info('Mongodb reconnected')
})

mongoose.connection.on('disconnected', () => {
    Logger.info('Mongodb disconnected')
})

mongoose.connection.on('close', () => {
    Logger.info('Mongodb disconnection closed')
})

mongoose.connection.on('server', (error: string) => {
    Logger.info(`Mongodb Error ${error}`)
})

async function connecttoDB() {
    try {
        await mongoose.connect(env.MONGODB_URL)
        Logger.info('Successfully connected to mongodb')
   } catch (error: unknown) {
       if(error instanceof Error){
        Logger.error(`Error on mongodb connection ${error}`)
        // might creash Backend . Try avoiding this
        // need to replace with custom error
        throw new Error('error')
    }
    Logger.error(`Unknown Error on mongodb connection`)
    }
}

export { connecttoDB }