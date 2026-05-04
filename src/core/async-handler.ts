import type { Request, Response, NextFunction } from "express";
import type { AsyncRouterHandler} from "../types";
import { error } from "node:console";
import { Logger } from "../utils/logger";



export function asyncHandler(handler: AsyncRouterHandler){
    return (req: Request, res: Response, next: NextFunction): void => {
        //  handler will resolve
        // otherwise catch
        // destructering error, error: unknown
        Promise.resolve(handler(req, res, next)).catch((error: unknown) => {
            const errorMessage = error instanceof Error ? error.message : 'Unknown Error'
            Logger.error(`Error in async router handler ${errorMessage}`),{
                url: req.originalUrl,
                ip: req.ip,
                agent: req.get('User-Agent')
            }
            next(error)
        })
    }
} 