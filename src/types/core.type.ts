import type { Request, Response, NextFunction } from "express"

export type CommonController = (req: Request, res: Response) => Promise<void>

// response
export type SyceRouterHandler = (req: Request, res: Response, next: NextFunction) => unknown