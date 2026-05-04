import type { Request, Response, NextFunction } from "express"

export type CommonController = (req: Request, res: Response) => Promise<void>

// response
export type SyncRouterHandler = (req: Request, res: Response, next: NextFunction) => unknown
// need a response so added promise
export type AsyncRouterHandler =
    (req: Request,
     res: Response,
    next: NextFunction) => Promise<unknown>